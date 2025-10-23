"use client"

// Styles
import styles from './genereate-qr-form.module.css';

// Icons
import { Link2, Mail, TextCursor, Wifi } from 'lucide-react';

// Components
import { useState } from 'react';

export default function GenerateQRForm() {
    const [selectedType, setSelectedType] = useState<'link' | 'text' | 'email' | 'wifi'>('link');

    const generateQR = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={generateQR} className={styles.form}>
            <div className={styles.selector}>
                <button
                    className={selectedType == "link" ? styles.selected : ""}
                    onClick={() => setSelectedType("link")}
                >
                    <Link2 size={24} color='#3454d1' />
                    Link
                </button>
                <button
                    className={selectedType == "text" ? styles.selected : ""}
                    onClick={() => setSelectedType("text")}
                >
                    <TextCursor size={24} color='#3454d1' />
                    Text
                </button>
                <button
                    className={selectedType == "email" ? styles.selected : ""}
                    onClick={() => setSelectedType("email")}
                >
                    <Mail size={24} color='#3454d1' />
                    Email
                </button>
                <button
                    className={selectedType == "wifi" ? styles.selected : ""}
                    onClick={() => setSelectedType("wifi")}
                >
                    <Wifi size={24} color='#3454d1' />
                    Wifi
                </button>
            </div>
        </form>
    )
}