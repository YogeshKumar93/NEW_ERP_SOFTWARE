import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FaHome, FaUsers, FaFileInvoiceDollar, FaBook, FaShoppingCart, FaChevronDown, FaChevronRight, FaLayerGroup } from "react-icons/fa";

export default function Sidebar() {
  // 1. State to control the dropdown
  const [majorsOpen, setMajorsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', route: 'user.dashboard', key: 'D', icon: <FaHome /> },
    { name: 'Companies', href: '/companies', key: 'C', icon: <FaHome /> },
    // 2. Grouped "Majors" item
    { 
      name: 'Majors', 
      key: 'M', 
      icon: <FaLayerGroup />, 
      isDropdown: true,
      subItems: [
        { name: 'Groups', href: '/groups', key: 'G', icon: <FaHome /> },
        { name: 'Ledgers', href: '/ledgers', key: 'L', icon: <FaBook /> },
      ]
    },
    { name: 'Employees', href: '/employees', key: 'E', icon: <FaUsers /> },
    { name: 'Vouchers', href: '/vouchers', key: 'V', icon: <FaFileInvoiceDollar /> },
    { name: 'Journal Voucher', href: '/vouchers/journal/create', key: 'J', icon: <FaBook /> },
    { name: 'Purchase', href: '/purchase', key: 'P', icon: <FaShoppingCart /> },
  ];

  return (
    <aside className="w-64 bg-[#f8fafc] text-slate-800 border-r border-slate-400 flex flex-col h-screen">
      <div className="p-3 bg-[#0f172a] text-indigo-400 text-center font-black tracking-tighter border-b border-slate-700">
        BIGGBRAINS <span className="text-white font-light">ERP</span>
      </div>

      <nav className="flex-1 overflow-y-auto pt-2">
        {menuItems.map((item) => {
          // 3. Logic for the Dropdown Item
          if (item.isDropdown) {
            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={() => setMajorsOpen(!majorsOpen)}
                  className="group flex items-center justify-between px-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-slate-200 transition-colors w-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-600 group-hover:text-yellow-300">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 group-hover:text-yellow-300">
                    <span className="font-bold underline">{item.key}</span>
                    {majorsOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                  </div>
                </button>

                {/* Dropdown Content */}
                {majorsOpen && (
                  <div className="bg-slate-50">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="group flex items-center justify-between pl-10 pr-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 group-hover:text-yellow-300">{sub.icon}</span>
                          <span className="font-medium">{sub.name}</span>
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

          // 4. Original Logic for normal items
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