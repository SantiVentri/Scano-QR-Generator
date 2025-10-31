// Styles
import { createClient } from '@/utils/supabase/server';
import styles from './nav.module.css';

// Components
import Link from 'next/link';
import React from 'react';
import { UserCircle2 } from 'lucide-react';

export default async function Nav() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    const username = user?.user_metadata?.display_name || null;

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <h1>Scano QR Generator</h1>
            </Link>
            <Link href="/account" className={styles.accountLink}>
                <UserCircle2 size={28} />
                <p>
                    {username ? username : 'Account'}
                </p>
            </Link>
        </nav>
    )
}