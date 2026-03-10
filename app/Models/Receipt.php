<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
      protected $fillable = [
        'receipt_date',
        'ledger_id',
        'receipt_mode',
        'amount',
        'narration'
    ];

    public function ledger()
    {
        return $this->belongsTo(Ledger::class);
    }
}
