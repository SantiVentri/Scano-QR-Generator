// Styles
import styles from './forgot-password.module.css';

// Components
import ForgotPasswordForm from '@/components/auth/forms/forgot-password';

export default function ForgotPasswordPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titles}>
                        <h1 className={styles.title}>Forgot your password?</h1>
                        <h2 className={styles.subtitle}>Enter your email address below and we'll send you instructions to reset your password.</h2>
                    </div>
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}