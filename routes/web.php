<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\Master\GroupController;
use App\Http\Controllers\Master\LedgerController;
use App\Http\Controllers\Master\UnitController;
use App\Http\Controllers\Master\StockItemController;
use App\Http\Controllers\Master\StockCategoryController;
use App\Http\Controllers\GstDetailController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ======================
// Authenticated Routes
// ======================
Route::middleware(['auth'])->group(function () {

    // Role-based dashboard redirection
  Route::get('/dashboard', function () {
    // 1️⃣ Check if user has selected a company
    if (!session()->has('selected_company')) {
        return redirect()->route('companies.select.index');
    }

    // 2️⃣ If company is selected, redirect based on role
    if (auth()->user()->role_id == 1) {
        return Inertia::render('Admin/Dashboard');
    }
    return Inertia::render('User/Dashboard');
})->name('dashboard')->middleware('auth');


    // Admin dashboard
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // User dashboard
    Route::get('/user/dashboard', function () {
        return Inertia::render('User/Dashboard');
    })->name('user.dashboard');

    // ======================
    // Company Selection Flow
    // ======================
    Route::get('/select-company', [CompanyController::class, 'selectIndex'])
        ->name('companies.select.index');

    Route::post('/select-company', [CompanyController::class, 'select'])
        ->name('companies.select');

    // ======================
    // ERP Modules (require selected company)
    // ======================
    Route::middleware(['auth', 'company.selected'])->group(function () {

        // Company CRUD routes
        Route::get('/gateway', function () {
    return Inertia::render('Gateway/Gateway');
})->name('gateway');

 Route::get('/gst-details', [GstDetailController::class, 'index'])
    ->name('gst.details.index');

Route::post('/gst-details', [GstDetailController::class, 'store'])
    ->name('gst.details.store');

        Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
        Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
        Route::resource('companies', CompanyController::class)->except(['index', 'store']); // avoid duplicate routes

        // Future ERP modules go here
        Route::resource('ledgers', LedgerController::class);
        Route::resource('groups', GroupController::class); // This will create all CRUD routes for groups with 'groups' prefix
        
        Route::resource('units', UnitController::class)->only(['index', 'store', 'destroy']);
       Route::resource('stock-items', StockItemController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('stock-categories', StockCategoryController::class)->only(['index', 'store', 'update', 'destroy']);

        // Show Journal Voucher Form
Route::get('/journal-voucher', [VoucherController::class, 'create'])->name('journal-voucher.create');

// Store Voucher
Route::post('/journal-voucher', [VoucherController::class, 'store'])->name('journal-voucher.store');

Route::get('/sales', [SalesController::class, 'create']);
Route::post('/sales', [SalesController::class, 'store']);

    });
});

// ======================
// Profile Routes
// ======================
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
