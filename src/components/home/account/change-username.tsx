'use client';

// Styles
import styles from './settings.module.css';

// Components
import SettingsItem from './settings-item/settings-item';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/ToastProvider';

export default function ChangeUsernameSettings() {
    const supabase = createClient();
    const { showToast } = useToast();

    // States
    const [currentUsername, setCurrentUsername] = useState('');
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validUsername = /^[a-zA-Z0-9_]{3,20}$/;

    const disabled = isLoading || username === currentUsername || !validUsername.test(username);

    const fetchUserData = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            showToast('Error fetching user data.', 'error');
            return null;
        }

        setCurrentUsername(user?.user_metadata?.display_name || '');
        setUsername(user?.user_metadata?.display_name || '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.updateUser({
            data: { display_name: username }
        });

        if (error) {
            setErrorMessage(error.message);
            showToast('Failed to update username.', 'error');
        } else {
            setCurrentUsername(username);
            showToast('Username updated successfully!', 'success');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <SettingsItem
            title="Change Username"
            description="Update your current username."
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value),
                            setErrorMessage("");
                    }}
                    placeholder="e.g: John"
                />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button
                    type='submit'
                    disabled={disabled}
                >
                    {isLoading ? 'Updating...' : 'Update Username'}
                </button>
            </form>
        </SettingsItem>
    )
}