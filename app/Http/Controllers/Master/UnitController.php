<?php

namespace App\Http\Controllers\Master;

use Inertia\Inertia;
use App\Models\Unit;
use Illuminate\Http\Request;
use App\Services\UnitService;
use App\Http\Controllers\Controller;
use App\Http\Requests\UnitRequest;

class UnitController extends Controller
{
    protected $service;

    public function __construct(UnitService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $companyId = session('selected_company');

        $units = Unit::where('company_id', $companyId)->get();

        return Inertia::render('Masters/Units/Index', [
            'units' => $units
        ]);
    }

    public function store(UnitRequest $request)
    {
        $data = $request->validated();
        $data['company_id'] = session('selected_company');

        $this->service->create($data);

        return redirect()->back();
    }

    public function destroy(Unit $unit)
    {
        $this->service->delete($unit);

        return redirect()->back();
    }
}
