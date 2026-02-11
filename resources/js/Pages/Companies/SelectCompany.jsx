import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function SelectCompany({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
    });

    // Tally is keyboard-first; let's auto-focus the select
    const selectRef = useRef();
    useEffect(() => {
        selectRef.current?.focus();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('companies.select'));
    };

    return (
        <div className="min-h-screen bg-[#2d3e4f] flex items-center justify-center font-mono">
            {/* Main Window Container */}
            <div className="w-full max-w-2xl border-4 border-[#e9f1f7] bg-[#e9f1f7] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]">
                
                {/* Header Bar */}
                <div className="bg-[#004e8c] text-white px-4 py-1 flex justify-between items-center border-b-2 border-white">
                    <span className="text-sm font-bold uppercase tracking-wider">Select Company</span>
                    <span className="text-xs">v1.0</span>
                </div>

                <div className="p-6 bg-[#e9f1f7]">
                    <form onSubmit={submit} className="space-y-4">
                        <div className="border-2 border-[#004e8c] bg-white p-1">
                            <label className="block bg-[#004e8c] text-white px-2 py-1 text-xs mb-2 uppercase font-bold">
                                List of Selected Companies
                            </label>
                            
                            <select
                                ref={selectRef}
                                value={data.company_id}
                                onChange={(e) => setData('company_id', e.target.value)}
                                className="w-full border-none focus:ring-0 text-[#004e8c] font-bold text-lg cursor-pointer bg-transparent"
                                size={Math.min(companies.length + 1, 10)} // Visualizes a list like Tally
                            >
                                <option value="" className="p-2 italic">-- Select a Company --</option>
                                {companies.map(c => (
                                    <option key={c.id} value={c.id} className="p-2 hover:bg-[#ffc107] hover:text-black uppercase">
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {errors.company_id && (
                            <div className="bg-red-600 text-white px-3 py-1 text-sm border-2 border-red-800">
                                [!] {errors.company_id}
                            </div>
                        )}

                        {/* Button Area */}
                        <div className="flex justify-end pt-4 border-t border-[#004e8c]">
                            <button
                                disabled={processing}
                                className={`
                                    px-6 py-1 border-2 border-[#004e8c] bg-[#e9f1f7] text-[#004e8c] font-bold uppercase
                                    hover:bg-[#004e8c] hover:text-white transition-colors duration-150
                                    active:translate-y-1 shadow-[4px_4px_0px_0px_#004e8c] active:shadow-none
                                    ${processing ? 'opacity-50' : ''}
                                `}
                            >
                                {processing ? 'Loading...' : 'Accept'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Bar */}
                <div className="bg-[#004e8c] text-white px-2 py-0.5 text-[10px] flex gap-4 border-t-2 border-white">
                    <span>F1: Select Comp</span>
                    <span>F3: Cmp Info</span>
                    <span>Ctrl+M: Main Menu</span>
                </div>
            </div>
        </div>
    );
}