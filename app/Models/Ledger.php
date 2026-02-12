<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
{
    protected $fillable = [
    'company_id',
    'name',
    'group_id',
    'opening_balance',
    'opening_type',
    'gst_number',
    'address',
];

public function group()
{
    return $this->belongsTo(Group::class);
}

}
