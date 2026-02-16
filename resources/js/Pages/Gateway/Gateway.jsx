import React, { useState, useEffect } from 'react';
// import AppLayout from "@/Layouts/AppLayout";
import { 
  PlusCircle, Edit3, Network, Receipt, BookText, 
  Landmark, PieChart, BarChart3, Box, LayoutDashboard, 
  ChevronRight, X, Settings2, Search, FileText, Users, Settings,
  Monitor, Calendar
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

const MENU_CONFIG = [
  {
    category: "Masters",
    color: "border-l-blue-600",
    textColor: "text-blue-700",
    items: [
      { name: "Create", icon: <PlusCircle size={14} />, subs: [{label: "Ledger", path: "/ledgers"}, {label: "Stock Item", path: "/stock-items"}, {label: "Voucher Type", path: "/voucher-types"}] },
      { name: "Alter", icon: <Edit3 size={14} />, subs: [{label: "Master Alteration", path: "/alter"}, {label: "GST Setup", path: "/gst-setup"}] },
      { name: "Chart of Accounts", icon: <Network size={14} />, subs: [{label: "Ledger View", path: "/chart/ledgers"}, {label: "Stock View", path: "/chart/stock"}] },
    ]
  },
  {
    category: "Transactions",
    color: "border-l-emerald-600",
    textColor: "text-emerald-700",
    items: [
      { name: "Vouchers", icon: <Receipt size={14} />, subs: [{label: "Sales (F8)", path: "/vouchers/sales"}, {label: "Purchase (F9)", path: "/vouchers/purchase"}, {label: "Payment (F5)", path: "/vouchers/payment"}] },
      { name: "Day Book", icon: <BookText size={14} />, subs: [{label: "Detailed View", path: "/daybook/detailed"}] },
    ]
  },
  {
    category: "Utilities",
    color: "border-l-orange-600",
    textColor: "text-orange-700",
    items: [
      { name: "Banking", icon: <Landmark size={14} />, subs: [{label: "Cheque Printing", path: "/banking/cheque"}, {label: "Reconciliation", path: "/banking/reco"}] },
      { name: "Payroll", icon: <Users size={14} />, subs: [{label: "Employee Setup", path: "/payroll/employees"}] },
    ]
  },
  {
    category: "Reports",
    color: "border-l-purple-600",
    textColor: "text-purple-700",
    items: [
      { name: "Balance Sheet", icon: <PieChart size={14} />, subs: [{label: "Horizontal View", path: "/reports/bs-h"}] },
      { name: "P & L A/c", icon: <BarChart3 size={14} />, subs: [{label: "Trading Account", path: "/reports/pl-trading"}] },
      { name: "Stock Summary", icon: <Box size={14} />, subs: [{label: "Item-wise", path: "/reports/stock-item"}] },
    ]
  }
];

export default function Gateway() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard Control
  useEffect(() => {
    if (!selectedModule) return;
    const handleKeys = (e) => {
      const options = selectedModule.subs;
      if (e.key === "ArrowDown") setActiveIndex(p => (p < options.length - 1 ? p + 1 : 0));
      if (e.key === "ArrowUp") setActiveIndex(p => (p > 0 ? p - 1 : options.length - 1));
      if (e.key === "Escape") setSelectedModule(null);
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [activeIndex, selectedModule]);

  return (
    <AppLayout title="Gateway">
      <div className="bg-[#eef2f6] min-h-[calc(100vh-64px)] font-mono antialiased text-slate-900 select-none">
        
      

        {/* --- Sub-Header (Company Info) --- */}
        <div className="bg-white border-b border-slate-300 px-6 py-2 flex justify-between items-center shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Current Company</span>
            <span className="text-sm font-black text-[#0284c7] uppercase">ABC SOLUTIONS PVT LTD</span>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Current Period</span>
                <span className="text-[11px] font-bold text-slate-700">1-Apr-2025 to 31-Mar-2026</span>
            </div>
          </div>
        </div>

        {/* --- Gateway Main Body --- */}
        <div className="max-w-[1200px] mx-auto p-6">
          <div className="bg-white border border-slate-300 rounded-sm shadow-xl min-h-[500px] flex flex-col">
            
            {/* Internal Header */}
            <div className="border-b border-slate-200 p-3 bg-slate-50 flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">Main Menu</span>
                <div className="relative">
                    <Search className="absolute left-2 top-1.5 text-slate-400" size={12} />
                    <input type="text" placeholder="Search menu..." className="pl-8 pr-2 py-1 bg-white border border-slate-300 text-[10px] uppercase font-bold w-48 focus:outline-none focus:border-blue-500" />
                </div>
            </div>

            {/* Grid for Menu Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 flex-1">
              {MENU_CONFIG.map((section, idx) => (
                <div key={idx} className="p-4 flex flex-col gap-4 bg-white hover:bg-slate-50/50 transition-colors">
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 border-slate-100 ${section.textColor}`}>
                    {section.category}
                  </h3>
                  
                  <div className="space-y-1">
                    {section.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedModule(item); setActiveIndex(0); }}
                        className={`w-full flex items-center gap-3 p-2 text-left transition-all border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-sm group border-l-4 ${section.color}`}
                      >
                        <div className="text-slate-400 group-hover:text-blue-600">{item.icon}</div>
                        <span className="text-[11px] font-bold text-slate-700 uppercase group-hover:text-blue-700">
                           <span className="underline decoration-2 group-hover:text-blue-900">{item.name[0]}</span>{item.name.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

         
          </div>
        </div>

        {/* --- TALLY DRAWER --- */}
        {selectedModule && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" onClick={() => setSelectedModule(null)} />
            <div className="relative w-80 bg-[#f1f5f9] border-l-[4px] border-[#0284c7] shadow-2xl flex flex-col h-screen">
                <div className="bg-[#0284c7] text-white p-2.5 font-black text-[12px] text-center shadow-md uppercase tracking-widest italic">
                    List of {selectedModule.name}
                </div>
                
                <div className="flex-1 overflow-y-auto bg-[#e2e8f0]">
                    {selectedModule.subs.map((item, index) => (
                        <div 
                            key={index}
                            className={`cursor-pointer px-6 py-2.5 flex justify-between items-center border-b border-slate-300
                                ${index === activeIndex ? 'bg-[#ffeb3b] text-blue-950 font-black shadow-md' : 'text-blue-900 font-bold hover:bg-blue-100/50'}`}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className="text-[13px] tracking-wide uppercase">
                                <span className="underline decoration-2">{item.label[0]}</span>{item.label.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="bg-[#0284c7] text-white text-[11px] p-2 flex justify-between px-6 font-black uppercase tracking-widest">
                    <span>ESC: Back</span>
                    <span>ENT: Open</span>
                </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}