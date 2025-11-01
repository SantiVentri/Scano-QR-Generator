'use client';

// Styles
import styles from './settings.module.css';

// Components
import SettingsItem from './settings-item/settings-item';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/ToastProvider';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordSettings() {
    const supabase = createClient();
    const { showToast } = useToast();

    // States
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d+!\?\u00BF\u00A1]{8,20}$/;

    const disabled = isLoading || !validPassword.test(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setErrorMessage(error.message);
            showToast('Failed to update password.', 'error');
        } else {
            showToast('Password updated successfully!', 'success');
        }
        setIsLoading(false);
    };

    return (
        <SettingsItem
            title="Change Password"
            description="Update your account password to keep your account secure."
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.passwordWrapper}>
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={isPasswordVisible ? "John123+" : "••••••••"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage("");
                        }}
                        disabled={isLoading}
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
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button
                    type='submit'
                    disabled={disabled}
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </SettingsItem>
    )
}