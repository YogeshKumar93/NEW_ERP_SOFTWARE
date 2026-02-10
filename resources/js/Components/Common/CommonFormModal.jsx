import React from 'react';

export default function CommonFormModal({ isOpen, title, children, onSubmit, onCancel, submitRef, width }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            {/* Width is now dynamic, defaults to 550px if not provided */}
            <div className={`${width ? width : 'w-[550px]'} bg-[#e1f5fe] border-2 border-[#01579b] shadow-2xl animate-in zoom-in duration-150`}>
                
                {/* Header */}
                <div className="bg-[#01579b] text-white text-center py-1 font-bold uppercase text-sm tracking-widest shrink-0">
                    {title}
                </div>
                
                <form onSubmit={onSubmit} className="p-4 flex flex-col gap-3 text-sm">
                    {/* Content Area */}
                    <div className="overflow-y-auto max-h-[80vh]">
                        {children}
                    </div>

                    {/* Tally Style Accept Box */}
                    <div className="mt-4 self-end bg-[#b3e5fc] border border-[#01579b] p-4 text-center w-44 shadow-lg shrink-0">
                        <p className="font-bold mb-3 italic text-[#01579b]">Accept?</p>
                        <div className="flex justify-around gap-2">
                            <button 
                                ref={submitRef}
                                type="submit" 
                                className="flex-1 bg-white border border-[#01579b] py-1 font-bold hover:bg-[#01579b] hover:text-white focus:bg-[#01579b] focus:text-white outline-none"
                            >Yes</button>
                            <button 
                                type="button" 
                                onClick={onCancel}
                                className="flex-1 bg-white border border-red-600 py-1 font-bold hover:bg-red-600 hover:text-white outline-none text-red-600"
                            >No</button>
                        </div>
                        <p className="text-[9px] mt-2 text-gray-500 uppercase">Enter to Save</p>
                    </div>
                </form>
            </div>
        </div>
    );
}