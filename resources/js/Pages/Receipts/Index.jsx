import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts"; // Shortcut hook import kiya
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";

export default function Index({ receipts = [], ledgers = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [receiptList, setReceiptList] = useState(receipts ?? []);
    const tableRef = useRef(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        receipt_date: new Date().toISOString().split('T')[0],
        ledger_id: "",
        receipt_mode: "Cash",
        amount: "",
        narration: ""
    });

    // Refs for Focus Management (Unit style)
    const dateRef = useRef(null);
    const ledgerRef = useRef(null);
    const modeRef = useRef(null);
    const amountRef = useRef(null);
    const narrationRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        console.log("Receipts Data:", receipts);
        setReceiptList(receipts);
        setActiveIndex(0);
    }, [receipts]);

    const toggleCreate = () => {
        setIsFormOpen(true);
        setTimeout(() => dateRef.current?.focus(), 50);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef && nextRef.current) nextRef.current.focus();
            else handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        post(route('receipts.store'), {
            onSuccess: () => {
                reset();
                setIsFormOpen(false);
            },
        });
    };

    // Keyboard Shortcuts (Unit style)
    useShortcuts({
        'alt+c': () => toggleCreate(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < receiptList.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, isFormOpen);

    return (
        <AppLayout title="Receipt Voucher">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                
                {/* Top Header Bar - Unit Style */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Accounts {'>'} Receipt Voucher</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* Main Table */}
                    <CommonTable
                        ref={tableRef}
                        title="List of Receipts"
                        headers={["Date", "Particular", "Mode", "Amount"]}
                        data={receiptList}
                        columns={["date", "ledger_name", "receipt_mode", "amount"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(receipt) => console.log("Selected:", receipt)}
                    />

                    {/* Creation Form Modal - Unit Style Design */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Receipt Voucher Creation"
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        submitRef={submitRef}
                        width="w-[550px]"
                    >
                        <div className="grid grid-cols-1 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">
                            
                            <div className="space-y-2">
                                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Voucher Details</h3>

                                {/* Date */}
                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700">Date:</label>
                                    <input 
                                        ref={dateRef}
                                        type="date" 
                                        value={data.date} 
                                        onChange={e => setData('receipt_date', e.target.value)} 
                                        onKeyDown={(e) => handleKeyDown(e, ledgerRef)} 
                                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                                    />
                                </div>

                                {/* Ledger Selection */}
                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700">Particular:</label>
                                    <select 
                                        ref={ledgerRef}
                                        value={data.ledger_id} 
                                        onChange={e => setData('ledger_id', e.target.value)} 
                                        onKeyDown={(e) => handleKeyDown(e, modeRef)}
                                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                                    >
                                        <option value="">Select Ledger</option>
                                        {ledgers.map(l => (
                                            <option key={l.id} value={l.id}>{l.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Receipt Mode */}
                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700">Account (Mode):</label>
                                    <select 
                                        ref={modeRef}
                                        value={data.receipt_mode} 
                                        onChange={e => setData('receipt_mode', e.target.value)} 
                                        onKeyDown={(e) => handleKeyDown(e, amountRef)}
                                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Bank">Bank</option>
                                    </select>
                                </div>

                                {/* Amount */}
                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700">Amount:</label>
                                    <input 
                                        ref={amountRef} 
                                        type="number" 
                                        value={data.amount} 
                                        onChange={e => setData('amount', e.target.value)} 
                                        onKeyDown={(e) => handleKeyDown(e, narrationRef)} 
                                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Narration */}
                                <div className="flex items-start">
                                    <label className="w-32 font-bold text-gray-700 mt-1">Narration:</label>
                                    <textarea 
                                        ref={narrationRef} 
                                        value={data.narration} 
                                        onChange={e => setData('narration', e.target.value)} 
                                        onKeyDown={(e) => handleKeyDown(e, submitRef)} 
                                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none h-16 resize-none" 
                                        placeholder="Enter narration..."
                                    />
                                </div>
                            </div>
                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}