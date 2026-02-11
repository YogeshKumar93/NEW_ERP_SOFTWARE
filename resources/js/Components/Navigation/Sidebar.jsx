import { Link } from '@inertiajs/react';
import { FaHome, FaUsers, FaFileInvoiceDollar, FaBook, FaShoppingCart } from "react-icons/fa";

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', route: 'user.dashboard', key: 'D', icon: <FaHome /> },
    { name: 'Companies', href: '/companies', key: 'C', icon: <FaHome /> },
    { name: 'Employees', href: '/employees', key: 'E', icon: <FaUsers /> },
    { name: 'Vouchers', href: '/vouchers', key: 'V', icon: <FaFileInvoiceDollar /> },
    { name: 'Journal Voucher', href: '/vouchers/journal/create', key: 'J', icon: <FaBook /> },
    { name: 'Purchase', href: '/purchase', key: 'P', icon: <FaShoppingCart /> },
    // Other items...
  ];

  return (
    <aside className="w-64 bg-[#f8fafc] text-slate-800 border-r border-slate-400 flex flex-col">
      <div className="p-3 bg-[#0f172a] text-indigo-400 text-center font-black tracking-tighter border-b border-slate-700">
        BIGGBRAINS <span className="text-white font-light">ERP</span>
      </div>

      <nav className="flex-1 overflow-y-auto pt-2">
        {menuItems.map((item) => (
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
        ))}
      </nav>

      <div className="bg-[#0f172a] p-2 text-[10px] text-slate-500 flex justify-between italic">
        <span>v1.0.26</span>
        <span>System Active</span>
      </div>
    </aside>
  );
}
