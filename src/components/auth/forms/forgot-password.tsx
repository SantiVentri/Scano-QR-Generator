'use client'

// Styles
import styles from './forms.module.css';

// Components
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import Alert from '@/components/ui/alerts/alert';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const supabase = createClient();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const sendResetEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccess(true);
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={sendResetEmail} className={styles.form}>
            {/* Email */}
            <div className={styles.inputContainer}>
                <input
                    type="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value),
                            setErrorMessage("");
                    }}
                    autoComplete="email"
                    disabled={isLoading || success}
                    required
                />
            </div>

            {errorMessage && <Alert type="error" text={errorMessage} />}

            {success && <Alert type="success" text="Mail sent! Check your inbox." />}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || success}
            >
                {isLoading ? "Sending mail..." : "Send mail"}
            </button>

            <Link href="/login" className={styles.insteadLink}>
                Go back to login
            </Link>
        </form>
    )
}