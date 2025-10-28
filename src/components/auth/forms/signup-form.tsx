'use client'

// Styles
import styles from "./forms.module.css";

// Components
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Alert from "@/components/ui/alerts/alert";

export default function SignupForm() {
    const supabase = createClient();

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: username,
                },
            },
        });

        setIsLoading(false);
        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccess(true);
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (signInError) {
                setErrorMessage(signInError.message);
            } else {
                redirect("/");
            }
        }
    };

    return (
        <form onSubmit={signup} className={styles.form}>
            {/* Username */}
            <div className={styles.inputContainer}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="John"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorMessage("");
                    }}
                    autoCapitalize="none"
                    disabled={isLoading || success}
                    required
                />
            </div>

            {/* Email */}
            <div className={styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage("");
                    }}
                    autoComplete="email"
                    disabled={isLoading || success}
                    required
                />
            </div>

            {/* Password */}
            <div className={`${styles.inputContainer} ${styles.passwordContainer}`}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder={isPasswordVisible ? "John123+" : "••••••••"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage("");
                        }}
                        disabled={isLoading || success}
                        required
                    />
                    <button
                        type="button"
                        className={styles.togglePassword}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                        disabled={isLoading || success}
                    >
                        {isPasswordVisible ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>

            {errorMessage && <Alert type="error" text={errorMessage} />}
            {success && <Alert type="success" text="Successfull signup! Redirecting...." />}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || success}
            >
                {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <Link href="/login" className={styles.insteadLink}>
                Already have an account? Log in instead
            </Link>

        </form >
    );
}
