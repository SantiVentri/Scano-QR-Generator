// Styles
import styles from '../auth.module.css';

// Components
import LoginForm from '@/components/auth/forms/login-form';

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <aside></aside>
            <div className={styles.container}>
                <LoginForm />
            </div>
        </div>
    )
}