import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, Edit3, Network, Receipt, BookText, 
  Landmark, PieChart, BarChart3, Box, Search, 
  ChevronRight, ArrowRight
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

const MENU_CONFIG = [
  {
    category: "Masters",
    items: [
      { name: "Create", key: "C", subs: [{label: "Ledger", path: "/ledgers"}, {label: "Stock Item", path: "/stock-items"}, {label: "Groups", path: "/groups"}] },
      { name: "Alter", key: "A", subs: [{label: "Master Alteration", path: "/alter"}, {label: "GST Setup", path: "/gst-setup"}] },
      { name: "Chart of Accounts", key: "H", subs: [{label: "Ledger View", path: "/chart/ledgers"}] },
    ]
  },
  {
    category: "Transactions",
    items: [
      { name: "Vouchers", key: "V", subs: [{label: "Sales", path: "/vouchers/sales"}, {label: "Purchase", path: "/vouchers/purchase"}, {label: "Journal", path: "/vouchers/journal"}] },
      { name: "Day Book", key: "K", subs: [{label: "Detailed View", path: "/daybook/detailed"}] },
    ]
  },
  {
    category: "Utilities",
    items: [
      { name: "Banking", key: "N", subs: [{label: "Cheque Printing", path: "/banking/cheque"}, {label: "Reconciliation", path: "/banking/reco"}] },
    ]
  },
  {
    category: "Reports",
    items: [
      { name: "Balance Sheet", key: "B", subs: [{label: "Horizontal View", path: "/reports/bs"}] },
      { name: "Profit & Loss A/c", key: "P", subs: [{label: "Trading Account", path: "/reports/pl"}] },
      { name: "Stock Summary", key: "S", subs: [{label: "Item-wise", path: "/reports/stock"}] },
      { name: "Ratio Analysis", key: "R", subs: [{label: "Financial Ratios", path: "/reports/ratios"}] },
      { name: "Display More Reports", key: "D", subs: [{label: "Trial Balance", path: "/reports/trial"}, {label: "Statutory", path: "/reports/gst"}] },
    ]
  }
];

