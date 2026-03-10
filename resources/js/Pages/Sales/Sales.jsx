import React, { useState, useRef, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";

export default function Sales({ sales = [], customers = [], items = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

console.log("Sales Component Rendered with sales:", sales);

    // Refs for Focus Management
    const dateRef = useRef(null);
    const customerRef = useRef(null);
    const submitRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        customer_id: "",
        items: [{ item_id: "", qty: 1, rate: 0, amount: 0 }],
    });

    const toggleCreate = () => {
        reset();
        setIsFormOpen(true);
        // Modal open hone ke baad date field par focus
        setTimeout(() => dateRef.current?.focus(), 150);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            } else {
                // Agar nextRef nahi hai, toh table ke niche ya submit par focus karein
                submitRef.current?.click();
            }
        }
    };

    const handleItemChange = (index, field, value) => {
        const updated = [...data.items];
        updated[index][field] = value;

        if (field === "qty" || field === "rate") {
            const q = parseFloat(updated[index].qty || 0);
            const r = parseFloat(updated[index].rate || 0);
            updated[index].amount = q * r;
        }
        setData("items", updated);
    };

    const addRow = () => {
        setData("items", [...data.items, { item_id: "", qty: 1, rate: 0, amount: 0 }]);
    };

    const removeRow = (index) => {
        if (data.items.length > 1) {
            const updated = [...data.items];
            updated.splice(index, 1);
            setData("items", updated);
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        
        post(route('sales.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsFormOpen(false);
                reset();
                // Optional: Force refresh data if needed
                router.reload({ only: ['sales'] });
            },
        });
    };

    const grandTotal = data.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    // Tally Shortcuts
    useShortcuts({
        'alt+c': () => toggleCreate(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < sales.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
        'alt+a': () => isFormOpen && addRow(),
    }, isFormOpen);

    return (
        <AppLayout title="Sales Voucher">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                {/* Tally Top Bar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Transactions {'>'} Sales</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Alt+A</span>:Add Row | <span className="underline decoration-yellow-400">Esc</span>:Close
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* Main Table View - Using 'sales' prop directly to ensure reactivity */}
                    <CommonTable
                        title="List of Sales Vouchers"
                        headers={["Date", "Customer Name", "Total Amount"]}
                        data={sales} 
                        columns={["date", "customer_name", "total_amount"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(sale) => console.log("Selected Sale:", sale)}
                    />

                    {/* ERP Style Creation Modal */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Sales Voucher Creation"
                        onCancel={() => setIsFormOpen(false)}
                        onSubmit={handleSubmit}
                        width="w-[900px]"
                        processing={processing}
                    >
                        <div className="bg-[#e3f2fd] p-5 border border-blue-200 text-[11px]">
                            <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-4 uppercase">Voucher Details</h3>

                            <div className="grid grid-cols-2 gap-8 mb-6">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <label className="w-24 font-bold text-gray-700 uppercase">Date:</label>
                                        <input
                                            ref={dateRef}
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, customerRef)}
                                            className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none"
                                        />
                                    </div>
                                    {errors.date && <div className="text-red-600 ml-24">{errors.date}</div>}

                                    <div className="flex items-center">
                                        <label className="w-24 font-bold text-gray-700 uppercase">Customer:</label>
                                        <select
                                            ref={customerRef}
                                            value={data.customer_id}
                                            onChange={e => setData('customer_id', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, null)}
                                            className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none"
                                        >
                                            <option value="">Select Customer</option>
                                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    {errors.customer_id && <div className="text-red-600 ml-24">{errors.customer_id}</div>}
                                </div>

                                <div className="text-right flex flex-col justify-center">
                                    <div className="text-[14px] font-bold text-blue-900 uppercase underline">No. New Voucher</div>
                                </div>
                            </div>

                            {/* Inventory Table */}
                            <div className="border border-gray-400 bg-white min-h-[180px] shadow-inner mb-4 overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#004a4d] text-white uppercase text-[9px] text-left sticky top-0">
                                            <th className="border border-gray-400 p-1.5 w-8 text-center">#</th>
                                            <th className="border border-gray-400 p-1.5">Particulars</th>
                                            <th className="border border-gray-400 p-1.5 w-24 text-right">Qty</th>
                                            <th className="border border-gray-400 p-1.5 w-28 text-right">Rate</th>
                                            <th className="border border-gray-400 p-1.5 w-32 text-right">Amount</th>
                                            <th className="border border-gray-400 p-1.5 w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.items.map((row, index) => (
                                            <tr key={index} className="hover:bg-yellow-50">
                                                <td className="border border-gray-300 text-center text-gray-500">{index + 1}</td>
                                                <td className="border border-gray-300">
                                                    <select
                                                        className="w-full px-2 py-1 outline-none focus:bg-[#fff9c4]"
                                                        value={row.item_id}
                                                        onChange={(e) => handleItemChange(index, "item_id", e.target.value)}
                                                    >
                                                        <option value="">Select Item</option>
                                                        {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                                    </select>
                                                </td>
                                                <td className="border border-gray-300">
                                                    <input
                                                        type="number"
                                                        className="w-full px-2 py-1 text-right outline-none focus:bg-[#fff9c4]"
                                                        value={row.qty}
                                                        onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300">
                                                    <input
                                                        type="number"
                                                        className="w-full px-2 py-1 text-right outline-none focus:bg-[#fff9c4]"
                                                        value={row.rate}
                                                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 text-right px-2 font-bold bg-gray-50">
                                                    {row.amount.toFixed(2)}
                                                </td>
                                                <td className="border border-gray-300 text-center">
                                                    <button type="button" onClick={() => removeRow(index)} className="text-red-600">×</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-start">
                                <button type="button" onClick={addRow} className="bg-gray-200 border border-gray-500 px-3 py-1 text-[10px] uppercase font-bold">
                                    + Add Item Row (Alt+A)
                                </button>

                                <div className="w-[320px] bg-white border border-gray-400 p-3">
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-1 mb-1">
                                        <span className="font-bold text-gray-600 uppercase text-[10px]">Total:</span>
                                        <span className="font-bold text-blue-900 text-[16px]">₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-400 italic text-right">
                                        Press Save Button to Complete
                                    </div>
                                </div>
                            </div>
                            
                            {/* Submit button with Ref */}
                            <button type="submit" ref={submitRef} disabled={processing} className="mt-4 bg-[#004a4d] text-white px-6 py-2 uppercase text-[10px] font-bold hover:bg-[#003638]">
                                {processing ? 'Saving...' : 'Save Voucher'}
                            </button>
                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}