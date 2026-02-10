import React, { useState, useRef, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";

export default function Index({ companies }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [form, setForm] = useState({ 
        name: '', email: '', phone: '', address: '', city: '', 
        state: '', pincode: '', gstin: '', pan: '', 
        financial_year_from: '', books_beginning_from: '', 
    });

    // Refs
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);
    const gstinRef = useRef(null);
    const panRef = useRef(null);
    const fyRef = useRef(null);
    const booksRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        const handleGlobalCreate = () => toggleCreate();
        window.addEventListener('open-company-modal', handleGlobalCreate);
        return () => window.removeEventListener('open-company-modal', handleGlobalCreate);
    }, []);

    const toggleCreate = () => {
        setIsFormOpen(true);
        setTimeout(() => nameRef.current?.focus(), 50);
    };

    const handleBack = () => {
        if (isFormOpen) setIsFormOpen(false);
        else window.history.back();
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
                setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', gstin: '', pan: '', financial_year_from: '', books_beginning_from: '' });
                setIsFormOpen(false);
            },
        });
    };

    useShortcuts({
        'alt+c': toggleCreate,
        'Escape': handleBack,
        'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < companies.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, isFormOpen);

    return (
        <AppLayout title="Companies">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
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

                    {/* Modal with Fixed Width to avoid cutting off */}
                    <CommonFormModal
                        isOpen={isFormOpen} 
                        title="Company Creation"
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        submitRef={submitRef}
                        width="max-w-4xl" // Wider to fit two columns comfortably
                    >
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">
                            {/* Left Side: Contact Details */}
                            <div className="space-y-2">
                                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-1 mb-2">Company Information</h3>
                                <div className="flex items-center">
                                    <label className="w-28 font-bold text-gray-700">Name:</label>
                                    <input ref={nameRef} type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value.toUpperCase()})} onKeyDown={(e) => handleKeyDown(e, emailRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 font-bold text-gray-700">Email:</label>
                                    <input ref={emailRef} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} onKeyDown={(e) => handleKeyDown(e, phoneRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 font-bold text-gray-700">Phone:</label>
                                    <input ref={phoneRef} type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} onKeyDown={(e) => handleKeyDown(e, addressRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>
                                <div className="flex items-start">
                                    <label className="w-28 font-bold pt-1 text-gray-700">Address:</label>
                                    <textarea ref={addressRef} rows="2" value={form.address} onChange={e => setForm({...form, address: e.target.value})} onKeyDown={(e) => handleKeyDown(e, cityRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none resize-none" />
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 font-bold text-gray-700">City/State:</label>
                                    <div className="flex-1 flex gap-1">
                                        <input ref={cityRef} placeholder="City" type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} onKeyDown={(e) => handleKeyDown(e, stateRef)} className="w-1/2 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                        <input ref={stateRef} placeholder="State" type="text" value={form.state} onChange={e => setForm({...form, state: e.target.value})} onKeyDown={(e) => handleKeyDown(e, pincodeRef)} className="w-1/2 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 font-bold text-gray-700">Pincode:</label>
                                    <input ref={pincodeRef} type="text" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} onKeyDown={(e) => handleKeyDown(e, gstinRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                </div>
                            </div>

                            {/* Right Side: Statutory & FY */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-1 mb-2">Statutory Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <label className="w-32 font-bold text-gray-700">GSTIN:</label>
                                            <input ref={gstinRef} type="text" value={form.gstin} onChange={e => setForm({...form, gstin: e.target.value.toUpperCase()})} onKeyDown={(e) => handleKeyDown(e, panRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="w-32 font-bold text-gray-700">PAN No.:</label>
                                            <input ref={panRef} type="text" value={form.pan} onChange={e => setForm({...form, pan: e.target.value.toUpperCase()})} onKeyDown={(e) => handleKeyDown(e, fyRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-1 mb-2">Financial Year</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <label className="w-32 font-bold text-gray-700 leading-tight">FY Beginning From:</label>
                                            <input ref={fyRef} type="date" value={form.financial_year_from} onChange={e => setForm({...form, financial_year_from: e.target.value})} onKeyDown={(e) => handleKeyDown(e, booksRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none uppercase" />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="w-32 font-bold text-gray-700 leading-tight">Books Beginning From:</label>
                                            <input ref={booksRef} type="date" value={form.books_beginning_from} onChange={e => setForm({...form, books_beginning_from: e.target.value})} onKeyDown={(e) => handleKeyDown(e, submitRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none uppercase" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CommonFormModal>
                </div>
            </div>
        </AppLayout>
    );
}