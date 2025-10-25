"use client"

import Image from 'next/image';
import styles from './qr-preview.module.css';

interface QRPreviewProps {
    qrImage: string | null;
    isLoading: boolean;
}

export default function QRPreview({ qrImage, isLoading }: QRPreviewProps) {
    return (
        <div className={styles.previewContainer}>
            {isLoading ? (
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Generating QR code...</p>
                </div>
            ) : qrImage ? (
                <div className={styles.qrContainer}>
                    <Image
                        src={qrImage}
                        alt="Generated QR Code"
                        width={250}
                        height={250}
                        className={styles.qrImage}
                    />
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>Fill the form to generate your QR code</p>
                </div>
            )}
        </div>
    );
}