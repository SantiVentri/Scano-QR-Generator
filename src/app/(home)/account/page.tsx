// Styles
import styles from './account.module.css';

// Components
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ChangeUsernameSettings from '@/components/home/account/change-username';
import ChangePasswordSettings from '@/components/home/account/change-password';
import DangerSection from '@/components/home/account/danger-section';

export default async function AccountPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/login');
    }

    const name = user?.user_metadata?.display_name || null;

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome back{name ? `, ${name}!` : "!"}</h1>
                <div className={styles.settings}>
                    <ChangeUsernameSettings />
                    <ChangePasswordSettings />
                    <DangerSection />
                </div>
            </div>
        </main>
    )
}