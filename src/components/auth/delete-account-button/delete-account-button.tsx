'use client'

// Styles
import styles from "./delete-account-button.module.css";

// Components
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import Modal from "@/components/home/modal/modal";

export default function DeleteAccountButton() {
    const supabase = createClient();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const deleteAccount = async () => {
        setIsLoading(true);
        const { error } = await supabase.rpc('delete_account');

        if (error) {
            showToast("Error deleting account. Please try again.", "error");
            setIsLoading(false);
            return;
        }

        showToast("Account deleted successfully!", "success");
        redirect("/auth/login")
    }

    return (
        <>
            <button
                className={styles.button}
                onClick={() => setShowAlert(true)}
            >
                {isLoading ? "Deleting account..." : "Delete Account"}
            </button>
            <Modal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={deleteAccount}
                title="Confirm delete"
                message="Are you sure you want to delete your account? This action is irreversible."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    )
}