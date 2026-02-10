import React, { useState, useRef, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import Footer from "@/Components/Navigation/Footer";

export default function Index({ companies }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", gstin: "" });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const gstinRef = useRef(null);
    const submitRef = useRef(null);

    // 1. Actions Logic
    const toggleCreate = () => {
        setIsFormOpen(true);
        setTimeout(() => nameRef.current?.focus(), 50);
    };

    const handleBack = () => {
        if (isFormOpen) {
            setIsFormOpen(false);
        } else {
            window.history.back();
        }
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
        if (!form.name) return alert("Company Name is required!");
        Inertia.post('/companies', form, {
            preserveScroll: true,
            onSuccess: () => {
                setForm({ name: "", email: "", phone: "", address: "", gstin: "" });
                setIsFormOpen(false);
            },
        });
    };

    // 2. Navigation & Shortcuts (Pro Logic)
    useShortcuts({
        'alt+c': toggleCreate,
        'Escape': handleBack,
        'ArrowDown': () => setActiveIndex(prev => (prev < companies.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
        'Enter': () => !isFormOpen && console.log("Selecting Company:", companies[activeIndex]),
    }, isFormOpen); // Background logic stops when form opens

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono">
                {/* Tally Style Top Bar */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Companies</span>
                    <span className="flex gap-4">
                        <span className="underline decoration-yellow-400">K</span>:Company | <span className="underline decoration-yellow-400">C</span>:Create
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    <CommonTable
                        title="Select Company"
                        headers={["Company Name", "Phone", "Email", "GSTIN"]}
                        data={companies}
                        columns={["name", "phone", "email", "gstin"]}
                        activeIndex={activeIndex}
                    />

                    <CommonFormModal
                        isOpen={isFormOpen} 
                        title="Company Creation"
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        submitRef={submitRef}
                    >
                        <div className="flex flex-col gap-3">
                            {[
                                { label: "Name", ref: nameRef, next: emailRef, key: "name", type: "text" },
                                { label: "Email", ref: emailRef, next: phoneRef, key: "email", type: "email" },
                                { label: "Phone", ref: phoneRef, next: addressRef, key: "phone", type: "text" },
                            ].map((field) => (
                                <div key={field.key} className="flex items-center">
                                    <label className="w-32 font-bold text-gray-700">{field.label}:</label>
                                    <input 
                                        ref={field.ref}
                                        type={field.type}
                                        value={form[field.key]}
                                        onChange={e => setForm({...form, [field.key]: field.key === 'name' ? e.target.value.toUpperCase() : e.target.value})}
                                        onKeyDown={(e) => handleKeyDown(e, field.next)}
                                        className="flex-1 border border-gray-400 p-1 bg-white focus:bg-[#fff9c4] outline-none"
                                    />
                                </div>
                            ))}
                            <div className="flex items-start">
                                <label className="w-32 font-bold text-gray-700">Address:</label>
                                <textarea 
                                    ref={addressRef}
                                    rows="2"
                                    value={form.address}
                                    onChange={e => setForm({...form, address: e.target.value})}
                                    onKeyDown={(e) => handleKeyDown(e, gstinRef)}
                                    className="flex-1 border border-gray-400 p-1 bg-white focus:bg-[#fff9c4] outline-none"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 font-bold text-gray-700">GSTIN:</label>
                                <input 
                                    ref={gstinRef}
                                    type="text"
                                    value={form.gstin}
                                    onChange={e => setForm({...form, gstin: e.target.value.toUpperCase()})}
                                    onKeyDown={(e) => handleKeyDown(e, submitRef)}
                                    className="flex-1 border border-gray-400 p-1 bg-white focus:bg-[#fff9c4] outline-none"
                                />
                            </div>
                        </div>
                    </CommonFormModal>
                </div>

               
            </div>
        </AppLayout>
    );
}