import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ categories, allCategories }) {

    const { data, setData, post, reset } = useForm({
        name: "",
        parent_id: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("stock-categories.store"), {
            onSuccess: () => reset()
        });
    };

    const renderCategories = (categories, level = 0) => {
    return categories.map((cat) => (
        <React.Fragment key={cat.id}>
            <tr>
                <td
                    className="p-2"
                    style={{ paddingLeft: `${level * 20}px` }}
                >
                    {cat.name}
                </td>
            </tr>

            {cat.children_recursive &&
                renderCategories(cat.children_recursive, level + 1)}
        </React.Fragment>
    ));
};


    return (
        <AppLayout>

            <h2 className="text-xl font-bold mb-4">Stock Categories</h2>

            {/* ADD FORM */}
            <form onSubmit={handleSubmit} className="mb-6">

                <input
                    type="text"
                    placeholder="Category Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="border p-2 mr-2"
                />

                <select
                    value={data.parent_id}
                    onChange={(e) => setData("parent_id", e.target.value)}
                    className="border p-2 mr-2"
                >
                    <option value="">Primary</option>

                    {allCategories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Save
                </button>
            </form>

            {/* TABLE */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Category Name</th>
                    </tr>
                </thead>

                <tbody>
                    {categories && renderCategories(categories)}
                </tbody>
            </table>

        </AppLayout>
    );
}
