import { usePage } from "@inertiajs/react";
import Toast from "@/Components/Common/Toast";
import Sidebar from "@/Components/Navigation/Sidebar";
import Header from "@/Components/Navigation/Header";
import Footer from "@/Components/Navigation/Footer";


export default function AppLayout({ children, title }) {
    const { toast } = usePage().props;

    return (
        <div className="flex h-screen bg-[#1e293b] text-slate-200 font-sans text-sm select-none">
            <Sidebar />
            <div className="flex-1 flex flex-col p-2 gap-2">
                <Header />
                <main className="flex-1 bg-white border border-slate-300 rounded-sm text-slate-800 overflow-y-auto relative shadow-sm">
                    <div className="p-5 h-full">
                        <div className="flex justify-between items-end border-b border-indigo-100 mb-6 pb-2">
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
                        <section className="h-[calc(100%-60px)]">{children}</section>
                    </div>
                </main>
                <Footer />
            </div>
            {toast && <Toast message={toast.message || toast.errors} type={toast.type} />}
        </div>
    );
}
