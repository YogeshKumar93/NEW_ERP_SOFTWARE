import React from 'react';
import AppLayout from "@/Layouts/AppLayout";
import { router } from '@inertiajs/react'; // Modern way to handle logout
import { 
  ArrowUpRight, ArrowDownLeft, TrendingUp, 
  BarChart3, PieChart, Wallet, CreditCard 
} from 'lucide-react'; // Basic icons for professional look

// Improved Card Component
const DashboardCard = ({ title, children, date = "For 1-Apr-2025", icon: Icon }) => (
  <div className="bg-white border border-slate-200 shadow-sm rounded-sm flex flex-col h-full hover:shadow-md transition-shadow">
    <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-2">
          {Icon && <Icon size={14} className="text-slate-400" />}
          {title}
        </h2>
        <p className="text-[10px] text-slate-400 mt-0.5">{date}</p>
      </div>
    </div>
    <div className="p-4 flex-grow">
      {children}
    </div>
  </div>
);

// Professional Row Component
const DataRow = ({ label, value, isBold = false, status = "" }) => {
  const getStatusColor = () => {
    if (status === "positive") return "text-emerald-600";
    if (status === "negative") return "text-red-600";
    return "text-slate-700";
  };

  return (
    <div className={`flex justify-between py-1.5 border-b border-slate-50 last:border-0 items-center ${isBold ? 'font-bold' : 'font-medium'}`}>
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`text-[12px] tabular-nums ${getStatusColor()}`}>{value}</span>
    </div>
  );
};

export default function Dashboard() {
  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <AppLayout title="Dashboard">
      <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900">
        
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-800">Gateway of ERP</h1>
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">FY 2025-26</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            Sign Out
          </button>
        </div>

        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 gap-5">
            
            {/* --- TOP ROW: KPI SUMMARY --- */}
            <div className="col-span-12 md:col-span-3">
              <div className="bg-emerald-600 p-4 rounded-sm text-white shadow-sm">
                <p className="text-[10px] uppercase opacity-80 font-bold">Total Revenue</p>
                <h3 className="text-xl font-bold">₹ 45,00,000.00</h3>
                <div className="flex items-center text-[10px] mt-2 bg-emerald-700 w-fit px-1.5 py-0.5 rounded">
                   <ArrowUpRight size={10}/> +12.5% vs Last Month
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="bg-slate-800 p-4 rounded-sm text-white shadow-sm">
                <p className="text-[10px] uppercase opacity-80 font-bold">Net Profit</p>
                <h3 className="text-xl font-bold text-emerald-400">₹ 8,10,200.00</h3>
                <p className="text-[10px] mt-2 opacity-60">Margin: 18.2%</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                <p className="text-[10px] uppercase text-slate-500 font-bold">Outstanding Payables</p>
                <h3 className="text-xl font-bold text-red-600">₹ 4,30,000.00</h3>
                <p className="text-[10px] mt-2 text-slate-400">Due in 7 Days: ₹ 85k</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                <p className="text-[10px] uppercase text-slate-500 font-bold">Cash in Hand</p>
                <h3 className="text-xl font-bold text-blue-600">₹ 4,20,000.00</h3>
                <p className="text-[10px] mt-2 text-slate-400">Primary Account Balance</p>
              </div>
            </div>

            {/* --- SECOND ROW: TRENDS --- */}
            <div className="col-span-12 lg:col-span-8">
              <DashboardCard title="Sales & Purchase Analysis" icon={TrendingUp}>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-2 h-2 bg-blue-600"></div> SALES</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-2 h-2 bg-slate-300"></div> PURCHASES</div>
                </div>
                <div className="h-48 flex items-end gap-2 border-b border-slate-200 pb-2">
                  {[40, 70, 45, 90, 65, 30, 85, 50, 75, 40, 60, 55].map((h, i) => (
                    <div key={i} className="flex-grow flex flex-col justify-end gap-[1px]">
                      <div className="bg-blue-600 w-full rounded-t-[1px]" style={{ height: `${h}%` }}></div>
                      <div className="bg-slate-200 w-full rounded-b-[1px]" style={{ height: `${h/1.5}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] mt-2 font-bold text-slate-400 px-1">
                  <span>APR</span><span>JUL</span><span>OCT</span><span>JAN</span><span>MAR</span>
                </div>
              </DashboardCard>
            </div>

            <div className="col-span-12 lg:col-span-4">
               <DashboardCard title="Quick Ratios" icon={BarChart3}>
                  <DataRow label="Inventory Turnover" value="4.25 : 1" isBold />
                  <DataRow label="Debt/Equity" value="0.35 : 1" />
                  <DataRow label="Current Ratio" value="2.0 : 1" status="positive" />
                  <DataRow label="ROI %" value="18.5%" status="positive" isBold />
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 leading-relaxed">
                    <strong>Note:</strong> Your Current Ratio is healthy, indicating strong short-term liquidity.
                  </div>
               </DashboardCard>
            </div>

            {/* --- THIRD ROW: TABLES --- */}
            <div className="col-span-12 lg:col-span-4">
              <DashboardCard title="Trading Details" icon={PieChart}>
                <DataRow label="Gross Profit" value="12,45,000.00" status="positive" isBold />
                <DataRow label="Sales Accounts" value="45,00,000.00" />
                <DataRow label="Purchase Accounts" value="32,55,000.00" />
                <DataRow label="Direct Expenses" value="2,10,000.00" />
              </DashboardCard>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <DashboardCard title="Balance Sheet Snippet" icon={Wallet}>
                <DataRow label="Current Assets" value="25,00,000.00" />
                <DataRow label="Fixed Assets" value="18,00,000.00" />
                <DataRow label="Current Liabilities" value="12,50,000.00" status="negative" />
                <DataRow label="Loans (Liability)" value="5,00,000.00" status="negative" />
              </DashboardCard>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <DashboardCard title="Aging Summary" icon={CreditCard}>
                <DataRow label="0-30 Days" value="6,50,000.00" />
                <DataRow label="31-60 Days" value="1,20,000.00" />
                <DataRow label="61-90 Days" value="45,000.00" />
                <DataRow label="> 90 Days" value="35,000.00" status="negative" isBold />
              </DashboardCard>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

