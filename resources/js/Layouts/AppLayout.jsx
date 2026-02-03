import { usePage } from "@inertiajs/react";
import Toast from "@/Components/Common/Toast";

export default function AppLayout({ children }) {
    const { toast } = usePage().props;

    return (
        <>
            {children}
            {toast && (
                <Toast
                    message={toast.message || toast.errors}
                    type={toast.type}
                />
            )}
        </>
    );
}
