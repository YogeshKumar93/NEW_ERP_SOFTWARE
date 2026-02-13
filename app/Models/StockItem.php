<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'stock_category_id',
        'unit_id',
        'opening_qty',
        'opening_rate',
    ];

    // 🔹 Unit Relation
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    // 🔹 Category Relation
    public function category()
    {
        return $this->belongsTo(StockCategory::class, 'stock_category_id');
    }
}
