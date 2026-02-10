// TallyCommonTable.jsx (Industry Ready Version)
import React, { useState, useEffect } from 'react';

export default function CommonTable({ title, headers, data, columns, onRowSelect }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleKeys = (e) => {
            if (e.key === "ArrowDown") {
                setActiveIndex(prev => (prev < data.length - 1 ? prev + 1 : prev));
            } else if (e.key === "ArrowUp") {
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === "Enter") {
                onRowSelect(data[activeIndex]);
            }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [data, activeIndex]);

    return (
        <div className="flex flex-col h-full border-2 border-[#004a4d] bg-white">
            <div className="bg-[#004a4d] text-white px-3 py-1 text-xs flex justify-between font-bold uppercase tracking-wider">
                <span>{title}</span>
                <span>Rows: {data.length}</span>
            </div>
            <div className="flex-1 overflow-auto bg-[#f1f5f9]">
                <table className="w-full text-xs text-left border-collapse">
                    <thead className="sticky top-0 bg-[#e2e8f0] text-[#004a4d] uppercase">
                        <tr>
                            <th className="p-2 border-b border-r w-10">#</th>
                            {headers.map((h, i) => (
                                <th key={i} className="p-2 border-b border-r">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr 
                                key={item.id}
                                className={`
                                    cursor-pointer border-b transition-colors
                                    ${idx === activeIndex ? 'bg-yellow-200' : 'bg-white hover:bg-slate-50'}
                                    ${idx === activeIndex ? 'text-black' : 'text-slate-700'}
                                `}
                                onClick={() => setActiveIndex(idx)}
                            >
                                <td className="p-2 border-r text-center">{idx + 1}</td>
                                {columns.map((col, i) => (
                                    <td key={i} className="p-2 border-r uppercase font-medium">{item[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}