'use client'

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import styles from "./forms.module.css";

export default function SignupForm() {
    const supabase = createClient();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });
    };

    return (
        <form onSubmit={signup}>
            <div className={styles.titles}>
                <h1>Create your free Scano account</h1>
                <h2>Start generating, customizing, and sharing QR codes instantly.</h2>
            </div>

            <div className={styles.formContainer}>
                {/* Username */}
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="John"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoCapitalize="none"
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
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
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
                            onChange={(e) => setPassword(e.target.value)}
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

                <button type="submit" className={styles.submitButton}>
                    Sign up
                </button>
            </div>

            <Link href="/login" className={styles.loginLink}>
                Already have an account? Log in instead
            </Link>
        </form>
    );
}
