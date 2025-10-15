import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.titles}>
                    <h1>Scano QR Code Generator</h1>
                    <h2>Free, Fast, Forever</h2>
                </div>
                <nav>
                    <div className={styles.navList}>
                        <h4>Pages</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/account">Account</Link></li>
                            <li><Link href="/faqs">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className={styles.navList}>
                        <h4>Follow me</h4>
                        <ul>
                            <li><Link href="https://x.com/santiventri" target="_blank">X.com</Link></li>
                            <li><Link href="https://linkedin.com/in/santinoventrice" target="_blank">LinkedIn</Link></li>
                            <li><Link href="https://github.com/santiventri" target="_blank">Github</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={styles.footerEnd}>
                <p>Designed and developed by Santino Ventrice</p>
                <div>
                    <p>Version 0.1</p>
                </div>
            </div>
        </footer>
    )
}