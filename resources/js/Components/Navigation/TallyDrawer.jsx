import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function TallyDrawer({ isOpen, type, onClose }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Aapke web.php ke mutabiq routes
    const drawerConfig = {
        period: [
            { label: "Current Day", action: () => alert("Today Filter Applied") },
            { label: "Financial Year", action: () => alert("FY Filter Applied") },
            { label: "Custom Range", action: 'open_date_modal' },
        ],
        company: [
            { label: "Select Company", path: '/companies' }, // Route: companies.index
            { label: "Create Company", action: 'trigger_create_modal' }, // Wahi page pe modal kholne ke liye
            { label: "Company Settings", path: '/profile' },
            { label: "Shut Company", path: '/' },
        ]
    };

    const options = drawerConfig[type] || [];

    const handleSelection = (item) => {
        onClose(); // Drawer band karein

        if (item.path) {
            // Direct Page Navigation
            router.visit(item.path);
        } else if (item.action === 'trigger_create_modal') {
            // Agar aapko usi page par Modal khulwana hai
            // Iske liye hum ek custom event fire kar sakte hain ya global state use kar sakte hain
            window.dispatchEvent(new CustomEvent('open-company-modal'));
        } else if (typeof item.action === 'function') {
            item.action();
        }
    };

    // Keyboard navigation (Arrow keys + Enter)
    useEffect(() => {
        if (!isOpen) return;
        const handleKeys = (e) => {
            if (e.key === "ArrowDown") setActiveIndex(p => (p < options.length - 1 ? p + 1 : p));
            if (e.key === "ArrowUp") setActiveIndex(p => (p > 0 ? p - 1 : p));
            if (e.key === "Enter") handleSelection(options[activeIndex]);
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [activeIndex, isOpen, options]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex justify-end">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative w-72 bg-[#e1f5fe] border-l-2 border-[#01579b] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                <div className="bg-[#01579b] text-white p-2 font-bold text-xs text-center uppercase tracking-widest">
                    List of {type}
                </div>
                <div className="flex-1 overflow-y-auto py-1">
                    {options.map((item, index) => (
                        <button 
                            key={index}
                            className={`w-full p-3 text-left text-[11px] font-bold border-b border-blue-100 uppercase outline-none
                                ${index === activeIndex ? 'bg-yellow-300 text-blue-900 shadow-sm' : 'text-[#01579b] hover:bg-blue-50'}`}
                            onClick={() => handleSelection(item)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <div className="bg-[#b3e5fc] p-2 text-[9px] text-center text-blue-800 font-bold border-t border-[#01579b]">
                    ↑ ↓ : Navigate | Enter : Select
                </div>
            </div>
        </div>
    );
}