'use client'

// Styles
import styles from "./delete-account-button.module.css";

// Components
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function DeleteAccountButton() {
    const supabase = createClient();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const deleteAccount = async () => {
        setIsLoading(true);
        const { error } = await supabase.rpc('delete_user_account');

        if (error) {
            showToast("Error deleting account. Please try again.", "error");
            setIsLoading(false);
            return;
        }

        redirect("/auth/login")
    }

    return (
        <button
            className={styles.button}
            onClick={deleteAccount}
        >
            {isLoading ? "Deleting account..." : "Delete Account"}
        </button>
    )
}