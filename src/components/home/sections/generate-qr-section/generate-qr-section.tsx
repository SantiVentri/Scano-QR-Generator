"use client"

// Styles
import styles from './generate-qr-section.module.css';

// Components
import GenerateQRForm from './form/genereate-qr-form';
import QRPreview from './preview/qr-preview';
import { useState } from 'react';

export default function GenerateQRSection() {
    const [qrImage, setQRImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1>Generate QR Code</h1>
                <GenerateQRForm setQRImage={setQRImage} setIsLoading={setIsLoading} />
            </div>
            <aside className={styles.previewAside}>
                <h2>Preview your code:</h2>
                <QRPreview qrImage={qrImage} isLoading={isLoading} />
            </aside>
        </section>
    )
}