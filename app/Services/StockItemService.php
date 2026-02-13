<?php

namespace App\Services;

use App\Models\StockItem;

class StockItemService
{
    public function create($data, $companyId)
    {
        $data['company_id'] = $companyId;

        return StockItem::create($data);
    }

    public function update($stockItem, $data)
    {
        return $stockItem->update($data);
    }

    public function delete($stockItem)
    {
        return $stockItem->delete();
    }
}
