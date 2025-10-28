// Styles
import Image from 'next/image';
import styles from './forgot-password.module.css';

// Components
import ForgotPasswordForm from '@/components/auth/forms/forgot-password';

export default function ForgotPasswordPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.icon}>
                        <Image
                            src={"/icons/lock.png"}
                            width={40}
                            height={40}
                            alt="Lock Icon"
                            draggable={false}
                        />
                    </div>
                    <div className={styles.titles}>
                        <h1 className={styles.title}>Forgot your password?</h1>
                        <h2 className={styles.subtitle}>Enter your email below and read the instructions to reset your password.</h2>
                    </div>
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}