import React, { useEffect } from 'react';

export default function CommonFormModal({ isOpen, title, children, onSubmit, onCancel, submitRef, width }) {
    
    // Escape key handling inside Modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onCancel();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className={`${width ? width : 'w-[500px]'} bg-[#e1f5fe] border-2 border-[#01579b] shadow-2xl animate-in zoom-in duration-100`}>
                
                {/* Header */}
                <div className="bg-[#01579b] text-white text-center py-0.5 font-bold uppercase text-[12px] tracking-widest shrink-0">
                    {title}
                </div>
                
              <form onSubmit={onSubmit} className="p-3 flex flex-col gap-2 text-[11px]">
  
  <div className="overflow-y-auto max-h-[75vh]">
    {children}
  </div>

  <div className="mt-2 self-end bg-[#b3e5fc] border border-[#01579b] p-2 text-center w-32 shadow-md shrink-0">
    <p className="font-bold mb-1 italic text-[#01579b] text-[10px]">Accept?</p>

    <div className="flex justify-around gap-2">
      <button
        ref={submitRef}
        type="submit"
        className="flex-1 bg-white border border-[#01579b] py-0.5 font-bold hover:bg-[#01579b] hover:text-white"
      >
        Yes
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-white border border-red-600 py-0.5 font-bold hover:bg-red-600 hover:text-white text-red-600"
      >
        No
      </button>
    </div>
  </div>
</form>

            </div>
        </div>
    );
}