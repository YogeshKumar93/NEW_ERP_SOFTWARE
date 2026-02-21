import React from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Sales({ customers, items }) {
    const { data, setData, post, processing, errors } = useForm({
        date: "",
        customer_id: "",
        items: [
            { item_id: "", qty: 1, rate: 0, amount: 0 }
        ],
    });

    // Add new row
    const addRow = () => {
        setData("items", [
            ...data.items,
            { item_id: "", qty: 1, rate: 0, amount: 0 }
        ]);
    };

    // Remove row
    const removeRow = (index) => {
        const updated = [...data.items];
        updated.splice(index, 1);
        setData("items", updated);
    };

    // Handle item change
    const handleItemChange = (index, field, value) => {
        const updated = [...data.items];
        updated[index][field] = value;

        if (field === "qty" || field === "rate") {
            updated[index].amount =
                parseFloat(updated[index].qty || 0) *
                parseFloat(updated[index].rate || 0);
        }

        setData("items", updated);
    };

    // Calculate Grand Total
    const grandTotal = data.items.reduce(
        (sum, item) => sum + parseFloat(item.amount || 0),
        0
    );

    const submit = (e) => {
        e.preventDefault();
        post("/sales");
    };

    return (
        <AppLayout>
            <div className="p-6 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Sales Voucher</h2>

                <form onSubmit={submit}>

                    {/* Date + Customer */}
                    <div className="grid grid-cols-3 gap-4 mb-4">

                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                className="w-full border p-2"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                            />
                            {errors.date && (
                                <div className="text-red-500 text-sm">
                                    {errors.date}
                                </div>
                            )}
                        </div>

                        <div>
                            <label>Customer</label>
                            <select
                                className="w-full border p-2"
                                value={data.customer_id}
                                onChange={(e) =>
                                    setData("customer_id", e.target.value)
                                }
                            >
                                <option value="">Select Customer</option>
                                {customers.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.customer_id && (
                                <div className="text-red-500 text-sm">
                                    {errors.customer_id}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full border mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Item</th>
                                <th className="border p-2">Qty</th>
                                <th className="border p-2">Rate</th>
                                <th className="border p-2">Amount</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((row, index) => (
                                <tr key={index}>
                                    <td className="border p-2">
                                        <select
                                            className="w-full border p-1"
                                            value={row.item_id}
                                            onChange={(e) =>
                                                handleItemChange(
                                                    index,
                                                    "item_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Select</option>
                                            {items.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            className="w-full border p-1"
                                            value={row.qty}
                                            onChange={(e) =>
                                                handleItemChange(
                                                    index,
                                                    "qty",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>

                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            className="w-full border p-1"
                                            value={row.rate}
                                            onChange={(e) =>
                                                handleItemChange(
                                                    index,
                                                    "rate",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>

                                    <td className="border p-2 text-right">
                                        {row.amount.toFixed(2)}
                                    </td>

                                    <td className="border p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeRow(index)
                                            }
                                            className="text-red-500"
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        type="button"
                        onClick={addRow}
                        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
                    >
                        + Add Item
                    </button>

                    {/* Grand Total */}
                    <div className="text-right text-lg font-bold mb-4">
                        Grand Total: {grandTotal.toFixed(2)}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Save Sale
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}