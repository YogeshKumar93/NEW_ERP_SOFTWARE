// resources/js/Components/PaginatedTable.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useForm, router } from "@inertiajs/react";
import debounce from "lodash.debounce";
import useToast from "@/Helpers/useToast";
import Toast from "./Toast";

export default function PaginatedTable({
    endpoint, // "/users", "/orders", etc.
    columns, // [{ key: 'name', label: 'Name', render: (row)=>... }]
    showActions = true, // Edit/Delete buttons
    editable = true, // enable add/edit modal
    perPage = 10, // backend pagination
}) {
    const [rows, setRows] = useState([]);
    const [links, setLinks] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const { toast, showToast } = useToast();
    const { data, setData, post, put, reset, errors, clearErrors } = useForm(
        {},
    );

    // ----------- FETCH DATA -----------
    const fetchData = useCallback(() => {
        router.get(
            endpoint,
            { page, search, per_page: perPage },
            {
                preserveState: true,
                replace: true,
                // onSuccess in fetchData
                onSuccess: (pageData) => {
                    console.log("pageData", pageData.props);

                    const rowsData =
                        pageData.props.rows || pageData.props.data || [];
                    // reset rows completely
                    setRows(Array.isArray(rowsData) ? rowsData : []);

                    const linksData = pageData.props.links || [];
                    setLinks(Array.isArray(linksData) ? linksData : []);
                },
            },
        );
    }, [endpoint, page, search, perPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ----------- DEBOUNCE SEARCH -----------
    const handleSearch = useCallback(
        debounce((value) => {
            setPage(1); // reset page
            setSearch(value);
        }, 500),
        [],
    );

    // ----------- MODAL HANDLERS -----------
    const openAddModal = () => {
        reset();
        setEditingRow(null);
        setShowModal(true);
    };

    const openEditModal = (row) => {
        setEditingRow(row);
        setData(row);
        setShowModal(true);
    };

    const closeModal = () => {
        reset();
        setShowModal(false);
    };
    const submit = (e) => {
        e.preventDefault();

        if (editingRow) {
            put(`${endpoint}/${editingRow.id}`, {
                onSuccess: (page) => {
                    closeModal();
                    if (page.props.toast) {
                        showToast(page.props.toast);
                    }
                    fetchData();
                },
            });
        } else {
            post(endpoint, {
                onSuccess: (page) => {
                    closeModal();
                    if (page.props.toast) {
                        showToast(page.props.toast);
                    }
                    fetchData();
                },
            });
        }
    };

    const deleteRow = (id) => {
        if (!confirm("Are you sure?")) return;

        router.delete(`${endpoint}/${id}`, {
            preserveScroll: true,

            onSuccess: (page) => {
                if (page.props.toast) {
                    showToast(page.props.toast);
                }
                fetchData();
            },

            onError: () => {
                showToast({
                    type: "error",
                    message: "Delete failed",
                });
            },
        });
    };

    return (
        <div className="p-4 bg-gray-50 rounded shadow">
            {/* SEARCH + ADD BUTTON */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded w-64"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {editable && (
                    <button
                        onClick={openAddModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add
                    </button>
                )}
            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="p-2 text-left">
                                {col.label}
                            </th>
                        ))}
                        {showActions && (
                            <th className="p-2 text-left">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (showActions ? 1 : 0)}
                                className="p-6 text-center text-gray-500"
                            >
                                No data found
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                {columns.map((col) => (
                                    <td key={col.key} className="p-2">
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}
                                {showActions && (
                                    <td className="p-2 space-x-2">
                                        {editable && (
                                            <button
                                                className="text-blue-600"
                                                onClick={() =>
                                                    openEditModal(row)
                                                }
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            className="text-red-600"
                                            onClick={() => deleteRow(row.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex gap-2 mt-4">
                {Array.isArray(links) &&
                    links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={(e) => {
                                e.preventDefault();
                                const url = new URL(link.url);
                                const newPage = url.searchParams.get("page");
                                setPage(Number(newPage)); // 🔥 triggers fetchData
                            }}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
            </div>

            {/* MODAL */}
            {editable && showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingRow ? "Edit" : "Add"} Item
                        </h2>
                        {errors && Object.keys(errors).length > 0 && (
                            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-3">
                                <ul className="list-disc list-inside text-sm">
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>{message}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-3">
                            {columns.map((col) => (
                                <div key={col.key}>
                                    <input
                                        placeholder={col.label}
                                        className={`border p-2 w-full rounded ${
                                            errors[col.key]
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data[col.key] || ""}
                                        onChange={(e) =>
                                            setData(col.key, e.target.value)
                                        }
                                        disabled={col.readOnly}
                                    />

                                    {errors[col.key] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors[col.key]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                    {editingRow ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* TOAST */}
            <Toast message={toast.message} type={toast.type} />
        </div>
    );
}
