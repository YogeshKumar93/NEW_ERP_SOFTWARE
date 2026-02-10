import { usePage } from "@inertiajs/react";
import Toast from "@/Components/Common/Toast";
import Sidebar from "@/Components/Navigation/Sidebar";
import Header from "@/Components/Navigation/Header";
import Footer from "@/Components/Navigation/Footer";

export default function AppLayout({ children, title }) {
    const { toast } = usePage().props;

    return (
        /* 1. overflow-hidden taaki poora page na hile */
        <div className="flex h-screen bg-[#1e293b] text-slate-200 font-sans text-sm select-none overflow-hidden">
            <Sidebar />
            
            <div className="flex-1 flex flex-col p-2 gap-2 overflow-hidden">
                <Header />
                
                {/* 2. Main Container: isme relative hona zaroori hai modal ke liye */}
                <main className="flex-1 bg-white border border-slate-300 rounded-sm text-slate-800 relative shadow-sm flex flex-col min-h-0">
                    
                    {/* 3. Content Area: isme padding hai lekin overflow handling smart hai */}
                    <div className="p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
                        
                        {/* Title Section (Fixed Height) */}
                        <div className="flex justify-between items-end border-b border-indigo-100 mb-4 pb-1 shrink-0">
                            <div>
                                <h1 className="text-xl font-light text-slate-500 uppercase tracking-widest">
                                    {title || "Overview"}
                                </h1>
                                <div className="h-1 w-12 bg-indigo-600 mt-1"></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                Path / {title || "Main"}
                            </span>
                        </div>

                        {/* 4. Real Scrollable Area: Section ko calc ki zaroorat nahi, flex-1 khud handle karega */}
                        <section className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                            {children}
                        </section>
                    </div>

                </main>

                <Footer />
            </div>

            {toast && <Toast message={toast.message || toast.errors} type={toast.type} />}
        </div>
    );
}