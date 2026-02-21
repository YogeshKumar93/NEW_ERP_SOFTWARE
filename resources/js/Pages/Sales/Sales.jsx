import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";

export default function Sales({ sales = [], customers = [], items = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [salesList, setSalesList] = useState(sales ?? []);
    
    // Refs for keyboard focus control
    const dateRef = useRef(null);
    const customerRef = useRef(null);
    const submitRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        customer_id: "",
        items: [{ item_id: "", qty: 1, rate: 0, amount: 0 }],
    });

    // Sync sales list when props change
    useEffect(() => {
    if (JSON.stringify(sales) !== JSON.stringify(salesList)) {
        setSalesList(sales);
    }
}, [sales]);

    const toggleCreate = () => {
        reset();
        setIsFormOpen(true);
        // Modal open hone ke thodi der baad focus set karein
        setTimeout(() => dateRef.current?.focus(), 150);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            // Agar select box open hai toh Enter default behavior rehne dein
            // par focus shift karne ke liye preventDefault zaroori hai
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            } else {
                // Agar aakhri field hai toh submitRef (Hidden Button) ko click karein
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
        
        console.log("Submitting Data...", data);

        post(route('sales.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsFormOpen(false);
                alert("Voucher Saved Successfully!");
            },
            onError: (err) => {
                console.error("Submission Errors:", err);
            }
        });
    };

    const grandTotal = data.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    // Keyboard Shortcuts
    useShortcuts({
        'alt+c': () => toggleCreate(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < salesList.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
        'alt+a': () => isFormOpen && addRow(),
    }, isFormOpen);

    return (
        <AppLayout title="Sales Voucher">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                {/* Header Toolbar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Sales</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Alt+A</span>:Add Row | <span className="underline decoration-yellow-400">Esc</span>:Close
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* Main Table List */}
                    <CommonTable
                        title="Sales Vouchers"
                        headers={["Date", "Customer", "Total Amount"]}
                        data={salesList}
                        columns={["date", "customer_name", "total_amount"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(sale) => console.log("Row Clicked:", sale)}
                    />

                    {/* Entry Modal */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Sales Voucher Creation"
                        onCancel={() => setIsFormOpen(false)}
                        width="w-[950px]"
                        processing={processing}
                    >
                        {/* FORM TAG IS MANDATORY FOR SUBMIT TO WORK */}
                        <form onSubmit={handleSubmit}>
                            <div className="bg-[#e3f2fd] p-4 border border-blue-200 text-[11px]">
                                {/* Header Section */}
                                <div className="grid grid-cols-2 gap-10 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <label className="w-24 font-bold text-gray-700">Date:</label>
                                            <input 
                                                ref={dateRef}
                                                type="date" 
                                                value={data.date} 
                                                onChange={e => setData('date', e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, customerRef)}
                                                className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="w-24 font-bold text-gray-700">Customer:</label>
                                            <select 
                                                ref={customerRef}
                                                value={data.customer_id} 
                                                onChange={e => setData('customer_id', e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, null)} // Last field triggers submit
                                                className={`flex-1 border px-1 py-0.5 focus:bg-[#fff9c4] outline-none ${errors.customer_id ? 'border-red-500' : 'border-gray-400'}`}
                                            >
                                                <option value="">Select Customer</option>
                                                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        {errors.customer_id && <div className="text-red-600 text-[9px] ml-24 uppercase font-bold">{errors.customer_id}</div>}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-blue-900 font-bold uppercase underline">Voucher No: Auto</div>
                                    </div>
                                </div>

                                {/* Items Grid */}
                                <div className="border border-gray-400 bg-white min-h-[200px] shadow-sm">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#004a4d] text-white uppercase text-[9px]">
                                                <th className="border border-gray-400 p-1 w-8">#</th>
                                                <th className="border border-gray-400 p-1 text-left">Item Name</th>
                                                <th className="border border-gray-400 p-1 w-20">Qty</th>
                                                <th className="border border-gray-400 p-1 w-24">Rate</th>
                                                <th className="border border-gray-400 p-1 w-24">Amount</th>
                                                <th className="border border-gray-400 p-1 w-8"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.items.map((row, index) => (
                                                <tr key={index} className="hover:bg-yellow-50">
                                                    <td className="border border-gray-300 text-center text-gray-400">{index + 1}</td>
                                                    <td className="border border-gray-300">
                                                        <select 
                                                            className="w-full px-1 outline-none focus:bg-[#fff9c4]"
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
                                                            className="w-full px-1 text-right outline-none focus:bg-[#fff9c4]"
                                                            value={row.qty}
                                                            onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300">
                                                        <input 
                                                            type="number" 
                                                            className="w-full px-1 text-right outline-none focus:bg-[#fff9c4]"
                                                            value={row.rate}
                                                            onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 text-right px-2 font-bold bg-gray-50">
                                                        {row.amount.toFixed(2)}
                                                    </td>
                                                    <td className="border border-gray-300 text-center">
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeRow(index)} 
                                                            className="text-red-600 hover:font-bold px-1"
                                                        >×</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Summary & Actions */}
                                <div className="flex justify-between items-start mt-3">
                                    <button 
                                        type="button" 
                                        onClick={addRow}
                                        className="bg-gray-200 border border-gray-500 px-3 py-1 text-[10px] hover:bg-gray-300 transition-colors uppercase font-bold"
                                    >
                                        + Add Line (Alt+A)
                                    </button>
                                    
                                    <div className="w-[300px] bg-white border border-gray-400 p-2 shadow-sm">
                                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                                            <span className="font-bold text-gray-600 uppercase text-[10px]">Grand Total:</span>
                                            <span className="font-bold text-blue-900 text-[15px]">₹ {grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                                        </div>
                                        <div className="text-[9px] text-gray-500 italic">
                                            * Verify all items before saving.
                                        </div>
                                    </div>
                                </div>

                                {/* HIDDEN SUBMIT BUTTON - Important for refs and Enter key */}
                                <button 
                                    type="submit" 
                                    ref={submitRef} 
                                    className="hidden"
                                    disabled={processing}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}