<?php

namespace App\Http\Controllers; 

use App\Http\Requests\VoucherRequest;
use App\Services\VoucherService;
use App\Models\Voucher;
use App\Models\Ledger;
use App\Models\VoucherType;
use Inertia\Inertia;

class VoucherController extends Controller
{
   public function create()
{
    $ledgers = Ledger::all();
    $voucherType = VoucherType::where('name', 'Purchase')->first();

return Inertia::render('Voucher/JournalVoucher', [
    'ledgers' => Ledger::all(),
    'voucherType' => VoucherType::where('name', 'Journal')->first(),
     'vouchers' => Voucher::latest()->get() 
    // 'voucherType' => \App\Models\VoucherType::first()
]);
}


    public function store(VoucherRequest $request, VoucherService $service)
    {
        $service->create($request->validated());

        return redirect()->route('journal-voucher.create')
        ->with('success', 'Journal Voucher Created');
    }
}
