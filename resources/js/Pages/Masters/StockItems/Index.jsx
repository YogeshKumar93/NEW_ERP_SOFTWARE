import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";

export default function Index({ stockItems = [], units = [], categories = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [stockList, setStockList] = useState(stockItems ?? []);
    const tableRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        unit_id: "",
        hsn_code: "",
        gst_percent: "0",
        stock_category_id: "",
        opening_stock: "0",
        opening_rate: "0",
    });

    // Refs for Focus Management
    const nameRef = useRef(null);
    const unitRef = useRef(null);
    const categoryRef = useRef(null);
    const hsnRef = useRef(null);
    const gstRef = useRef(null);
    const stockRef = useRef(null);
    const rateRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        setStockList(stockItems);
        setActiveIndex(0);
    }, [stockItems]);

    const toggleCreate = () => {
        setIsFormOpen(true);
        setTimeout(() => nameRef.current?.focus(), 50);
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef && nextRef.current) nextRef.current.focus();
            else handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("stock-items.store"), {
            onSuccess: () => {
                reset();
                setIsFormOpen(false);
            },
        });
    };

    useShortcuts({
        'alt+c': () => toggleCreate(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < stockList.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, isFormOpen);

    return (
        <AppLayout title="Stock Items">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                {/* Top Header Bar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Inventory {'>'} Stock Items</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* Main Table */}
                    <CommonTable
                        ref={tableRef}
                        title="List of Stock Items"
                        headers={["Name", "Unit", "Category", "HSN", "GST %", "Opening Stock", "Rate"]}
                        data={stockList}
                        columns={["name", "unit.name", "category.name", "hsn_code", "gst_percent", "opening_stock", "opening_rate"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(item) => console.log("Selected:", item)}
                    />

                    {/* Creation Form Modal */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Stock Item Creation"
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        submitRef={submitRef}
                        width="w-[750px]"
                    >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">
                            
                            {/* Left Column: General Info */}
                            <div className="space-y-2">
                                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">General Details</h3>
                                
                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">Name:</label>
                                    <input ref={nameRef} type="text" value={data.name} onChange={e => setData('name', e.target.value.toUpperCase())} onKeyDown={(e) => handleKeyDown(e, unitRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">Under Unit:</label>
                                    <select ref={unitRef} value={data.unit_id} onChange={e => setData('unit_id', e.target.value)} onKeyDown={(e) => handleKeyDown(e, categoryRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none">
                                        <option value="">Select Unit</option>
                                        {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">Category:</label>
                                    <select ref={categoryRef} value={data.stock_category_id} onChange={e => setData('stock_category_id', e.target.value)} onKeyDown={(e) => handleKeyDown(e, hsnRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none">
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Right Column: Statutory & Opening */}
                            <div className="space-y-2">
                                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Tax & Stock Details</h3>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">HSN Code:</label>
                                    <input ref={hsnRef} type="text" value={data.hsn_code} onChange={e => setData('hsn_code', e.target.value)} onKeyDown={(e) => handleKeyDown(e, gstRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">GST %:</label>
                                    <input ref={gstRef} type="number" value={data.gst_percent} onChange={e => setData('gst_percent', e.target.value)} onKeyDown={(e) => handleKeyDown(e, stockRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">Opening Qty:</label>
                                    <input ref={stockRef} type="number" value={data.opening_stock} onChange={e => setData('opening_stock', e.target.value)} onKeyDown={(e) => handleKeyDown(e, rateRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700 shrink-0">Rate per Unit:</label>
                                    <input ref={rateRef} type="number" value={data.opening_rate} onChange={e => setData('opening_rate', e.target.value)} onKeyDown={(e) => handleKeyDown(e, submitRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>
                            </div>

                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}