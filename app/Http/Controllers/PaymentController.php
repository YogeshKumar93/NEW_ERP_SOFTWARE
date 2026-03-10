<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Ledger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function create()
    {
        $payments = Payment::with('ledger')->latest()->get()->map(function ($p) {
            return [
                'date' => $p->payment_date,
                'ledger_name' => $p->ledger->name ?? '',
                 'payment_mode' => $p->payment_mode ?? 'Cash',
                'amount' => $p->amount,
            ];
        });

        return Inertia::render('Payment/Index', [
            'payments' => $payments,
            'ledgers' => Ledger::all(),
        ]);
    }

    public function store(Request $request)
    {
        Payment::create([
            'payment_date' => $request->payment_date,
            'ledger_id' => $request->ledger_id,
            'payment_mode' => $request->payment_mode,
            'amount' => $request->amount,
            'narration' => $request->narration,
        ]);

        return redirect()->back()->with('success','Payment Created');
    }
}