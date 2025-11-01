// React
import type { ReactNode } from 'react';

// Styles
import styles from './settings-item.module.css';

interface SettingsItemProps {
    children?: ReactNode;
    title: string;
    description: string;
    danger?: boolean;
}

export default function SettingsItem({ children, title, description, danger }: SettingsItemProps) {
    return (
        <div className={`${styles.settingsItem} ${danger ? styles.danger : ''}`}>
            <div className={styles.itemTitles}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className={styles.itemAction}>
                {children}
            </div>
        </div>
    )
}