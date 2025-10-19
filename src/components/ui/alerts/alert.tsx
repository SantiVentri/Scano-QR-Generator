// Styles
import styles from "./alert.module.css";

interface AlertProps {
    type: "success" | "error";
    text: string;
}

export default function Alert({ type, text }: AlertProps) {
    return (
        <div className={`${styles.alert} ${type === "success" ? styles.alertSuccess : styles.alertError}`}>
            <p>{text}</p>
        </div>
    )
}