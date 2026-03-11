import React, { useRef } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import useShortcuts from "@/Hooks/useShortCuts";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    joining_date: new Date().toISOString().split('T')[0] // Default to today
  });

  // Refs for Tally-like Focus Management
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const designationRef = useRef(null);
  const salaryRef = useRef(null);
  const dateRef = useRef(null);
  const submitRef = useRef(null);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) nextRef.current.focus();
      else submit(e);
    }
  };

  function submit(e) {
    if (e) e.preventDefault();
    post("/employees");
  }

  // Tally Shortcuts
  useShortcuts({
    'Escape': () => window.history.back(),
    'alt+s': () => submit(),
  }, false);

  return (
    <AppLayout title="Create Employee">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        
        {/* Tally Style Top Bar */}
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Masters {'>'} Employees {'>'} Creation</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">Esc</span>:Back | <span className="underline decoration-yellow-400">Alt+S</span>:Save
          </span>
        </div>

        <div className="flex-1 flex justify-center items-start p-6 overflow-auto">
          <div className="w-[850px] bg-[#e3f2fd] border border-blue-200 shadow-lg p-6 text-[11px]">
            <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-1 mb-6 uppercase text-[13px]">
              Employee Creation
            </h3>

            <form onSubmit={submit}>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                
                {/* Left Column: Personal Profile */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Name:</label>
                    <input
                      ref={nameRef}
                      autoFocus
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.name}
                      onChange={e => setData('name', e.target.value.toUpperCase())}
                      onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    />
                  </div>
                  {errors.name && <div className="text-red-600 text-[9px] ml-32">{errors.name}</div>}

                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Email:</label>
                    <input
                      ref={emailRef}
                      type="email"
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Phone:</label>
                    <input
                      ref={phoneRef}
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, designationRef)}
                    />
                  </div>
                </div>

                {/* Right Column: Employment Details */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Designation:</label>
                    <input
                      ref={designationRef}
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.designation}
                      onChange={e => setData('designation', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, salaryRef)}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Salary:</label>
                    <input
                      ref={salaryRef}
                      type="number"
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm text-right"
                      value={data.salary}
                      onChange={e => setData('salary', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, dateRef)}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Joining Date:</label>
                    <input
                      ref={dateRef}
                      type="date"
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.joining_date}
                      onChange={e => setData('joining_date', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, submitRef)}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-blue-200 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-gray-200 text-gray-700 px-6 py-2 uppercase text-[11px] font-bold border border-gray-400 hover:bg-gray-300"
                >
                  Quit
                </button>
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={processing}
                  className="bg-[#004a4d] text-white px-10 py-2 uppercase text-[11px] font-bold hover:bg-[#003638] shadow-md border border-black active:scale-95 transition-all"
                >
                  {processing ? 'Saving...' : 'Accept'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}