export default function Gateway() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard Shortcuts for Main Menu
  useEffect(() => {
    const handleMainMenuKeys = (e) => {
      if (selectedModule) return;
      const key = e.key.toUpperCase();
      MENU_CONFIG.forEach(cat => {
        const item = cat.items.find(i => i.key === key);
        if (item) {
          setSelectedModule(item);
          setActiveIndex(0);
        }
      });
    };
    window.addEventListener("keydown", handleMainMenuKeys);
    return () => window.removeEventListener("keydown", handleMainMenuKeys);
  }, [selectedModule]);

  // Keyboard Control for Sub-menu
  useEffect(() => {
    if (!selectedModule) return;
    const handleKeys = (e) => {
      const options = selectedModule.subs;
      if (e.key === "ArrowDown") setActiveIndex(p => (p < options.length - 1 ? p + 1 : 0));
      if (e.key === "ArrowUp") setActiveIndex(p => (p > 0 ? p - 1 : options.length - 1));
      if (e.key === "Escape") setSelectedModule(null);
      if (e.key === "Enter") alert("Opening: " + options[activeIndex].label);
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [activeIndex, selectedModule]);

  return (
    <AppLayout title="Gateway of Tally">
      <div className="bg-[#e2e8f0] min-h-[calc(100vh-64px)] font-mono antialiased text-slate-900 select-none flex flex-col">
        
        {/* --- Top Navigation Bar (Tally Style) --- */}
        <div className="bg-[#005a8d] text-white px-4 py-1.5 flex justify-between items-center text-[12px] font-bold border-b border-[#004a75]">
          <div className="flex gap-4">
            <span className="hover:bg-[#0078b9] px-2 cursor-pointer">K: Company</span>
            <span className="hover:bg-[#0078b9] px-2 cursor-pointer">Y: Data</span>
            <span className="hover:bg-[#0078b9] px-2 cursor-pointer">Z: Exchange</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-200 uppercase">ABC SOLUTIONS PVT LTD</span>
            <span>1-Apr-25 to 31-Mar-26</span>
          </div>
        </div>

        {/* --- Main Workspace --- */}
        <div className="flex-1 flex items-start justify-center pt-10 px-6">
          <div className="w-full max-w-5xl grid grid-cols-12 bg-white border border-slate-400 shadow-2xl overflow-hidden rounded-sm">
            
            {/* Left Section: Company Info (Tally Style) */}
            <div className="col-span-5 border-r border-slate-300 bg-[#f1f5f9] p-6">
              <div className="mb-8">
                <h3 className="text-[10px] text-slate-500 font-black uppercase mb-2 tracking-tighter">Current Period</h3>
                <p className="text-sm font-bold">1-Apr-2025 to 31-Mar-2026</p>
              </div>
              <div className="mb-8">
                <h3 className="text-[10px] text-slate-500 font-black uppercase mb-2 tracking-tighter">Current Date</h3>
                <p className="text-sm font-bold tracking-tight">Monday, 16-Feb-2026</p>
              </div>
              
              <div className="mt-10">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="pb-2 text-slate-400">List of Selected Companies</th>
                      <th className="pb-2 text-right text-slate-400">Date of Last Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pt-3 font-black text-blue-800 italic">ABC SOLUTIONS PVT LTD</td>
                      <td className="pt-3 text-right font-bold">15-Feb-2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Section: Gateway Menu */}
            <div className="col-span-7 flex flex-col bg-white">
              <div className="bg-[#0081c5] text-white py-1 px-4 text-[12px] font-black italic tracking-widest flex justify-between">
                <span>Gateway of Tally</span>
                <span className="opacity-50 font-normal">TallyPrime 4.0</span>
              </div>

              <div className="p-2 flex-1 flex flex-col">
                {MENU_CONFIG.map((group, gIdx) => (
                  <div key={gIdx} className="mb-4">
                    <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {group.category}
                    </h4>
                    <div className="space-y-0.5">
                      {group.items.map((item, iIdx) => (
                        <button
                          key={iIdx}
                          onClick={() => { setSelectedModule(item); setActiveIndex(0); }}
                          className="w-full flex justify-between items-center px-6 py-1 hover:bg-[#ffeb3b] group"
                        >
                          <span className="text-[13px] font-bold text-[#003d5b] group-hover:text-black uppercase">
                            <span className="text-rose-600 group-hover:underline">{item.name[0]}</span>{item.name.slice(1)}
                          </span>
                          <span className="text-[10px] text-slate-300 font-mono group-hover:text-slate-600">[{item.key}]</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Quit Option */}
                <div className="mt-auto border-t border-slate-100 pt-2">
                  <button className="w-full flex px-6 py-1 hover:bg-rose-100 text-[13px] font-bold text-slate-700 uppercase">
                    <span className="text-rose-600 underline">Q</span>uit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Classical Sub-Menu Popover (Drawer Style) --- */}
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <div className="w-[320px] bg-[#e2e8f0] border-2 border-[#005a8d] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="bg-[#005a8d] text-white px-4 py-1.5 text-[11px] font-black italic flex justify-between items-center">
                    <span>List of {selectedModule.name}</span>
                    <span className="text-[9px] font-normal opacity-70">ESC: Back</span>
                </div>
                
                <div className="py-1">
                    {selectedModule.subs.map((sub, sIdx) => (
                        <div 
                            key={sIdx}
                            onMouseEnter={() => setActiveIndex(sIdx)}
                            className={`px-6 py-1.5 text-[13px] font-bold uppercase cursor-pointer flex justify-between
                                ${sIdx === activeIndex ? 'bg-[#ffeb3b] text-blue-900 shadow-sm' : 'text-blue-800'}`}
                        >
                            <span><span className="underline">{sub.label[0]}</span>{sub.label.slice(1)}</span>
                            {sIdx === activeIndex && <ArrowRight size={14} />}
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* --- Bottom Help Bar --- */}
        <div className="bg-[#004a75] text-white/80 text-[10px] px-4 py-1 flex gap-6 font-bold">
          <span>F1: Help</span>
          <span>F2: Date</span>
          <span>F3: Company</span>
          <span className="ml-auto">v4.0.1</span>
        </div>
      </div>
    </AppLayout>
  );
}