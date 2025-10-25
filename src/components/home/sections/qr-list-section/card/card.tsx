import Image from 'next/image';
import styles from './card.module.css';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import Alert from '../alert/alert';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/ToastProvider';

interface QRCardProps {
    code_id: string;
    qr_image: string;
    title: string;
}

export default function QRCard({ code_id, qr_image, title }: QRCardProps) {
    const supabase = createClient();
    const [showAlert, setShowAlert] = useState(false);
    const { showToast } = useToast();

    const handleDeleteClick = () => {
        setShowAlert(true);
    };

    const handleConfirmDelete = async () => {
        const { error } = await supabase
            .from("qr_codes")
            .delete()
            .eq("code_id", code_id)
            .limit(1)
            .select();

        if (error) {
            showToast("Error deleting code", "error");
        } else {
            setShowAlert(false);
            showToast("Code deleted successfully", "success");
        }
    };

    return (
        <div className={styles.card}>
            {qr_image ? (
                <Image
                    src={qr_image}
                    height={140}
                    width={140}
                    alt={`QR Code image for ${title}`}
                    draggable={false}
                />
            ) : <div style={{ height: 140, width: 140, backgroundColor: "#3454d1" }} />}

            <div className={styles.container}>
                <h1>{title}</h1>
                <div className={styles.buttons}>
                    <button type="button" className={styles.downloadButton} onClick={(e) => {
                        e.preventDefault();
                        fetch(qr_image)
                            .then(res => res.blob())
                            .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = title ? `${title}.png` : "qr-code.png";
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                                window.URL.revokeObjectURL(url);
                            });
                    }}>
                        Download QR
                    </button>
                    <button type="button" className={styles.trashButton} onClick={handleDeleteClick}>
                        <Trash2 color='white' size={25} />
                    </button>
                </div>
            </div>
            <Alert
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm delete"
                message="Are you sure you want to delete this QR code? This action is irreversible."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div >
    )
}