// Styles
import Image from 'next/image';
import styles from '../auth.module.css';

// Components
import LoginForm from '@/components/auth/forms/login-form';

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <aside></aside>
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
                        <h1>Welcome back to Scano</h1>
                        <h2>Access your account and keep creating <br /> smart QR codes in seconds.</h2>
                    </div>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}