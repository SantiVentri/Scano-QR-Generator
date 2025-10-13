'use client'

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function SignOutButton() {
    const supabase = createClient();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            redirect("/auth/login")
        }
    }

    return (
        <button onClick={signOut}>Sign out</button>
    )
}