import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";

export default function Index({ vouchers = [], ledgers = [], voucherType }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const tableRef = useRef(null);
    const dateRef = useRef(null);

    // useForm for Journal Entry
    const { data, setData, post, processing, reset, errors } = useForm({
        voucher_type_id: voucherType?.id || "",
        date: new Date().toISOString().substr(0, 10),
        narration: "",
        entries: [
            { ledger_id: "", debit: "", credit: "" },
            { ledger_id: "", debit: "", credit: "" },
        ],
    });

    // Entries Management
    const addRow = () => {
        setData('entries', [...data.entries, { ledger_id: "", debit: "", credit: "" }]);
    };
    
    const handleEntryChange = (index, field, value) => {
        const newEntries = [...data.entries];
        newEntries[index][field] = value;
        setData('entries', newEntries);
    };

    const totalDebit = data.entries.reduce((sum, e) => sum + Number(e.debit || 0), 0);
    const totalCredit = data.entries.reduce((sum, e) => sum + Number(e.credit || 0), 0);

    // Modal Handlers
    const toggleCreate = () => {
        reset();
        setIsFormOpen(true);
        // Focus date field after modal opens
        setTimeout(() => dateRef.current?.focus(), 150);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        
        if (totalDebit !== totalCredit || totalDebit === 0) {
            alert("Error: Debit and Credit totals must match and cannot be zero!");
            return;
        }

        post(route('journal-voucher.store'), {
            onSuccess: () => {
                setIsFormOpen(false);
                reset();
                alert("✅ Voucher Saved Successfully!");
            },
            onError: (err) => {
                console.error("Submission Errors:", err);
            }
        });
    };

    // Shortcuts: Alt+C to open, Esc to close
    useShortcuts({
        'alt+c': () => toggleCreate(),
        'alt+a': () => isFormOpen && addRow(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < vouchers.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, isFormOpen);

    return (
        <AppLayout title="Journal Vouchers">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                {/* Tally Style Header Bar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Journal Register</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400 font-bold px-1">C</span>:Create (Alt+C) | 
                        <span className="underline decoration-yellow-400 font-bold px-1">Esc</span>:Close
                    </span>
                </div>

                {/* Main Content: List Table */}
                <div className="flex-1 relative flex p-4 overflow-hidden">
                    <CommonTable
                        ref={tableRef}
                        title="List of Journal Vouchers"
                        headers={["Date", "Voucher No", "Particulars", "Debit Amt", "Credit Amt"]}
                        data={vouchers}
                        columns={["date", "voucher_type_id", "ledger_id", "debit", "credit"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(v) => console.log("Viewing Voucher:", v)}
                    />

                    {/* Journal Entry Modal */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Journal Voucher Creation"
                        onSubmit={handleSubmit} // Using Modal's built-in submit logic
                        onCancel={() => setIsFormOpen(false)}
                        processing={processing}
                        width="w-[950px]"
                        submitText="Accept"
                    >
                        <div className="space-y-4">
                            {/* Header Section: Date & Narration */}
                            <div className="grid grid-cols-12 gap-4 bg-[#e3f2fd] p-3 border border-blue-200">
                                <div className="col-span-3">
                                    <label className="block text-[10px] font-bold text-blue-900 uppercase">Voucher Date</label>
                                    <input 
                                        ref={dateRef}
                                        type="date" 
                                        value={data.date} 
                                        onChange={e => setData('date', e.target.value)}
                                        className="w-full border border-gray-400 px-1 py-0.5 text-[11px] focus:bg-[#fff9c4] outline-none"
                                    />
                                </div>
                                <div className="col-span-9">
                                    <label className="block text-[10px] font-bold text-blue-900 uppercase">Narration / Remarks</label>
                                    <input 
                                        type="text" 
                                        value={data.narration} 
                                        onChange={e => setData('narration', e.target.value)}
                                        className="w-full border border-gray-400 px-2 py-0.5 text-[11px] focus:bg-[#fff9c4] outline-none"
                                        placeholder="Being amount transferred to..."
                                    />
                                </div>
                            </div>

                            {/* Entries Table */}
                            <div className="bg-white border border-gray-400 min-h-[250px] overflow-hidden">
                                <table className="w-full text-[11px]">
                                    <thead className="bg-[#004a4d] text-white">
                                        <tr className="uppercase text-[10px]">
                                            <th className="p-1.5 text-left border border-teal-800">Particulars (Ledger Name)</th>
                                            <th className="p-1.5 w-32 text-right border border-teal-800">Debit (Amt)</th>
                                            <th className="p-1.5 w-32 text-right border border-teal-800">Credit (Amt)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.entries.map((entry, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="p-0">
                                                    <select
                                                        value={entry.ledger_id}
                                                        onChange={(e) => handleEntryChange(index, "ledger_id", e.target.value)}
                                                        className="w-full p-1.5 border-none focus:bg-[#fff9c4] outline-none appearance-none bg-transparent"
                                                    >
                                                        <option value="">Select Ledger...</option>
                                                        {ledgers.map(l => (
                                                            <option key={l.id} value={l.id}>{l.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="p-0 border-l border-gray-200">
                                                    <input
                                                        type="number"
                                                        value={entry.debit}
                                                        onChange={(e) => handleEntryChange(index, "debit", e.target.value)}
                                                        className="w-full p-1.5 text-right focus:bg-[#fff9c4] outline-none border-none"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="p-0 border-l border-gray-200">
                                                    <input
                                                        type="number"
                                                        value={entry.credit}
                                                        onChange={(e) => handleEntryChange(index, "credit", e.target.value)}
                                                        className="w-full p-1.5 text-right focus:bg-[#fff9c4] outline-none border-none"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 bg-gray-50 border-t border-gray-200">
                                    <button 
                                        type="button" 
                                        onClick={addRow} 
                                        className="text-[10px] text-blue-700 font-bold hover:underline uppercase"
                                    >
                                        + Add New Row (Alt+A)
                                    </button>
                                </div>
                            </div>

                            {/* Totals Display Bar (Custom Styling inside Modal) */}
                            <div className="flex justify-between items-center bg-[#004a4d] text-white p-2 border border-teal-600 shadow-inner">
                                <div className="text-[10px] uppercase tracking-widest font-bold text-teal-200">
                                    Voucher Totals
                                </div>
                                <div className="flex gap-12 text-[13px] font-bold">
                                    <div className="flex gap-3">
                                        <span className="text-teal-200 uppercase text-[10px] self-center">Debit:</span>
                                        <span>{totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex gap-3 pr-4">
                                        <span className="text-teal-200 uppercase text-[10px] self-center">Credit:</span>
                                        <span>{totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}