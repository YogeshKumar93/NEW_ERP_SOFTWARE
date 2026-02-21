<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\SaleItem;
use App\Models\Ledger;

class Sale extends Model
{
    protected $fillable = [
        'company_id',
        'customer_id',
        'date',
        'invoice_no',
        'total_amount',
        'gst_amount'
    ];

    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function customer()
    {
        return $this->belongsTo(Ledger::class, 'customer_id');
    }
}