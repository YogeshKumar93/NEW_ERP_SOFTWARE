import React from 'react';

export default function SelectStates({ states, value, onChange, onKeyDown, inputRef, error }) {
    return (
        <div className="flex flex-col flex-1">
            <select
                ref={inputRef}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`w-full border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none ${error ? 'border-red-500' : ''}`}
            >
                <option value="">-- Select State --</option>
                {states && states.map((state) => (
                    <option key={state.id} value={state.name}>
                        {state.state_code} - {state.state}
                    </option>
                ))}
            </select>
            {error && <span className="text-[9px] text-red-600 font-bold uppercase">{error}</span>}
        </div>
    );
}