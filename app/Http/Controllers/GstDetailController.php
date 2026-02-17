<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\GstDetailService;
use App\Http\Requests\GstDetailRequest;
use Illuminate\Http\Request;

class GstDetailController extends Controller
{
    protected $gstService;

    public function __construct(GstDetailService $gstService)
    {
        $this->gstService = $gstService;
    }

    public function index()
    {
        return Inertia::render('GST_Details/GSTDetailsForm');
    }

    public function store(GstDetailRequest $request)
    {
        $companyId = session('selected_company');

        $this->gstService->store($request->validated(), $companyId);

        return redirect()->route('gateway')
            ->with('success', 'GST Details Saved Successfully');
    }
}
