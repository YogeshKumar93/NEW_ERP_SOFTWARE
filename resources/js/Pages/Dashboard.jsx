import { Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <div style={{ padding: 40 }}>
            <h1>Dashboard</h1>

            <Link
                href="/users"
                style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: 6,
                    marginTop: 20,
                }}
            >
                Manage Users
            </Link>
        </div>
    );
}
