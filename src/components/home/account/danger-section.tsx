'use client';

// Styles
import styles from './settings.module.css';

// Components
import SettingsItem from './settings-item/settings-item';
import SignOutButton from '@/components/auth/signout-button/signout-button';
import DeleteAccountButton from '@/components/auth/delete-account-button/delete-account-button';

export default function DangerSection() {
    return (
        <SettingsItem
            title="Danger Zone"
            description="Sign out or delete your account and all associated data."
            danger
        >
            <div className={styles.buttons}>
                <SignOutButton />
                <DeleteAccountButton />
            </div>
        </SettingsItem>
    )
}