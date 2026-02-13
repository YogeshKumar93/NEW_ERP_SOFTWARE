<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
       protected $fillable = [
        'company_id',
        'name',
        'symbol',
        'type',
        'decimal_places'
    ];
}
