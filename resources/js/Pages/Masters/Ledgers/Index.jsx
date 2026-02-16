import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";
import { printRowReceipt } from "@/Utils/PrintHelper";

export default function Index({ ledgers = [], groups = [] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ledgerList, setLedgerList] = useState(ledgers ?? []);
  const tableRef = useRef(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    group_id: '',
    opening_balance: '',
    opening_type: 'Dr',
    gst_number: '',
    address: ''
  });

  // Refs for Focus Management
  const nameRef = useRef(null);
  const groupRef = useRef(null);
  const balanceRef = useRef(null);
  const typeRef = useRef(null);
  const gstRef = useRef(null);
  const addressRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    setLedgerList(ledgers);
    setActiveIndex(0);
  }, [ledgers]);

  const toggleCreate = () => {
    setIsFormOpen(true);
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) nextRef.current.focus();
      else handleSubmit(e);
    }
  };

  // Particular Ledger Print karne ka function
  const handlePrint = (ledger) => {
    if (!ledger) return;
    // Yahan hum map kar rahe hain ki receipt mein kya dikhana hai
    const receiptData = {
   "Ledger Name": ledger.name,
        "Under Group": ledger.group_name || ledger.group_id,
        "Opening Balance": `${ledger.opening_balance} ${ledger.opening_type}`,
        "GST Number": ledger.gst_number || "N/A",
        "Address": ledger.address || "N/A",
        "Status": "Active"
    };

    printRowReceipt("LEDGER DETAILS", receiptData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('ledgers.store'), {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
    });
  };

  useShortcuts({
    'alt+c': () => toggleCreate(),
  'p': () => !isFormOpen && handlePrint(ledgerList[activeIndex]),
    'P': () => !isFormOpen && handlePrint(ledgerList[activeIndex]), // Capital P ke liye
    'Escape': () => setIsFormOpen(false),
    'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < ledgerList.length - 1 ? prev + 1 : prev)),
    'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
  }, isFormOpen);

  return (
    <AppLayout title="Ledgers">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Ledgers</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
          </span>
        </div>

        <div className="flex-1 relative flex p-4 overflow-hidden">
          {/* Main Table */}
          <CommonTable
            ref={tableRef}
            title="List of Ledgers"
            headers={["Ledger Name", "Group", "Opening Bal", "Type", "GSTIN", "Actions"]}
            data={ledgerList}
            columns={["name", "group_id", "opening_balance", "opening_type", "gst_number","actions" ]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onRowSelect={(ledger) => console.log("Selected:", ledger)}
          renderCell={(ledger, column) => {
        if (column === "actions") {
            return (
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        handlePrint(ledger); 
                    }}
                    className="bg-[#004a4d] text-white px-2 font-bold border border-black hover:bg-yellow-400"
                >
                    P
                </button>
            );
        }
        return ledger[column];
    }}
          />

          {/* Creation Form Modal */}
          <CommonFormModal
            isOpen={isFormOpen}
            title="Ledger Creation"
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            submitRef={submitRef}
            width="w-[700px]"
          >
            <div className="grid grid-cols-1 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">
              
              <div className="space-y-2">
                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">General Details</h3>

                {/* Name */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Name:</label>
                  <input 
                    ref={nameRef} 
                    type="text" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value.toUpperCase())} 
                    onKeyDown={(e) => handleKeyDown(e, groupRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                  />
                </div>

                {/* Under Group */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Under Group:</label>
                  <select 
                    ref={groupRef}
                    value={data.group_id} 
                    onChange={e => setData('group_id', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, balanceRef)}
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                  >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>

                {/* Opening Balance & Type */}
                <div className="flex items-center gap-2">
                  <label className="w-32 font-bold text-gray-700">Opening Bal:</label>
                  <input 
                    ref={balanceRef} 
                    type="number" 
                    value={data.opening_balance} 
                    onChange={e => setData('opening_balance', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, typeRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                  />
                  <select 
                    ref={typeRef}
                    value={data.opening_type} 
                    onChange={e => setData('opening_type', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, gstRef)}
                    className="w-16 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                  >
                    <option value="Dr">Dr</option>
                    <option value="Cr">Cr</option>
                  </select>
                </div>

                {/* GST Number */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">GSTIN:</label>
                  <input 
                    ref={gstRef} 
                    type="text" 
                    value={data.gst_number} 
                    onChange={e => setData('gst_number', e.target.value.toUpperCase())} 
                    onKeyDown={(e) => handleKeyDown(e, addressRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                  />
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <label className="w-32 font-bold pt-1 text-gray-700">Address:</label>
                  <textarea 
                    ref={addressRef} 
                    rows="2" 
                    value={data.address} 
                    onChange={e => setData('address', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, submitRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none resize-none" 
                  />
                </div>
              </div>

            </div>
          </CommonFormModal>
        </div>
      </div>
    </AppLayout>
  );
}