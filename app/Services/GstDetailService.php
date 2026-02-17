<?php

namespace App\Services;

use App\Models\GstDetail;

class GstDetailService
{
    public function store($data, $companyId)
    {
        return GstDetail::create([
            'company_id' => $companyId,
            'registration_status' => 'Active',
            'state' => $data['state'],
            'registration_type' => $data['registrationType'],
            'assessee_other_territory' => $data['assesseeOtherTerritory'],
            'gstin' => $data['gstin'],
            'periodicity' => $data['periodicity'],
            'eway_bill_applicable' => $data['eWayBillApplicable'] === 'Yes',
            'eway_applicable_from' => $data['applicableFrom'],
            'einvoicing_applicable' => $data['eInvoicingApplicable'] === 'Yes',
        ]);
    }
}
