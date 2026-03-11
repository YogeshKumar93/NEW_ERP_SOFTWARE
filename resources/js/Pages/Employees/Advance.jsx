import React, { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import AppLayout from "@/Layouts/AppLayout";

export default function Advance({ employees, advances }) {
    const { data, setData, post, reset, processing } = useForm({
        employee_id: "",
        amount: ""
    });

    const [salary, setSalary] = useState(null);
    const [loadingSalary, setLoadingSalary] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Refs for Focus Management (Like Tally)
    const empRef = useRef(null);
    const amountRef = useRef(null);
    const submitRef = useRef(null);

    function submit(e) {
        e.preventDefault();
         console.log("Form Submitted"); 
        post("/advance", {
            onSuccess: () => {
                reset();
                setSalary(null);
                empRef.current?.focus();
            }
        });
    }

    const checkSalary = async (id) => {
        setLoadingSalary(true);
        try {
            const res = await axios.get(`/salary/${id}`);
            setSalary(res.data);
        } catch (error) {
            console.error("Error fetching salary", error);
        } finally {
            setLoadingSalary(false);
        }
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            nextRef?.current?.focus();
        }
    };

    return (
        <AppLayout title="Employee Advance Voucher">
            <div className="flex flex-col h-screen bg-[#f4f4f4] font-mono overflow-hidden">

                {/* Tally Top Bar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Transactions {'>'} Employee Advance</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
                    </span>
                </div>

                <div className="flex-1 flex p-4 gap-4 overflow-hidden">

                    {/* LEFT: Advance Creation Form (ERP Style) */}
                    <div className="w-[450px] shrink-0">
                        <div className="bg-[#e3f2fd] border border-blue-300 h-full flex flex-col shadow-sm">
                            <div className="bg-[#004a4d] text-white text-[11px] p-2 font-bold uppercase tracking-widest">
                                Advance Request Entry
                            </div>

                            <form onSubmit={submit} className="p-4 flex-1 space-y-4 text-[11px]">
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700 uppercase">Employee:</label>
                                        <select
                                            ref={empRef}
                                            className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none"
                                            value={data.employee_id}
                                            onChange={(e) => {
                                                const id = e.target.value;
                                                setData("employee_id", id);
                                                if (id) {
                                                    checkSalary(id);
                                                }
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, amountRef)}
                                            required
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <label className="w-32 font-bold text-gray-700 uppercase">Advance Amount:</label>
                                        <input
                                            ref={amountRef}
                                            type="number"
                                            className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none font-bold text-blue-900"
                                            placeholder="0.00"
                                            value={data.amount}
                                            onChange={(e) => setData("amount", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, submitRef)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-blue-200">
                                    <button
                                        ref={submitRef}
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#004a4d] text-white px-6 py-2 uppercase font-bold hover:bg-[#003638] transition-all shadow-md w-full"
                                    >
                                        {processing ? 'Processing...' : 'Save Advance (Enter)'}
                                    </button>
                                </div>

                                {/* Salary Audit Section - ERP Style Widget */}
                                {salary && (
                                    <div className="mt-6 bg-white border border-blue-300 p-3 shadow-inner">
                                        <div className="text-[10px] font-bold text-blue-900 border-b border-blue-100 pb-1 mb-2 uppercase italic">
                                            Financial Audit Report
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Basic Salary:</span>
                                                <span className="font-bold">₹{salary.basic_salary}</span>
                                            </div>
                                            <div className="flex justify-between text-red-600">
                                                <span>Total Advance:</span>
                                                <span className="font-bold">-₹{salary.total_advance}</span>
                                            </div>
                                            <div className="flex justify-between pt-2 border-t border-dashed border-gray-300 text-[13px]">
                                                <span className="font-bold text-gray-700 uppercase">Net Payable:</span>
                                                <span className="font-black text-blue-900 underline underline-offset-4">₹{salary.remaining_salary}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Advance List Table (ERP List View) */}
                    <div className="flex-1 flex flex-col bg-white border border-gray-300 shadow-sm">
                        <div className="bg-[#004a4d] text-white text-[11px] p-2 font-bold uppercase flex justify-between">
                            <span>List of Advance Vouchers</span>
                            <span className="bg-yellow-400 text-black px-2 rounded-sm text-[9px]">Live Data</span>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <table className="w-full border-collapse text-[11px]">
                                <thead>
                                    <tr className="bg-gray-200 sticky top-0 z-10 shadow-sm">
                                        <th className="border border-gray-300 p-2 text-left uppercase w-12 text-gray-600">#</th>
                                        <th className="border border-gray-300 p-2 text-left uppercase text-gray-600">Employee Name</th>
                                        <th className="border border-gray-300 p-2 text-right uppercase text-gray-600">Advance Amount</th>
                                        <th className="border border-gray-300 p-2 text-center uppercase text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {advances.map((adv, index) => (
                                        <tr
                                            key={adv.id}
                                            className={`hover:bg-[#fff9c4] cursor-pointer ${activeIndex === index ? 'bg-[#fff9c4]' : ''}`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            <td className="border border-gray-200 p-2 text-center text-gray-400">{index + 1}</td>
                                            <td className="border border-gray-200 p-2 font-semibold text-gray-800">{adv.employee.name}</td>
                                            <td className="border border-gray-200 p-2 text-right font-bold text-blue-900">₹{parseFloat(adv.amount).toLocaleString('en-IN')}</td>
                                            <td className="border border-gray-200 p-2 text-center">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); checkSalary(adv.employee.id); }}
                                                    className="bg-gray-100 border border-gray-400 px-3 py-0.5 text-[9px] font-bold uppercase hover:bg-[#004a4d] hover:text-white transition-colors"
                                                >
                                                    {loadingSalary ? '...' : 'Check Salary'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {advances.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-10 text-center text-gray-400 italic">No records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Tally Style Bottom Total Bar */}
                        <div className="bg-gray-100 border-t border-gray-400 p-2 px-6 flex justify-between items-center shrink-0">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Grand Total:</span>
                            <span className="text-lg font-black text-[#004a4d]">
                                ₹{advances.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}