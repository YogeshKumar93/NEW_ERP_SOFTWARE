<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoucherEntry extends Model
{
    protected $fillable = [
        'voucher_id',
        'ledger_id',
        'debit',
        'credit'
    ];

    public function ledger()
    {
        return $this->belongsTo(Ledger::class);
    }
}

