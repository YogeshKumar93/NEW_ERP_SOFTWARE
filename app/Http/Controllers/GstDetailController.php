<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\GstDetailService;
use App\Http\Requests\GstDetailRequest;
use Illuminate\Http\Request;
use App\Models\GstDetail;

class GstDetailController extends Controller
{
    protected $gstService;

    public function __construct(GstDetailService $gstService)
    {
        $this->gstService = $gstService;
    }

   public function index()
{
    $companyId = session('selected_company');

    $gstDetail = GstDetail::where('company_id', $companyId)->first();

    return Inertia::render('GST_Details/GSTDetailsForm', [
        'gstDetail' => $gstDetail
    ]);
}

    public function store(GstDetailRequest $request)
    {
        $companyId = session('selected_company');

        $this->gstService->store($request->validated(), $companyId);

        return redirect()->route('companies.index')
            ->with('success', 'GST Details Saved Successfully');
    }
}
