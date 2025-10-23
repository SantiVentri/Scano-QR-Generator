// Styles
import styles from './generate-qr-section.module.css';

// Components
import GenerateQRForm from './form/genereate-qr-form';

export default function GenerateQRSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1>Generate QR Code</h1>
                <GenerateQRForm />
            </div>
            <aside>
                <h2>Preview your code:</h2>
            </aside>
        </section>
    )
}