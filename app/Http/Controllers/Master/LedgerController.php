<?php

namespace App\Http\Controllers\Master;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\Ledger; 
use Illuminate\Http\Request;
use App\Models\Group;


class LedgerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $companyId = session('selected_company');

    return Inertia::render('Masters/Ledgers/Index', [
        'ledgers' => Ledger::with('group')
            ->where('company_id', $companyId)
            ->get(),

        'groups' => Group::where('company_id', $companyId)->get(),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
{
    Ledger::create([
        'company_id' => session('selected_company'),
        'name' => $request->name,
        'group_id' => $request->group_id,
        'opening_balance' => $request->opening_balance ?? 0,
        'opening_type' => $request->opening_type ?? 'Dr',
        'gst_number' => $request->gst_number,
        'address' => $request->address,
    ]);

    return redirect()->back();
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
