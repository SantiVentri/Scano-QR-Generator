// Styles
import styles from '../auth.module.css';

// Components
import SignupForm from '@/components/auth/forms/signup-form';

export default function SignupPage() {
    return (
        <div className={styles.page}>
            <aside></aside>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titles}>
                        <h1>Create your free Scano account</h1>
                        <h2>Start generating, customizing, and sharing <br /> QR codes instantly.</h2>
                    </div>
                </div>
                <SignupForm />
            </div>
        </div>
    )
}