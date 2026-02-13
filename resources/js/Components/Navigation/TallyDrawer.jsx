import { useEffect, useState } from "react";
 import { Inertia } from "@inertiajs/inertia";

export default function TallyDrawer({ isOpen, type, onClose }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Reset index whenever drawer type changes
    useEffect(() => { setActiveIndex(0); }, [type]);

    const drawerConfig = {
        masters: [
            { label: "Groups", path: '/groups', key: 'G' },
            { label: "Ledgers", path: '/ledgers', key: 'L' },
            { label: "Units", path: '/units', key: 'U' },
            { label: "Stock Items", path: '/stock-items', key: 'S' },
        ],

          companies: [
            { label: "Accounts Info", path: '/groups', key: 'A' },
            { label: "Inventory Info", path: '/stock-items', key: 'I' },
            { label: "Payroll Info", path: '/employees', key: 'P' },
        ],

         period: [
            { label: "Accounts Info", path: '/groups', key: 'A' },
            { label: "Inventory Info", path: '/stock-items', key: 'I' },
            { label: "Payroll Info", path: '/employees', key: 'P' },
        ],

          vouchers: [
            { label: "Accounts Info", path: '/groups', key: 'A' },
            { label: "Inventory Info", path: '/stock-items', key: 'I' },
            { label: "Payroll Info", path: '/employees', key: 'P' },
        ],
    };

    const options = drawerConfig[type] || [];
   

const handleSelection = (item) => {
    if (!item) return;
    Inertia.visit(item.path);
    onClose();
};

    // Keyboard Logic
   useEffect(() => {
    if (!isOpen) return;

    const handleKeys = (e) => {
        if (e.key === "ArrowDown")
            setActiveIndex(p => (p < options.length - 1 ? p + 1 : 0));

        if (e.key === "ArrowUp")
            setActiveIndex(p => (p > 0 ? p - 1 : options.length - 1));

        if (e.key === "Enter")
            handleSelection(options[activeIndex]);

        if (e.key === "Escape")
            onClose();
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);

}, [activeIndex, isOpen]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
            <div className="relative w-80 bg-[#f1f5f9] border-l-[3px] border-[#0284c7] shadow-2xl flex flex-col h-screen shadow-black/50">
                <div className="bg-[#0284c7] text-white p-2 font-bold text-sm text-center shadow-md">
                    List of {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                
                <div className="flex-1 overflow-y-auto bg-[#e2e8f0]">
                    {options.map((item, index) => (
                        <div 
                            key={index}
                            className={`cursor-pointer px-4 py-2 flex justify-between items-center border-b border-slate-300
                                ${index === activeIndex ? 'bg-[#ffeb3b] text-blue-900 font-black' : 'text-blue-900 font-medium'}`}
                            onClick={() => handleSelection(item)}
                        >
                            <span className="text-[13px] tracking-wide">
                                {/* Tally Style: First letter highlighting */}
                                <span className="underline decoration-2">{item.label[0]}</span>
                                {item.label.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="bg-[#0284c7] text-white text-[10px] p-1 flex justify-between px-4">
                    <span>ESC: Close</span>
                    <span>ENT: Select</span>
                </div>
            </div>
        </div>
    );
}