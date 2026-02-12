import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";

export default function Index({ groups = [] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupList, setGroupList] = useState(groups ?? []);
  const tableRef = useRef(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    nature: '',
    parent_id: '', // Optional functionality ke liye
  });

  // Refs for Focus Management (Tally style)
  const nameRef = useRef(null);
  const natureRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    setGroupList(groups);
    setActiveIndex(0);
  }, [groups]);

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
    e.preventDefault();
    post(route('groups.store'), {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
      onError: (err) => console.error("Form Submission Error:", err)
    });
  };

  // Shortcuts logic (Alt+C to create, Esc to close)
  useShortcuts({
    'alt+c': () => toggleCreate(),
    'Escape': () => setIsFormOpen(false),
    'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < groupList.length - 1 ? prev + 1 : prev)),
    'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    'Enter': () => {
        if(!isFormOpen && groupList[activeIndex]) {
            console.log("Selected Group:", groupList[activeIndex]);
        }
    }
  }, isFormOpen);

  return (
    <AppLayout title="Groups">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        {/* Tally Top Bar */}
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Master Creation {'>'} Groups</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">K</span>:Company | <span className="underline decoration-yellow-400">C</span>:Create
          </span>
        </div>

        <div className="flex-1 relative flex p-4 overflow-hidden">
          {/* Table View */}
          <CommonTable
            ref={tableRef}
            title="List of Groups"
            headers={["Group Name", "Nature", "Parent"]}
            data={groupList}
            columns={["name", "nature", "parent_id"]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onRowSelect={(group) => console.log("Selected:", group)}
          />

          {/* Creation Modal */}
          <CommonFormModal
            isOpen={isFormOpen}
            title="Group Creation"
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            submitRef={submitRef}
            width="w-[500px]" // Groups ke liye chota width kaafi hai
          >
            <div className="space-y-4 text-[11px] bg-[#e3f2fd] p-6 border border-blue-200">
                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-4 uppercase">Group Details</h3>

                {/* Name Field */}
                <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 shrink-0">Name:</label>
                    <input 
                        ref={nameRef} 
                        type="text" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value.toUpperCase())} 
                        onKeyDown={(e) => handleKeyDown(e, natureRef)} 
                        className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none" 
                        placeholder="Enter Group Name"
                    />
                </div>
                {errors.name && <div className="text-red-600 ml-32">{errors.name}</div>}

                {/* Nature Field */}
                <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 shrink-0">Under (Nature):</label>
                    <select 
                        ref={natureRef}
                        value={data.nature} 
                        onChange={e => setData('nature', e.target.value)} 
                        onKeyDown={(e) => handleKeyDown(e, submitRef)}
                        className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none"
                    >
                        <option value="">Select Nature</option>
                        <option value="Assets">Assets</option>
                        <option value="Liability">Liability</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                {errors.nature && <div className="text-red-600 ml-32">{errors.nature}</div>}

                <div className="mt-6 pt-4 border-t border-blue-200 text-right italic text-gray-500">
                    Press Enter to Save
                </div>
            </div>
          </CommonFormModal>
        </div>
      </div>
    </AppLayout>
  );
}