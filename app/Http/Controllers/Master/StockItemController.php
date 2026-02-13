<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockItemRequest;

use App\Models\StockItem;
use App\Models\Unit;
use App\Models\StockCategory;
use App\Services\StockItemService;
use Inertia\Inertia;

class StockItemController extends Controller
{
    protected $service;

    public function __construct(StockItemService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $companyId = session('selected_company');

        return Inertia::render('Masters/StockItems/Index', [
            'stockItems' => StockItem::with(['unit', 'category'])
                ->where('company_id', $companyId)
                ->get(),
            'units' => Unit::where('company_id', $companyId)->get(),
            'categories' => StockCategory::where('company_id', $companyId)->get(),
        ]);
    }

    public function store(StockItemRequest $request)
    {
        $companyId = session('selected_company');

        $this->service->create($request->validated(), $companyId);

        return back();
    }

    // public function update(UpdateStockItemRequest $request, StockItem $stockItem)
    // {
    //     $this->service->update($stockItem, $request->validated());

    //     return back();
    // }

    public function destroy(StockItem $stockItem)
    {
        $this->service->delete($stockItem);

        return back();
    }
}
