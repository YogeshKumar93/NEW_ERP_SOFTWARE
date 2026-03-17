import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
  FaHome, FaUsers, FaFileInvoiceDollar, FaBook, 
  FaShoppingCart, FaChevronDown, FaChevronRight, 
  FaLayerGroup, FaBoxes, FaClipboardList, FaChartLine 
} from "react-icons/fa";

export default function Sidebar() {
  // 1. Updated state to handle multiple dropdowns independently
  const [openMenus, setOpenMenus] = useState({
    masters: false,
    vouchers: false,
    reports: false,
    employees: false,
  });

  // Sidebar logic snippet
useEffect(() => {
    const handleGlobalKeys = (e) => {
        const key = e.key.toUpperCase();
        // Skip if typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Tally style direct key navigation
        menuItems.forEach(item => {
            if (item.key === key) {
                if (item.isDropdown) item.toggle();
                else if (item.href) router.visit(item.href);
            }
            // Sub-items navigation logic can be added here
        });
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
}, [openMenus]);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

const menuItems = [
    { name: 'Gateway', route: 'gateway', key: 'G', icon: <FaHome /> },
    { name: 'Dashboard', route: 'user.dashboard', key: 'D', icon: <FaChartLine /> },
    { name: 'Companies', href: '/companies', key: 'C', icon: <FaLayerGroup /> },
    { name: 'GST Details', href: '/gst-details', key: 'T', icon: <FaFileInvoiceDollar /> },
    
    // 2. Masters Dropdown
    { 
      name: 'Masters', 
      key: 'M', 
      icon: <FaLayerGroup />, 
      isDropdown: true,
      isOpen: openMenus.masters,
      toggle: () => toggleMenu('masters'),
      subItems: [
        { name: 'Groups', href: '/groups', key: 'G', icon: <FaLayerGroup /> },      
        { name: 'Units', href: '/units', key: 'U', icon: <FaBoxes /> },
        { name: 'Stock Categories', href: '/stock-categories', key: 'C', icon: <FaClipboardList /> },
        { name: 'Stock Items', href: '/stock-items', key: 'I', icon: <FaBoxes /> },
        { name: 'Ledgers', href: '/ledgers', key: 'L', icon: <FaBook /> },
      ]
    },

    // 3. Vouchers Dropdown
    { 
      name: 'Vouchers', 
      key: 'V', 
      icon: <FaFileInvoiceDollar />, 
      isDropdown: true,
      isOpen: openMenus.vouchers,
      toggle: () => toggleMenu('vouchers'),
      subItems: [
        { name: 'Journal Voucher', href: '/journal-voucher', key: 'P', icon: <FaBook /> },
        { name: 'Sales Voucher', href: '/sales', key: 'A', icon: <FaShoppingCart /> },
        { name: 'Payment Voucher', href: '/payments', key: 'Y', icon: <FaFileInvoiceDollar /> },
        { name: 'Receipt Voucher', href: '/receipts', key: 'R', icon: <FaClipboardList /> },
      ]
    },

    // 4. Reports Dropdown
    { 
      name: 'Reports', 
      key: 'R', 
      icon: <FaClipboardList />, 
      isDropdown: true,
      isOpen: openMenus.reports,
      toggle: () => toggleMenu('reports'),
      subItems: [
        { name: 'Trial Balance', href: '/reports/trial-balance', key: 'T', icon: <FaChartLine />, isComingSoon: true },
        { name: 'Ledger Report', href: '/ledger-reports', key: 'E', icon: <FaBook /> },
        { name: 'P&L', href: '/reports/pl', key: 'N', icon: <FaFileInvoiceDollar />, isComingSoon: true },
        { name: 'Balance Sheet', href: '/reports/balance-sheet', key: 'B', icon: <FaLayerGroup />, isComingSoon: true },
        { name: 'Stock Summary', href: '/reports/stock-summary', key: 'K', icon: <FaBoxes />, isComingSoon: true },
      ]
    },

    // 5. Employees Dropdown
    { 
      name: 'Employees', 
      key: 'E', 
      icon: <FaUsers />, 
      isDropdown: true,
      isOpen: openMenus.employees,
      toggle: () => toggleMenu('employees'),
      subItems: [
        { name: 'Employee List', href: '/employees', key: 'L', icon: <FaUsers /> },
        { name: 'Attendance', href: '/attendance', key: 'A', icon: <FaClipboardList /> },
        { name: 'Advance', href: '/advance', key: 'D', icon: <FaFileInvoiceDollar /> },
        { name: 'Payslip', href: '/payslips', key: 'P', icon: <FaBook />, isComingSoon: true },
        { name: 'Salary', href: '/salary', key: 'S', icon: <FaChartLine />, isComingSoon: true },
      ]
    },
  ];

  return (
    <aside className="w-64 bg-[#f8fafc] text-slate-800 border-r border-slate-400 flex flex-col h-screen">
      <div className="p-3 bg-[#0f172a] text-indigo-400 text-center font-black tracking-tighter border-b border-slate-700">
        BIGGBRAINS <span className="text-white font-light">ERP</span>
      </div>

      <nav className="flex-1 overflow-y-auto pt-2">
        {menuItems.map((item) => {
          if (item.isDropdown) {
            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={item.toggle}
                  className="group flex items-center justify-between px-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-slate-200 transition-colors w-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-600 group-hover:text-yellow-300">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 group-hover:text-yellow-300">
                    <span className="font-bold underline">{item.key}</span>
                    {item.isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                  </div>
                </button>

                {item.isOpen && (
                  <div className="bg-slate-50">
                    {item.subItems.map((sub) => (
                   <Link
  key={sub.name}
  href={sub.href}
  onClick={(e) => {
    if (sub.isComingSoon) {
      e.preventDefault();
      alert(`🚧 ${sub.name} coming soon!`);
    }
  }}
  className="group flex items-center justify-between pl-10 pr-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-slate-200 transition-colors"
>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 group-hover:text-yellow-300">{sub.icon}</span>
                        <span className={`font-medium ${sub.isComingSoon ? 'opacity-50' : ''}`}>
  {sub.name}
</span>
                        </div>
                        <span className="text-indigo-600 font-bold group-hover:text-yellow-300 underline">
                          {sub.key}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.route ? route(item.route) : item.href}
              className="group flex items-center justify-between px-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-indigo-600 group-hover:text-yellow-300">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-indigo-600 font-bold group-hover:text-yellow-300 underline">
                {item.key}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="bg-[#0f172a] p-2 text-[10px] text-slate-500 flex justify-between italic">
        <span>v1.0.26</span>
        <span>System Active</span>
      </div>
    </aside>
  );
}