import React from "react";
import { Head } from "@inertiajs/react";
import PaginatedTable from "@/Components/Common/PaginatedTable";

export default function Index() {
    const columns = [
        { key: "company_name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "gst", label: "GST" },
        {
            key: "created_at",
            label: "Joined",
            render: (row) => new Date(row.created_at).toLocaleDateString(),
        },
    ];

    return (
        <div className="p-8">
            <Head title="Companies" />
            <h1 className="text-2xl font-bold mb-4">Companies Management</h1>

            <PaginatedTable
                endpoint="/companies-test" // Laravel route
                columns={columns}
                showActions={true} // Edit/Delete buttons
                editable={true} // Modal Add/Edit
            />
        </div>
    );
}
