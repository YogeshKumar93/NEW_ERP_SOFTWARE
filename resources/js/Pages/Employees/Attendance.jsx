import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";

export default function Attendance({ employees }) {
  const webcamRef = useRef(null);
  const [lastLog, setLastLog] = useState(null);

  const { data, setData, post, reset, processing } = useForm({
    employee_id: "",
    photo: "",
  });

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setData("photo", imageSrc);
  };

  const submit = (e) => {
    e.preventDefault();
    post("/attendance", {
      onSuccess: () => {
        // ERP style success notification
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Entry Recorded',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        
        // Storing last log for the 'Recent Activity' panel
        const empName = employees.find(e => e.id == data.employee_id)?.name;
        setLastLog({ name: empName, time: new Date().toLocaleTimeString() });

        // Auto Reset
        reset();
      },
    });
  };

  return (
    <AppLayout title="Attendance Management">
      <div className="bg-[#f3f4f6] min-h-screen p-6 font-sans">
        {/* Breadcrumbs / Page Header */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Attendance Control Center</h1>
            <p className="text-xs text-gray-500 uppercase font-semibold">Module: HRMS / Time & Action</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600">{new Date().toDateString()}</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-gray-400">SERVER SYNC ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Input Form (ERP Sidebar Style) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="border-b border-gray-100 p-4 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-700">Attendance Entry Form</h3>
              </div>
              
              <form onSubmit={submit} className="p-5 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Employee ID / Name</label>
                  <select
                    className="w-full bg-white border border-gray-300 rounded text-sm p-2.5 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                    value={data.employee_id}
                    onChange={(e) => setData("employee_id", e.target.value)}
                    required
                  >
                    <option value="">Search Employee...</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>[{emp.id}] {emp.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-[10px] text-blue-700 font-bold mb-2 uppercase">Action Required</p>
                  <button
                    type="button"
                    onClick={capture}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Capture Biometric Image
                  </button>
                </div>

                <div className="border border-gray-200 rounded bg-gray-50 p-2 flex items-center justify-center min-h-[120px]">
                  {data.photo ? (
                    <div className="relative">
                      <img src={data.photo} className="h-28 w-28 object-cover rounded border border-gray-300 shadow-sm" alt="Preview" />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400 font-bold uppercase italic">Image Preview Missing</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing || !data.photo || !data.employee_id}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded text-xs uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  {processing ? "Syncing Data..." : "Post Transaction"}
                </button>
              </form>
            </div>

            {/* Recent Log Widget */}
            {lastLog && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">📋</div>
                <div>
                  <p className="text-[10px] font-bold text-green-700 uppercase leading-none">Last Entry Success</p>
                  <p className="text-sm font-bold text-green-900">{lastLog.name}</p>
                  <p className="text-[10px] text-green-600">{lastLog.time}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Terminal View (The Scanner) */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
              <div className="border-b border-gray-100 p-4 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Live Biometric Feed</h3>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="p-8 flex flex-col items-center justify-center bg-slate-50 min-h-[500px]">
                <div className="relative border-[10px] border-white shadow-2xl rounded-lg overflow-hidden w-full max-w-2xl bg-black">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    className="w-full h-auto"
                  />
                  {/* ERP Overlay Grid */}
                  <div className="absolute inset-0 border border-white/10 grid grid-cols-4 grid-rows-4 pointer-events-none">
                    {[...Array(16)].map((_, i) => <div key={i} className="border-[0.5px] border-white/5"></div>)}
                  </div>
                  {/* Status Tag */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded border border-white/20">
                    <p className="text-[9px] text-white font-mono tracking-widest">CAM_01_SEC_AUTH</p>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-12 w-full max-w-2xl px-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{employees.length}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Personnel</p>
                  </div>
                  <div className="border-x border-gray-200">
                    <p className="text-lg font-bold text-blue-600">ACTIVE</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Terminal Status</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">EN-US</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">System Locale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}