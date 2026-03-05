<?php

namespace App\Http\Controllers;
use App\Models\Sale;
use App\Models\Ledger;
use App\Models\StockItem ;
use App\Http\Requests\SaleRequest;
use App\Services\SaleService;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function create()
    {
        return Inertia::render('Sales/Sales', [
             'sales' => Sale::latest()->get(),
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