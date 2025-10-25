// Styles
import styles from './nav.module.css';

// Components
import Link from 'next/link';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <h1>Scano QR Generator</h1>
            </Link>
        </nav>
    )
}