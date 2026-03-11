import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2"; // Optional: Acche pop-up ke liye 'npm install sweetalert2' karein

export default function Attendance({ employees }) {
  const webcamRef = useRef(null);

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
        // Standard Alert (Aap SweetAlert2 bhi use kar sakte hain)
        alert("Attendance Marked Successfully!");
        
        // Form aur Photo ko reset karne ke liye
        reset("employee_id", "photo");
        
        // Agar aap pure page ko reload karna chahte hain (Inertia way):
        // window.location.reload(); 
      },
      onError: (err) => {
        console.error("Error saving attendance:", err);
        alert("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <AppLayout title="Attendance">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Attendance System</h2>
            <p className="opacity-80 text-sm">Align your face and capture to check-in</p>
          </div>

          <form onSubmit={submit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Side: Camera */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">1. Step: Capture Photo</label>
                <div className="relative rounded-2xl overflow-hidden shadow-inner bg-black aspect-video border-4 border-gray-100">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button
                      type="button"
                      onClick={capture}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Selection & Preview */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">2. Step: Select Name</label>
                  <select
                    className="w-full border-2 border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={data.employee_id}
                    onChange={(e) => setData("employee_id", e.target.value)}
                    required
                  >
                    <option value="">-- Choose Employee --</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center min-h-[180px]">
                  {data.photo ? (
                    <>
                      <img src={data.photo} className="rounded-lg shadow-lg max-h-32 mb-2" alt="Preview" />
                      <span className="text-xs text-green-600 font-medium">✓ Photo Ready</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">No Photo Captured</span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-10 border-t pt-6">
              <button
                type="submit"
                disabled={processing || !data.photo || !data.employee_id}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-[0.98] ${
                  !data.photo || !data.employee_id || processing
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                }`}
              >
                {processing ? "Uploading..." : "SUBMIT ATTENDANCE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}