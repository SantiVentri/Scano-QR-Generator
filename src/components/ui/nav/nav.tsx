import Link from 'next/link';
import styles from './nav.module.css';
import { UserCircle2 } from 'lucide-react';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <h1>Scano QR Generator</h1>
            </Link>
            <Link href="/account" className={styles.link}>
                <UserCircle2 size={34} color='#3454d1' />
            </Link>
        </nav>
    )
}