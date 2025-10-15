import styles from './alert.module.css';

interface AlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export default function Alert({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel"
}: AlertProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.alert} onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className={styles.alertButtons}>
                    <button
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
