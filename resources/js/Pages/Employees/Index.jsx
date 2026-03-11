import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import CommonTable from "@/Components/Common/CommonTable";
import useShortcuts from "@/Hooks/useShortCuts";

export default function Index({ employees = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Tally Style Shortcuts (Alt+C for Create)
    useShortcuts({
        'alt+c': () => {
            window.location.href = route('employees.create');
        },
        'ArrowDown': () => setActiveIndex(prev => (prev < employees.length - 1 ? prev + 1 : prev)),
        'ArrowUp': () => setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    }, false);

    return (
        <AppLayout title="Employees">
            <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
                
                {/* Tally Style Top Bar - Matched with Sales.jsx */}
                <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
                    <span>Biggbrains 4.0 | Gateway of ERP {'>'} Masters {'>'} Employees</span>
                    <span className="flex gap-4">
                        <Link href={route('employees.create')} className="hover:text-yellow-400">
                            <span className="underline decoration-yellow-400">Alt+C</span>:Create
                        </Link>
                        <span><span className="underline decoration-yellow-400">Esc</span>:Close</span>
                    </span>
                </div>

                <div className="flex-1 relative flex p-4 overflow-hidden">
                    {/* Main Table View - Using CommonTable for consistent ERP Look */}
                    <CommonTable
                        title="List of Employees"
                        headers={["Name", "Email", "Phone", "Designation", "Salary", "Actions"]}
                        data={employees} 
                        columns={["name", "email", "phone", "designation", "salary", "actions"]}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        renderCell={(emp, column) => {
                            if (column === "actions") {
                                return (
                                    <Link
                                        href={route('employees.edit', emp.id)}
                                        className="bg-[#004a4d] text-white px-3 py-0.5 text-[10px] border border-black hover:bg-yellow-400 hover:text-black transition-colors"
                                    >
                                        EDIT
                                    </Link>
                                );
                            }
                            // Currency formatting for salary if it's the salary column
                            if (column === "salary") {
                                return parseFloat(emp.salary).toLocaleString('en-IN');
                            }
                            return emp[column];
                        }}
                    />
                </div>

                {/* Bottom Info Bar (Optional, for Tally feel) */}
                <div className="bg-[#dee1e1] border-t border-gray-400 p-1 px-4 flex justify-between text-[10px] text-gray-600 font-bold uppercase">
                    <span>Total Employees: {employees.length}</span>
                    <span>Use Arrow Keys to Navigate</span>
                </div>
            </div>
        </AppLayout>
    );
}