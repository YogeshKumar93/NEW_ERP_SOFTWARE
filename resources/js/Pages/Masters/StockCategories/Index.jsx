import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";

export default function Index({ categories = [], allCategories = [] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const tableRef = useRef(null);
    const nameRef = useRef(null);
    const parentRef = useRef(null);
    const submitRef = useRef(null);

    // useForm initialization
    const { data, setData, post, reset, processing, errors, transform } = useForm({
        name: "",
        parent_id: "", 
    });

    // Transform logic: Empty string ko null mein convert karta hai for backend
    transform((data) => ({
        ...data,
        parent_id: data.parent_id === "" ? null : data.parent_id,
    }));

    // --- Utility: Recursive data ko Flat list mein convert karna for Table ---
    const flattenCategories = (items, level = 0, result = []) => {
        items.forEach((cat) => {
            result.push({
                ...cat,
                display_name: `${"\u00A0".repeat(level * 4)}${level > 0 ? "↳ " : ""}${cat.name}`,
                level: level
            });
            if (cat.children_recursive && cat.children_recursive.length > 0) {
                flattenCategories(cat.children_recursive, level + 1, result);
            }
        });
        return result;
    };

    const flatCategories = flattenCategories(categories);

    // Form Handlers
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
        if (e) e.preventDefault();
        post(route("stock-categories.store"), {
            onSuccess: () => {
                reset();
                setIsFormOpen(false);
            },
        });
    };

    // Keyboard Shortcuts
    useShortcuts({
        'alt+c': () => toggleCreate(),
        'Escape': () => setIsFormOpen(false),
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < flatCategories.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
        'Enter': () => {
            if (!isFormOpen && flatCategories[activeIndex]) {
                console.log("Selected:", flatCategories[activeIndex]);
            }
        }
    }, isFormOpen);

    return (
        <AppLayout title="Stock Categories">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden text-slate-900">
                {/* Tally Style Top Header */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Inventory {'>'} Stock Categories</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400 font-bold">Alt+C</span>:Create | 
                        <span className="underline decoration-yellow-400 font-bold ml-2">Esc</span>:Back
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* List Table */}
                    <CommonTable
                        ref={tableRef}
                        title="List of Stock Categories"
                        headers={["Category Name", "Parent ID"]}
                        data={flatCategories}
                        columns={["display_name", "parent_id"]} 
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        onRowSelect={(cat) => console.log("Selected:", cat)}
                    />

                    {/* Tally Style Creation Modal */}
                    <CommonFormModal
                        isOpen={isFormOpen}
                        title="Stock Category Creation"
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        submitRef={submitRef}
                        width="w-[500px]"
                    >
                        <div className="space-y-4 text-[11px] bg-[#e3f2fd] p-6 border border-blue-300 shadow-inner">
                            <h3 className="font-bold border-b border-blue-400 text-blue-900 pb-1 mb-4 uppercase tracking-tighter">
                                Category Information
                            </h3>
                            
                            {/* Name Field */}
                            <div className="flex items-center">
                                <label className="w-32 font-bold text-slate-700 shrink-0">Name:</label>
                                <input 
                                    ref={nameRef} 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value.toUpperCase())} 
                                    onKeyDown={(e) => handleKeyDown(e, parentRef)} 
                                    className="flex-1 border border-slate-400 px-2 py-1 focus:bg-[#fff9c4] outline-none border-inset transition-colors" 
                                    autoComplete="off"
                                />
                            </div>

                            {/* Under (Parent) Dropdown */}
                            <div className="flex items-center">
                                <label className="w-32 font-bold text-slate-700 shrink-0">Under:</label>
                                <select 
                                    ref={parentRef}
                                    value={data.parent_id || ""} 
                                    onChange={e => setData('parent_id', e.target.value)} 
                                    onKeyDown={(e) => handleKeyDown(e, submitRef)}
                                    className="flex-1 border border-slate-400 px-1 py-1 focus:bg-[#fff9c4] outline-none h-8 font-mono"
                                >
                                    <option value="">Primary</option>
                                    {allCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Error Display */}
                            {(errors.name || errors.parent_id) && (
                                <div className="bg-red-50 border border-red-200 p-2 text-red-700 text-[10px]">
                                    {errors.name && <p>• {errors.name}</p>}
                                    {errors.parent_id && <p>• {errors.parent_id}</p>}
                                </div>
                            )}
                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}