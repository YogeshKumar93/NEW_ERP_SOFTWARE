<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\Ledger;
use App\Models\LedgerEntry;
use Illuminate\Support\Facades\DB;

class SaleService
{
    public function create($data)
    {
        DB::transaction(function () use ($data) {

            $sale = Sale::create([
                // 'company_id' => auth()->user()->company_id,
                'company_id' => 1, // For Testing
                'customer_id' => $data['customer_id'],
                'date' => $data['date'],
                'invoice_no' => 'INV-' . time(),
                'total_amount' => 0,
                'gst_amount' => 0,
            ]);

            $total = 0;

            foreach ($data['items'] as $item) {

                $amount = $item['qty'] * $item['rate'];
                $total += $amount;

                $sale->items()->create([
                    'item_id' => $item['item_id'],
                    'qty' => $item['qty'],
                    'rate' => $item['rate'],
                    'amount' => $amount,
                ]);
            }

            $sale->update([
                'total_amount' => $total
            ]);

            // Ledger Posting
            // $this->createLedgerEntries($sale);
        });
    }

    protected function createLedgerEntries($sale)
{
    $salesLedger = Ledger::firstOrCreate(
        ['company_id' => $sale->company_id, 
        // 'code' => 'SALES'
        ],
        ['name' => 'Sales Account'],
        ['type' => 'income']
    );

    LedgerEntry::create([
        'ledger_id' => $sale->customer_id,
        'date' => $sale->date,
        'debit' => $sale->total_amount,
        'credit' => 0,
        'reference_type' => 'Sale',
        'reference_id' => $sale->id,
    ]);

    LedgerEntry::create([
        'ledger_id' => $salesLedger->id,
        'date' => $sale->date,
        'debit' => 0,
        'credit' => $sale->total_amount,
        'reference_type' => 'Sale',
        'reference_id' => $sale->id,
    ]);
}
}