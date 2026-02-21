<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    protected $fillable = [
        'sale_id',
        'item_id',
        'qty',
        'rate',
        'amount'
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}