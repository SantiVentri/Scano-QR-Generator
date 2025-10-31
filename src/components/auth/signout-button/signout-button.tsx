'use client'

// Styles
import styles from "./signout-button.module.css";

// Components
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function SignOutButton() {
    const supabase = createClient();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const signOut = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();

        if (error) {
            showToast("Error signing out. Please try again.", "error");
            setIsLoading(false);
            return;
        }

        redirect("/auth/login")
    }

    return (
        <button
            className={styles.button}
            onClick={signOut}
        >
            {isLoading ? "Signing out..." : "Sign Out"}
        </button>
    )
}