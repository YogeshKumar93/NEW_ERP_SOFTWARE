<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockCategoryRequest;
use App\Models\StockCategory;
use App\Services\StockCategoryService;
use Inertia\Inertia;

class StockCategoryController extends Controller
{
    protected $service;

    public function __construct(StockCategoryService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $companyId = session('selected_company');

        $categories = StockCategory::with('childrenRecursive')
            ->where('company_id', $companyId)
            ->whereNull('parent_id')
            ->orderBy('name')
            ->get();

        $allCategories = StockCategory::where('company_id', $companyId)->orderBy('name')->get();

        return Inertia::render('Masters/StockCategories/Index', [
            'categories' => $categories,
             'allCategories' => $allCategories,
        ]);
    }

    public function store(StockCategoryRequest $request)
    {
        $companyId = session('selected_company');

        $this->service->create($request->validated(), $companyId);

        return back()->with('success', 'Category Created');
    }

    public function update(StockCategoryRequest $request, StockCategory $stockCategory)
    {
        $this->service->update($stockCategory, $request->validated());

        return back()->with('success', 'Category Updated');
    }

    public function destroy(StockCategory $stockCategory)
    {
        $this->service->delete($stockCategory);

        return back()->with('success', 'Category Deleted');
    }
}
