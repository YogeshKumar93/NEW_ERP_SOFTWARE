<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        'company_id',
        'voucher_type_id',
        'voucher_no',
        'date',
        'narration',
        'total_amount'
    ];

    public function entries()
    {
        return $this->hasMany(VoucherEntry::class);
    }

    public function voucherType()
    {
        return $this->belongsTo(VoucherType::class);
    }
}

