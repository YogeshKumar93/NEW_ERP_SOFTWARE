<?php

namespace App\Services;
use App\Models\StockCategory;
use App\Models\StockItem;

class StockCategoryService
{
    public function create($data)
    {
        $data['company_id'] = session('selected_company');

        return StockCategory::create($data);
    }

    public function update($category, $data)
    {
        $category->update($data);

        return $category;
    }

    public function delete($category)
    {
        // ❌ Block if children exist
        if ($category->children()->exists()) {
            throw new \Exception("Cannot delete category with child categories.");
        }

        // ❌ Block if stock items exist
        if ($category->stockItems()->exists()) {
            throw new \Exception("Cannot delete category with stock items.");
        }

        $category->delete();
    }
}

