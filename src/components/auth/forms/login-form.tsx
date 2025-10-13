'use client'

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        await supabase.auth.signInWithPassword({ email, password });
    };

    return (
        <form onSubmit={login}>
            <div className="titles">
                <h1>Welcome back to Scano</h1>
                <h2>Access your account and keep creating smart QR codes in seconds.</h2>
            </div>

            <div className="formContainer">
                {/* Email */}
                <div className="inputContainer">
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
                <div className="inputContainer passwordContainer">
                    <label htmlFor="password">Password</label>
                    <div className="passwordWrapper">
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
                            className="togglePassword"
                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="submitButton">Log in</button>
            </div>

            <Link href="/signup" className="signupLink">
                Don’t have an account? Sign up instead
            </Link>
        </form>
    );
}