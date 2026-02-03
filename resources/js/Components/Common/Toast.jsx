import React, { useEffect, useState } from "react";

export default function Toast({ message, type }) {
    if (!message) return null;

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div
            className={`${bgColor} fixed top-4 right-4 text-white px-4 py-2 rounded shadow`}
        >
            {message}
        </div>
    );
}
