import { useEffect } from 'react';

export default function useShortcuts(handlers, isDisabled = false) {
    useEffect(() => {
        if (isDisabled) return; 

        const handleKeyDown = (e) => {
            let keyCombo = "";
            if (e.altKey) keyCombo = `alt+${e.key.toLowerCase()}`;
            else if (e.key.startsWith('F') || e.key === 'Escape') keyCombo = e.key;
            else if (e.key === 'Enter') keyCombo = 'Enter';

            if (handlers[keyCombo]) {
                e.preventDefault();
                handlers[keyCombo](e);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlers, isDisabled]);
}