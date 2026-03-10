import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts"; 
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import ReceiptPrint from "@/Components/Common/ReceiptPrint";
// import ReceiptPrint from "./ReceiptPrint"; 

export default function Index({ receipts = [], ledgers = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [receiptList, setReceiptList] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null); 
    const [showPrint, setShowPrint] = useState(false); 
    const tableRef = useRef(null);

    const { data, setData, post, reset } = useForm({
        receipt_date: new Date().toISOString().split('T')[0],
        ledger_id: "",
        receipt_mode: "Cash",
        amount: "",
        narration: ""
    });

    const dateRef = useRef(null);
    const ledgerRef = useRef(null);
    const modeRef = useRef(null);
    const amountRef = useRef(null);
    const narrationRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        const formatted = receipts.map(r => ({
            ...r,
            action: (
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        setSelectedReceipt(r); 
                        setShowPrint(true); 
                    }}
                    className="bg-[#004a4d] text-white px-3 py-0.5 text-[10px] uppercase hover:bg-black transition-all"
                >
                    Print
                </button>
            )
        }));
        setReceiptList(formatted);
    }, [receipts]);

    const toggleCreate = () => {
        setIsFormOpen(true);
        setTimeout(() => dateRef.current?.focus(), 50);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef && nextRef.current) nextRef.current.focus();
            else if (nextRef === null) handleSubmit(e);
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

    // Saare Hooks return se pehle hone chahiye
    useShortcuts({
        'alt+c': () => !showPrint && toggleCreate(),
        'Escape': () => {
            if (showPrint) setShowPrint(false);
            else setIsFormOpen(false);
        },
        'ArrowDown': () => !isFormOpen && !showPrint && setActiveIndex(prev => (prev < receiptList.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && !showPrint && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, isFormOpen || showPrint);

    // --- FIX: Early return ko hata kar conditional render use karenge ---
    return (
        <AppLayout title="Receipt Voucher">
            {showPrint && selectedReceipt ? (
                // Jab print mode ON ho
                <ReceiptPrint 
                    data={selectedReceipt} 
                    onBack={() => setShowPrint(false)} 
                />
            ) : (
                // Jab normal table view ho
                <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                    <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                        <span>Biggbrains 4.0 | Gateway of ERP {'>'} Accounts {'>'} Receipt Voucher</span>
                        <span className="flex gap-4">
                            <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
                        </span>
                    </div>

                    <div className="flex-1 relative flex p-4 overflow-hidden">
                        <CommonTable
                            ref={tableRef}
                            title="List of Receipts"
                            headers={["Date", "Particular", "Mode", "Amount", "Action"]}
                            data={receiptList}
                            columns={["receipt_date", "ledger_name", "receipt_mode", "amount", "action"]}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />

                        <CommonFormModal
                            isOpen={isFormOpen}
                            title="Receipt Voucher Creation"
                            onSubmit={handleSubmit}
                            onCancel={() => setIsFormOpen(false)}
                            submitRef={submitRef}
                            width="w-[550px]"
                        >
                            <div className="grid grid-cols-1 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200 uppercase font-mono">
                                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Voucher Details</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700">Date:</label>
                                        <input ref={dateRef} type="date" value={data.receipt_date} onChange={e => setData('receipt_date', e.target.value)} onKeyDown={(e) => handleKeyDown(e, ledgerRef)} className="flex-1 border border-gray-400 px-1 py-0.5 outline-none focus:bg-[#fff9c4]" />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700">Particular:</label>
                                        <select ref={ledgerRef} value={data.ledger_id} onChange={e => setData('ledger_id', e.target.value)} onKeyDown={(e) => handleKeyDown(e, modeRef)} className="flex-1 border border-gray-400 px-1 py-0.5 outline-none focus:bg-[#fff9c4]">
                                            <option value="">Select Ledger</option>
                                            {ledgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700">Account:</label>
                                        <select ref={modeRef} value={data.receipt_mode} onChange={e => setData('receipt_mode', e.target.value)} onKeyDown={(e) => handleKeyDown(e, amountRef)} className="flex-1 border border-gray-400 px-1 py-0.5 outline-none focus:bg-[#fff9c4]">
                                            <option value="Cash">Cash</option>
                                            <option value="Bank">Bank</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700">Amount:</label>
                                        <input ref={amountRef} type="number" value={data.amount} onChange={e => setData('amount', e.target.value)} onKeyDown={(e) => handleKeyDown(e, narrationRef)} className="flex-1 border border-gray-400 px-1 py-0.5 outline-none focus:bg-[#fff9c4]" />
                                    </div>
                                    <div className="flex items-start">
                                        <label className="w-32 font-bold text-gray-700 mt-1">Narration:</label>
                                        <textarea ref={narrationRef} value={data.narration} onChange={e => setData('narration', e.target.value)} onKeyDown={(e) => handleKeyDown(e, null)} className="flex-1 border border-gray-400 px-1 py-0.5 outline-none h-16 resize-none focus:bg-[#fff9c4]" />
                                    </div>
                                </div>
                            </div>
                        </CommonFormModal>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}