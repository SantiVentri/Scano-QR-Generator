"use client"

import { createClient } from '@/utils/supabase/client';
// Styles
import styles from './genereate-qr-form.module.css';

// Icons
import { Link2, Mail, TextCursor, Wifi } from 'lucide-react';

// Components
import { useState } from 'react';

interface GenerateQRFormProps {
    setQRImage: (image: string | null) => void;
    setIsLoading: (loading: boolean) => void;
}

export default function GenerateQRForm({ setQRImage, setIsLoading }: GenerateQRFormProps) {
    const supabase = createClient();
    const [selectedType, setSelectedType] = useState<'link' | 'text' | 'email' | 'wifi'>('link');
    const [isLoading, setIsLoadingLocal] = useState(false);

    const saveQR = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('qr_codes')
            .insert([
                {
                    user_id: user?.id,
                    title: {},
                },
            ]);
    }

    const generateQR = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsLoadingLocal(true);

        const formData = new FormData(e.currentTarget);
        let qrData = '';

        try {
            switch (selectedType) {
                case 'link':
                    qrData = formData.get('link-url') as string;
                    break;
                case 'text':
                    qrData = formData.get('text-content') as string;
                    break;
                case 'email': {
                    const to = formData.get('email-to');
                    const subject = formData.get('email-subject');
                    const body = formData.get('email-body');
                    qrData = `mailto:${to}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body as string)}`;
                    break;
                }
                case 'wifi': {
                    const ssid = formData.get('wifi-ssid');
                    const password = formData.get('wifi-password');
                    const encryption = formData.get('wifi-encryption');
                    qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
                    break;
                }
            }

            // Aquí irá la llamada a la API para generar el QR
            // Por ahora usaremos una API pública para demo
            const foregroundColor = (formData.get('foreground-color') as string).substring(1);
            const backgroundColor = (formData.get('background-color') as string).substring(1);

            const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=250x250&color=${foregroundColor}&bgcolor=${backgroundColor}&margin=20`);

            if (!response.ok) throw new Error('Failed to generate QR code');

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setQRImage(imageUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
            setQRImage(null);
        } finally {
            setIsLoading(false);
            setIsLoadingLocal(false);
        }
    }

    return (
        <div className={styles.formContainer}>

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
            {selectedType === 'link' && (
                <form onSubmit={generateQR} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="link-url">Link:</label>
                        <input
                            type="url"
                            id="link-url"
                            name="link-url"
                            placeholder="https://example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="qr-title">QR Code Title:</label>
                        <input
                            type="text"
                            id="qr-title"
                            name="qr-title"
                            placeholder="My personal website"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.colorsInput}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="foreground-color">QR Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="foreground-color"
                                    name="foreground-color"
                                    defaultValue="#000000"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="background-color">Background Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="background-color"
                                    name="background-color"
                                    defaultValue="#FFFFFF"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </form>
            )}
            {selectedType === 'text' && (
                <form onSubmit={generateQR} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="qr-title">QR Code Title:</label>
                        <input
                            type="text"
                            id="qr-title"
                            name="qr-title"
                            placeholder="Text note"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="text-content">Text Content:</label>
                        <textarea
                            id="text-content"
                            name="text-content"
                            placeholder="Enter your text here"
                            required
                            disabled={isLoading}
                            rows={4}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.colorsInput}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="foreground-color">QR Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="foreground-color"
                                    name="foreground-color"
                                    defaultValue="#000000"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="background-color">Background Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="background-color"
                                    name="background-color"
                                    defaultValue="#FFFFFF"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </form>
            )}
            {selectedType === 'email' && (
                <form onSubmit={generateQR} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="qr-title">QR Code Title:</label>
                        <input
                            type="text"
                            id="qr-title"
                            name="qr-title"
                            placeholder="Text note"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email-to">To:</label>
                        <input
                            type="email"
                            id="email-to"
                            name="email-to"
                            placeholder="recipient@example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email-subject">Subject:</label>
                        <input
                            type="text"
                            id="email-subject"
                            name="email-subject"
                            placeholder="Email subject"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email-body">Message:</label>
                        <textarea
                            id="email-body"
                            name="email-body"
                            placeholder="Enter your message here"
                            required
                            disabled={isLoading}
                            rows={4}
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.colorsInput}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="foreground-color">QR Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="foreground-color"
                                    name="foreground-color"
                                    defaultValue="#000000"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="background-color">Background Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="background-color"
                                    name="background-color"
                                    defaultValue="#FFFFFF"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </form>
            )}
            {selectedType === 'wifi' && (
                <form onSubmit={generateQR} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="qr-title">QR Code Title:</label>
                        <input
                            type="text"
                            id="qr-title"
                            name="qr-title"
                            placeholder="WiFi connection"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="wifi-ssid">Network Name (SSID):</label>
                        <input
                            type="text"
                            id="wifi-ssid"
                            name="wifi-ssid"
                            placeholder="WiFi network name"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="wifi-password">Password:</label>
                        <input
                            type="password"
                            id="wifi-password"
                            name="wifi-password"
                            placeholder="WiFi password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="wifi-encryption">Encryption Type:</label>
                        <select
                            id="wifi-encryption"
                            name="wifi-encryption"
                            required
                            disabled={isLoading}
                            className={styles.select}
                        >
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">No encryption</option>
                        </select>
                    </div>
                    <div className={styles.colorsInput}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="foreground-color">QR Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="foreground-color"
                                    name="foreground-color"
                                    defaultValue="#000000"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="background-color">Background Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    id="background-color"
                                    name="background-color"
                                    defaultValue="#FFFFFF"
                                    disabled={isLoading}
                                />
                                <span className={styles.colorPreview}></span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </form>
            )}
        </div>
    )
}