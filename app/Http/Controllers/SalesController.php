<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Ledger;
use App\Models\StockItem;
use App\Http\Requests\SaleRequest;
use App\Services\SaleService;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function create()
{
    $sales = Sale::with('customer')->latest()->get()->map(function ($sale) {
        return [
            'id' => $sale->id,
            'date' => $sale->date,
            'customer_name' => $sale->customer->name ?? '',
            'total_amount' => $sale->total_amount
        ];
    });

    return Inertia::render('Sales/Sales', [
        'sales' => $sales,
        'customers' => Ledger::all(),
        'items' => StockItem::all()
    ]);
}

    public function store(SaleRequest $request, SaleService $service)
    {
        $service->create($request->validated());

        return redirect()->back()->with('success', 'Sale Created');
    }
}