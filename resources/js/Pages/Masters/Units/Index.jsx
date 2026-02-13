import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";

export default function Index({ units = [] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [unitList, setUnitList] = useState(units ?? []);
  const tableRef = useRef(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    symbol: "",
    type: "quantity",
    decimal_places: 2,
  });

  // Refs for Focus Management
  const nameRef = useRef(null);
  const symbolRef = useRef(null);
  const typeRef = useRef(null);
  const decimalRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    setUnitList(units);
    setActiveIndex(0);
  }, [units]);

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

  const handleSubmit = (e) => {
    e?.preventDefault();
    post(route("units.store"), {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
    });
  };

  // Keyboard Shortcuts (Alt+C to create, Arrows to navigate table)
  useShortcuts({
    'alt+c': () => toggleCreate(),
    'Escape': () => setIsFormOpen(false),
    'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < unitList.length - 1 ? prev + 1 : prev)),
    'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
  }, isFormOpen);

  return (
    <AppLayout title="Units">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Inventory {'>'} Units</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">Alt+C</span>:Create | <span className="underline decoration-yellow-400">Esc</span>:Close
          </span>
        </div>

        <div className="flex-1 relative flex p-4 overflow-hidden">
          {/* Main Table */}
          <CommonTable
            ref={tableRef}
            title="List of Units"
            headers={["Unit Name", "Symbol", "Type", "Decimals"]}
            data={unitList}
            columns={["name", "symbol", "type", "decimal_places"]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onRowSelect={(unit) => console.log("Selected:", unit)}
          />

          {/* Creation Form Modal */}
          <CommonFormModal
            isOpen={isFormOpen}
            title="Unit Creation"
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            submitRef={submitRef}
            width="w-[500px]"
          >
            <div className="grid grid-cols-1 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">
              
              <div className="space-y-2">
                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Unit Details</h3>

                {/* Name */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Name:</label>
                  <input 
                    ref={nameRef} 
                    type="text" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value.toUpperCase())} 
                    onKeyDown={(e) => handleKeyDown(e, symbolRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                  />
                </div>

                {/* Symbol */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Symbol:</label>
                  <input 
                    ref={symbolRef} 
                    type="text" 
                    value={data.symbol} 
                    onChange={e => setData('symbol', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, typeRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
                  />
                </div>

                {/* Type */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Type:</label>
                  <select 
                    ref={typeRef}
                    value={data.type} 
                    onChange={e => setData('type', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, decimalRef)}
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                  >
                    <option value="quantity">Quantity</option>
                    <option value="weight">Weight</option>
                    <option value="liquid">Liquid</option>
                  </select>
                </div>

                {/* Decimal Places */}
                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700">Decimals:</label>
                  <input 
                    ref={decimalRef} 
                    type="number" 
                    value={data.decimal_places} 
                    onChange={e => setData('decimal_places', e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, submitRef)} 
                    className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" 
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