import React, { useRef } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import useShortcuts from "@/Hooks/useShortCuts";

export default function Edit({ employee }) {
  const { data, setData, put, processing, errors } = useForm({
    name: employee.name || "",
    email: employee.email || "",
    phone: employee.phone || "",
    designation: employee.designation || "",
    salary: employee.salary || "",
    joining_date: employee.joining_date || ""
  });

  // Refs for Focus Management (Tally-like Enter key navigation)
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
    put(route('employees.update', employee.id));
  }

  // Escape key to go back
  useShortcuts({
    'Escape': () => window.history.back(),
  }, false);

  return (
    <AppLayout title="Edit Employee">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        
        {/* Tally Style Top Bar */}
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Masters {'>'} Employees {'>'} Edit</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">Esc</span>:Back | <span className="underline decoration-yellow-400">Enter</span>:Next
          </span>
        </div>

        <div className="flex-1 flex justify-center items-start p-6 overflow-auto">
          <div className="w-[850px] bg-[#e3f2fd] border border-blue-200 shadow-lg p-6 text-[11px]">
            <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-1 mb-6 uppercase text-[13px]">
              Employee Alteration (Edit Mode)
            </h3>

            <form onSubmit={submit}>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                
                {/* Left Column: Personal Info */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Employee Name:</label>
                    <input
                      ref={nameRef}
                      autoFocus
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.name}
                      onChange={e => setData('name', e.target.value.toUpperCase())}
                      onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    />
                  </div>
                  {errors.name && <div className="text-red-600 ml-32">{errors.name}</div>}

                  <div className="flex items-center">
                    <label className="w-32 font-bold text-gray-700 uppercase">Email Address:</label>
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
                    <label className="w-32 font-bold text-gray-700 uppercase">Phone No:</label>
                    <input
                      ref={phoneRef}
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, designationRef)}
                    />
                  </div>
                </div>

                {/* Right Column: Job Info */}
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
                    <label className="w-32 font-bold text-gray-700 uppercase">Monthly Salary:</label>
                    <input
                      ref={salaryRef}
                      type="number"
                      className="flex-1 border border-gray-400 px-2 py-1 focus:bg-[#fff9c4] outline-none shadow-sm text-right font-bold"
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

              {/* Action Bar */}
              <div className="mt-8 pt-4 border-t border-blue-200 flex justify-between items-center">
                <div className="text-[9px] text-gray-500 italic uppercase">
                  Last Updated: {new Date().toLocaleDateString()}
                </div>
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={processing}
                  className="bg-[#004a4d] text-white px-10 py-2 uppercase text-[11px] font-bold hover:bg-[#003638] shadow-md border border-black transition-all active:scale-95"
                >
                  {processing ? 'Updating...' : 'Update Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}