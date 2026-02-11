import React from 'react';
import AppLayout from "@/Layouts/AppLayout";

// Reusable Card Component
const DashboardCard = ({ title, children, date = "For 1-Apr-25" }) => (
  <div className="bg-white border border-gray-400 shadow-sm flex flex-col h-full">
    <div className="p-2 border-b border-gray-300 bg-gray-50">
      <h2 className="font-bold text-md leading-tight text-black">{title}</h2>
      <p className="text-[10px] text-gray-500 italic">{date}</p>
    </div>
    <div className="p-3 flex-grow text-xs">
      {children}
    </div>
  </div>
);

// Row Component for consistent Tally table look
const DataRow = ({ label, value, isBold = false, isItalic = false }) => (
  <div className={`flex justify-between py-1 border-b border-gray-100 last:border-0 ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default function Dashboard() {
  // Static Data Objects
  const tradingData = [
    { label: "Gross Profit", value: "12,45,000.00" },
    { label: "Nett Profit", value: "8,10,200.00" },
    { label: "Sales Accounts", value: "45,00,000.00" },
    { label: "Purchase Accounts", value: "32,55,000.00" },
  ];

  const assetLiabilityData = [
    { label: "Current Assets", value: "25,00,000.00" },
    { label: "Current Liabilities", value: "12,50,000.00" },
    { label: "Fixed Assets", value: "18,00,000.00" },
    { label: "Loans (Liability)", value: "5,00,000.00" },
  ];

  const ratioData = [
    { label: "Inventory Turnover", value: "4.25 : 1" },
    { label: "Debt/Equity Ratio", value: "0.35 : 1" },
    { label: "Receivable Turnover in Days", value: "42 days" },
    { label: "Return on Investment %", value: "18.5%" },
  ];

  return (
    <AppLayout>
      <div className="bg-[#f0f0f0] min-h-screen p-4 font-sans text-gray-900">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-400 pb-1">
          <h1 className="text-xl font-bold">Company Dashboard</h1>
          <span className="text-sm font-semibold bg-gray-800 text-white px-2 py-1">Financial Year 2025-26</span>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          
          {/* Column 1 */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <DashboardCard title="Sales Trend">
              <div className="h-32 flex items-end gap-1 border-l border-b border-gray-400 px-1 pt-4">
                {[40, 70, 45, 90, 65, 30, 85, 50, 75, 40, 60, 55].map((h, i) => (
                  <div key={i} className="bg-blue-600 w-full" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-around text-[9px] mt-1 text-gray-600">
                <span>Apr</span><span>Jul</span><span>Oct</span><span>Jan</span>
              </div>
            </DashboardCard>

            <DashboardCard title="Trading Details">
              <div className="flex justify-between font-bold border-b border-gray-400 mb-1 pb-1">
                <span>Particulars</span><span>Amount</span>
              </div>
              {tradingData.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} isItalic={idx < 2} />
              ))}
            </DashboardCard>
          </div>

          {/* Column 2 */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <DashboardCard title="Purchase Trend">
              <div className="h-32 flex items-end gap-1 border-l border-b border-gray-400 px-1 pt-4">
                {[30, 50, 80, 40, 30, 90, 20, 60, 40, 80, 30, 45].map((h, i) => (
                  <div key={i} className="bg-cyan-600 w-full" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-around text-[9px] mt-1 text-gray-600">
                <span>Apr</span><span>Jul</span><span>Oct</span><span>Jan</span>
              </div>
            </DashboardCard>

            <DashboardCard title="Assets/Liabilities">
              <div className="flex justify-between font-bold border-b border-gray-400 mb-1 pb-1">
                <span>Particulars</span><span>Closing Balance</span>
              </div>
              {assetLiabilityData.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </DashboardCard>
          </div>

          {/* Column 3 */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <DashboardCard title="Cash In/Out Flow">
              <p className="text-right font-bold text-[10px] text-blue-800 mb-2">♦ Primary Cash</p>
              <DataRow label="Inflow" value="15,40,000.00" />
              <DataRow label="Outflow" value="(11,20,000.00)" />
              <div className="mt-2 pt-1 border-t border-double border-gray-800 font-bold">
                <DataRow label="Nett Flow" value="4,20,000.00" />
              </div>
            </DashboardCard>

            <DashboardCard title="Receivables/Payables">
              <div className="flex justify-between font-bold border-b border-gray-400 mb-1 pb-1">
                <span>Particulars</span><span>Pending</span>
              </div>
              <DataRow label="Receivables" value="8,50,000.00" />
              <DataRow label="Overdue Receivables" value="1,20,000.00" />
              <DataRow label="Payables" value="4,30,000.00" />
            </DashboardCard>

            <DashboardCard title="Accounting Ratios">
              {ratioData.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </DashboardCard>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}