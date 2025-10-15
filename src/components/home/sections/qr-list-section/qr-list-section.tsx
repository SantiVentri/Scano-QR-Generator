'use client'

import { useEffect, useState } from 'react';
import styles from './qr-list-section.module.css';
import { createClient } from '@/utils/supabase/client';
import QRCard from './card/card';

interface QRProps {
    code_id: string;
    qr_image: string;
    title: string;
    description: string;
}

export default function QRListSection() {
    const supabase = createClient();
    const [codes, setCodes] = useState<QRProps[]>([]);

    const fetchCodes = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            setCodes([]);
            return;
        }

        const { data, error } = await supabase
            .from("qr_codes")
            .select()
            .eq("user_id", user.id)
            .limit(9)

        if (!error) {
            setCodes(data)
        } else {
            setCodes([])
        }
    }

    useEffect(() => {
        fetchCodes();
    }, [codes])

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1>QR Codes Generated</h1>
                <input type="search" placeholder="Search" />
            </div>

            {codes.length == 0 ? (
                <p>No codes found</p>
            ) : (
                <div className={styles.grid}>
                    {codes.map((item, idx) => (
                        <QRCard key={idx} {...item} />
                    ))}
                </div>
            )}
        </section >
    )
}