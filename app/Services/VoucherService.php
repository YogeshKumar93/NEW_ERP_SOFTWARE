<?php

namespace App\Services;

use App\Models\Voucher;
use App\Models\VoucherEntry;
use DB;
use Exception;

class VoucherService
{
    public function create($data)
    {
        return DB::transaction(function () use ($data) {

            $totalDebit = collect($data['entries'])->sum('debit');
            $totalCredit = collect($data['entries'])->sum('credit');

            if ($totalDebit != $totalCredit) {
                throw new Exception("Debit and Credit must match");
            }

            $voucher = Voucher::create([
                'company_id' => session('selected_company'),
                'voucher_type_id' => $data['voucher_type_id'],
                'voucher_no' => 'JV-' . time(),
                'date' => $data['date'],
                'narration' => $data['narration'] ?? null,
                'total_amount' => $totalDebit,
            ]);

            foreach ($data['entries'] as $entry) {
                VoucherEntry::create([
                    'voucher_id' => $voucher->id,
                    'ledger_id' => $entry['ledger_id'],
                    'debit' => $entry['debit'] ?? 0,
                    'credit' => $entry['credit'] ?? 0,
                ]);
            }

            return $voucher;
        });
    }
}
