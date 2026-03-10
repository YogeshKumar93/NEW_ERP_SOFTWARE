<?php

namespace App\Http\Controllers;

use App\Models\Receipt; 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ledger; 
use Inertia\Inertia;

class ReceiptController extends Controller
{
     public function create()
    {
        $receipts = Receipt::with('ledger')->latest()->get()->map(function ($r) {
            return [
                'date' => $r->receipt_date,
                'ledger_name' => $r->ledger->name ?? '',
                'receipt_mode' => $r->receipt_mode,
                'amount' => $r->amount,
            ];
        });

        return Inertia::render('Receipts/Index', [
            'receipts' => $receipts,
            'ledgers' => Ledger::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receipt_date' => 'required|date',
            'ledger_id' => 'required|exists:ledgers,id',
            'receipt_mode' => 'required|string',
            'amount' => 'required|numeric',
            'narration' => 'nullable|string',
        ]);

        Receipt::create($request->all());

        return redirect()->back()->with('success', 'Receipt created successfully.');
    }
}
