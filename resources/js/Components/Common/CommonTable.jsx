import React, { useImperativeHandle, forwardRef, useCallback } from 'react';

const CommonTable = forwardRef(({ 
    title = "Table", 
    headers = [], 
    data = [], 
    columns = [], 
    onRowSelect,
    activeIndex, // Parent se aayega
    setActiveIndex, // Parent ka state update karne ke liye
    onRefresh,
    renderCell
}, ref) => {

    // 1. Internal Refresh Logic (Parent calls this via ref)
    const refreshTable = useCallback(() => {
        if (setActiveIndex) setActiveIndex(0);
        if (onRefresh) onRefresh();
    }, [onRefresh, setActiveIndex]);

    // 2. Expose function to Parent
    useImperativeHandle(ref, () => ({
        refresh: refreshTable,
        currentRow: data[activeIndex]
    }));

    return (
        <div className="flex flex-col h-full border-2 border-[#004a4d] bg-white shadow-lg font-mono">
            {/* Header Section */}
            <div className="bg-[#004a4d] text-white px-3 py-1.5 text-xs flex justify-between items-center font-bold">
                <span className="tracking-widest uppercase">{title}</span>
                <div className="flex gap-4 items-center">
                    <span className="opacity-80">Total: {data.length}</span>
                    <button 
                        onClick={refreshTable}
                        className="bg-[#006064] hover:bg-[#00838f] px-2 py-0.5 rounded text-[10px] transition-all border border-cyan-400/30"
                    >
                        REFRESH (F5)
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 overflow-auto bg-[#f8fafc]">
                <table className="w-full text-[11px] text-left border-collapse table-fixed">
                    <thead className="sticky top-0 bg-[#cbd5e1] text-[#004a4d] z-10 shadow-sm uppercase">
                        <tr>
                            <th className="p-2 border-b border-r w-12 text-center">#</th>
                            {headers.map((h, i) => (
                                <th key={i} className="p-2 border-b border-r truncate font-bold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr 
                                key={item.id || idx}
                                className={`
                                    cursor-pointer border-b select-none
                                    ${idx === activeIndex ? 'bg-[#ffeb3b] text-black font-bold shadow-inner' : 'hover:bg-blue-50 text-slate-700'}
                                `}
                                onClick={() => setActiveIndex(idx)}
                                onDoubleClick={() => onRowSelect?.(item)}
                            >
                                <td className="p-2 border-r text-center bg-slate-100/50">{idx + 1}</td>
                              {columns.map((col, i) => (
    <td key={i} className="p-2 border-r truncate uppercase">
        {/* Agar renderCell ek function hai (sirf Ledger page pe), toh usey chalao. 
            Nahi toh purana default logic (item[col]) chalao. */}
        {typeof renderCell === 'function' 
            ? renderCell(item, col) 
            : (item[col] || '-')}
    </td>
))}
                            </tr>
                        ))}
                        {/* Tally Style Empty Rows for UI consistency */}
                        {data.length < 15 && [...Array(15 - data.length)].map((_, i) => (
                            <tr key={`empty-${i}`} className="h-8 border-b opacity-20">
                                <td className="border-r"></td>
                                {columns.map((_, ci) => <td key={ci} className="border-r"></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default CommonTable;