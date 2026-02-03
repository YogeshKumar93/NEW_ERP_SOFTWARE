import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function useToast() {
    const { props } = usePage(); // get Inertia props
    const [toast, setToast] = useState({
        type: "",
        message: "",
    });

    useEffect(() => {
        if (props?.toast) {
            setToast(props.toast);

            // Auto clear after 3 seconds
            setTimeout(() => setToast({ type: "", message: "" }), 3000);
        }
    }, [props.toast]);

    const showToast = (toastData) => {
        setToast(toastData);
        setTimeout(() => setToast({ type: "", message: "" }), 3000);
    };

    return { toast, showToast };
}
