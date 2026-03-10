<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
        protected $fillable = [
        'payment_date',
        'ledger_id',
        'payment_mode',
        'amount',
        'narration'
    ];

      public function ledger()
    {
        return $this->belongsTo(Ledger::class);
    }

}
