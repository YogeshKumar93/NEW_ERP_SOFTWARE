<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GstDetail extends Model
{
    protected $fillable = [
        'company_id',
        'registration_status',
        'state',
        'registration_type',
        'assessee_other_territory',
        'gstin',
        'periodicity',
        'eway_bill_applicable',
        'eway_applicable_from',
        'einvoicing_applicable',
    ];

    protected $casts = [
        'eway_bill_applicable' => 'boolean',
        'einvoicing_applicable' => 'boolean',
        'eway_applicable_from' => 'date',
    ];
}
