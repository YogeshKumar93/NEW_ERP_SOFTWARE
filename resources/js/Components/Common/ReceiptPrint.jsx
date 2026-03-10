import React from "react";

export default function ReceiptPrint({ data, onBack }) {
    if (!data) return null;

    return (
        <div className="min-h-screen bg-white p-10 font-mono text-gray-800 relative select-none">
            {/* Back Button - Screen par dikhega, Print me nahi */}
            <button 
                onClick={onBack}
                className="fixed top-4 left-4 bg-[#004a4d] text-white px-4 py-1 text-xs uppercase print:hidden hover:bg-black transition-all"
            >
                ← Back to List
            </button>

            {/* Print Action Button - Screen par dikhega */}
            <button 
                onClick={() => window.print()}
                className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-1 text-xs uppercase print:hidden hover:bg-blue-800 transition-all"
            >
                Print Voucher
            </button>

            {/* --- ACTUAL RECEIPT DESIGN --- */}
            <div className="max-w-4xl mx-auto mt-10">
                {/* Header Path */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-16">
                    <h1 className="text-2xl font-semibold tracking-tighter text-[#1e3a8a]">RECEIPT VOUCHER</h1>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PATH / RECEIPT VOUCHER</span>
                </div>

                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-[28px] font-bold tracking-[0.4em] mb-2 uppercase">Receipt Voucher</h2>
                    <p className="text-[11px] text-gray-500 font-medium">Biggbrains 4.0 ERP Systems</p>
                    <div className="w-full border-b-[4px] border-black mt-4 shadow-sm"></div>
                </div>

                {/* Voucher Info */}
                <div className="flex justify-between text-[15px] font-bold mb-12 px-6">
                    <div className="space-y-3">
                        <p className="flex items-center">Voucher No: <span className="ml-4 font-normal text-gray-600">{data.id}</span></p>
                        <p className="flex items-center">Account: <span className="ml-10 italic text-[#1e40af] uppercase underline decoration-blue-200">{data.receipt_mode}</span></p>
                    </div>
                    <div className="text-right">
                        <p>Date: <span className="ml-6 font-bold">{data.date || data.receipt_date}</span></p>
                    </div>
                </div>

                {/* Main Content Box (Exact Image Style) */}
                <div className="border border-gray-400 p-12 space-y-12 mx-4 bg-[#fcfcfc]">
                    <div className="flex items-end justify-between border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-700 uppercase tracking-widest text-[13px]">Particulars:</span>
                        <span className="text-[#1d4ed8] font-bold uppercase underline decoration-dotted decoration-blue-300 text-2xl tracking-wider">{data.ledger_name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-700 uppercase tracking-widest text-[13px]">Amount:</span>
                        <div className="text-right leading-none">
                            <span className="text-4xl font-bold block mb-2">₹</span>
                            <span className="text-6xl font-bold tracking-tighter block">{data.amount}</span>
                            <span className="text-5xl font-bold block mt-2">/-</span>
                        </div>
                    </div>

                    <div className="flex items-start justify-between pt-2">
                        <span className="font-bold text-gray-700 uppercase tracking-widest text-[13px] mt-1">Narration:</span>
                        <span className="text-right italic text-[#3b82f6] font-semibold text-lg max-w-sm leading-tight">{data.narration || 'Being amount received.'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}