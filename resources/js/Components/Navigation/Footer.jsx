import React, { useState } from 'react';
import useShortcuts from "@/Hooks/useShortCuts";
import TallyDrawer from './TallyDrawer';


export default function Footer({ activeActions = {} }) {
    const [activeDrawer, setActiveDrawer] = useState(null);

    // Default Tally-style functions
    const handleF2 = () => setActiveDrawer('period');
    const handleF3 = () => setActiveDrawer('company');

    // Shortcut Hook inside Footer
    useShortcuts({
        'F2': activeActions['F2']?.fn || handleF2,
        'F3': activeActions['F3']?.fn || handleF3,
        'Escape': () => setActiveDrawer(null),
    }, !!activeDrawer);

    const buttons = [
        { key: 'F2', label: 'Period' },
        { key: 'F3', label: 'Company' },
        { key: 'F4', label: 'Contra' },
        { key: 'F5', label: 'Payment' },
        { key: 'F6', label: 'Receipt' },
        { key: 'F11', label: 'Features' },
    ];

    return (
        <>
            {/* Global Drawer - Rendered via Footer state */}
            {activeDrawer && (
                <TallyDrawer 
                    type={activeDrawer} 
                    isOpen={!!activeDrawer} 
                    onClose={() => setActiveDrawer(null)} 
                />
            )}

            <footer className="h-10 grid grid-cols-6 gap-1 p-1 bg-[#1e293b] border-t border-slate-700">
                {buttons.map((btn) => {
                    // Logic: Use prop action if provided, else use default footer action
                    const hasAction = activeActions[btn.key] || (btn.key === 'F2' || btn.key === 'F3');
                    const onClickHandler = activeActions[btn.key]?.fn || 
                                         (btn.key === 'F2' ? handleF2 : 
                                          btn.key === 'F3' ? handleF3 : null);

                    return (
                        <button 
                            key={btn.key}
                            onClick={() => onClickHandler && onClickHandler()}
                            disabled={!hasAction}
                            className={`text-[10px] font-bold uppercase rounded-sm border transition-all flex flex-col items-center justify-center
                                ${hasAction 
                                    ? 'bg-[#334155] border-slate-500 text-white hover:bg-indigo-600 active:scale-95' 
                                    : 'bg-transparent border-transparent text-slate-600 cursor-not-allowed opacity-40'}
                            `}
                        >
                            <span className="text-yellow-400 text-[9px] leading-none">{btn.key}</span>
                            <span className="truncate w-full text-center px-1">
                                {activeActions[btn.key]?.label || btn.label}
                            </span>
                        </button>
                    );
                })}
            </footer>
        </>
    );
}