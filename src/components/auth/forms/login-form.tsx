'use client'

// Styles
import styles from "./forms.module.css";

// Components
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";

export default function LoginForm() {
    const supabase = createClient();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => {
                redirect("/")
            }, 2000);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={login} className={styles.form}>
            <div className={styles.formContainer}>
                {/* Email */}
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
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
                        required
                    />
                    <Link href="/forgot-password" className={styles.forgotPasswordLink}>
                        Forgot password?
                    </Link>
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
                                setPassword(e.target.value),
                                    setErrorMessage("");
                            }}
                            required
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <button type="submit" className={styles.submitButton}>
                    {isLoading ? "Logging in..." : "Log In"}
                </button>
            </div>

            <Link href="/signup" className={styles.signupLink}>
                Don’t have an account? Sign up instead
            </Link>
        </form>
    );
}