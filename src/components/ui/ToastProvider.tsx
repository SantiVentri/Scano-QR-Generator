"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import styles from "./toast.module.css";

type ToastType = "error" | "success" | "info";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToastInternal() {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const idCounterRef = useRef(0);

    const remove = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = `${Date.now()}-${idCounterRef.current++}`;
        const toast: Toast = { id, message, type };
        setToasts((prev) => [toast, ...prev]);
        // Auto-dismiss after 3s
        window.setTimeout(() => remove(id), 3000);
    }, [remove]);

    return { toasts, showToast, remove };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const { toasts, showToast, remove } = useToastInternal();

    const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Portal-like container at top-right */}
            <div className={styles.container} aria-live="polite" aria-atomic>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${styles.toast} ${styles[toast.type]} ${styles.show}`}
                        role="status"
                    >
                        <span className={styles.message}>{toast.message}</span>
                        <button
                            type="button"
                            aria-label="Dismiss"
                            className={styles.close}
                            onClick={() => remove(toast.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a ToastProvider");
    return ctx;
}


