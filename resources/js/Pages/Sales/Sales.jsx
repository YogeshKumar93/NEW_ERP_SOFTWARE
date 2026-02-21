import React, { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";

export default function Sales({ customers = [], items = [] }) {
    const [showForm, setShowForm] = useState(false);

    const dateRef = useRef(null);
    const customerRef = useRef(null);
    const submitRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        customer_id: "",
        items: [{ item_id: "", qty: 1, rate: 0, amount: 0 }],
    });

    const toggleForm = () => {
        reset();
        setShowForm(true);
        setTimeout(() => dateRef.current?.focus(), 100);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef && nextRef.current) nextRef.current.focus();
            else submitRef.current?.click();
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
        e.preventDefault();
        post(route('sales.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Sale Saved Successfully!");
                reset();
                setShowForm(false);
            },
            onError: (err) => console.error("Errors:", err),
        });
    };

    const grandTotal = data.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            <h1 className="text-xl font-bold mb-4">Sales Voucher</h1>

            <button
                onClick={toggleForm}
                className="bg-blue-600 text-white px-3 py-1 mb-4 rounded hover:bg-blue-700"
            >
                + New Sale
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
                    {/* Header Section */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="font-bold text-gray-700 text-sm">Date</label>
                            <input
                                type="date"
                                ref={dateRef}
                                value={data.date}
                                onChange={e => setData('date', e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, customerRef)}
                                className="border px-2 py-1 focus:outline-none focus:bg-yellow-50"
                            />
                            {errors.date && <span className="text-red-600 text-xs">{errors.date}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold text-gray-700 text-sm">Customer</label>
                            <select
                                ref={customerRef}
                                value={data.customer_id}
                                onChange={e => setData('customer_id', e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, null)}
                                className="border px-2 py-1 focus:outline-none focus:bg-yellow-50"
                            >
                                <option value="">Select Customer</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.customer_id && <span className="text-red-600 text-xs">{errors.customer_id}</span>}
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-200 text-sm">
                                <th className="border p-1">#</th>
                                <th className="border p-1">Item</th>
                                <th className="border p-1 w-20">Qty</th>
                                <th className="border p-1 w-24">Rate</th>
                                <th className="border p-1 w-24">Amount</th>
                                <th className="border p-1 w-8">X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="border text-center">{idx + 1}</td>
                                    <td className="border p-1">
                                        <select
                                            value={row.item_id}
                                            onChange={e => handleItemChange(idx, 'item_id', e.target.value)}
                                            className="w-full px-1"
                                        >
                                            <option value="">Select Item</option>
                                            {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                        </select>
                                    </td>
                                    <td className="border p-1">
                                        <input
                                            type="number"
                                            value={row.qty}
                                            onChange={e => handleItemChange(idx, 'qty', e.target.value)}
                                            className="w-full px-1 text-right"
                                        />
                                    </td>
                                    <td className="border p-1">
                                        <input
                                            type="number"
                                            value={row.rate}
                                            onChange={e => handleItemChange(idx, 'rate', e.target.value)}
                                            className="w-full px-1 text-right"
                                        />
                                    </td>
                                    <td className="border p-1 text-right">{row.amount.toFixed(2)}</td>
                                    <td className="border p-1 text-center">
                                        <button type="button" onClick={() => removeRow(idx)} className="text-red-600">×</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={addRow} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                            + Add Row
                        </button>

                        <div className="text-right">
                            <span className="font-bold">Grand Total: </span>
                            <span>₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        ref={submitRef}
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                        Save Sale
                    </button>
                </form>
            )}
        </div>
    );
}