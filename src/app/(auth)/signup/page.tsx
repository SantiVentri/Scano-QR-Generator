// Styles
import styles from '../auth.module.css';

// Components
import SignupForm from '@/components/auth/forms/signup-form';

export default function SignupPage() {
    return (
        <div className={styles.page}>
            <aside></aside>
            <div className={styles.container}>
                <SignupForm />
            </div>
        </div>
    )
}