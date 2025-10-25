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
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9;

    const fetchCodes = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return setCodes([]);

        // Calculate total entries for pagination
        const { count } = await supabase
            .from("qr_codes")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .ilike("title", `%${search}%`);

        if (count) setTotalPages(Math.ceil(count / itemsPerPage));

        // Calculate range from current page
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage - 1;

        const { data, error } = await supabase
            .from("qr_codes")
            .select()
            .eq("user_id", user.id)
            .ilike("title", `%${search}%`)
            .range(start, end);

        if (!error) setCodes(data);
        else setCodes([]);
    };

    useEffect(() => {
        fetchCodes();
    }, [search, codes, page, fetchCodes]);

    const handlePageChange = (num: number) => {
        setPage(num);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1>QR Codes Generated</h1>
                <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // Resets after search
                    }}
                />
            </div>

            {codes.length === 0 ? (
                <p>No codes found</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div className={styles.grid}>
                        {codes.map((item, idx) => (
                            <QRCard key={idx} {...item} />
                        ))}
                    </div>
                    <div className={styles.pages}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                onClick={() => handlePageChange(num)}
                                className={`${styles.pageButton} ${page === num ? styles.active : ""}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </section>
    );
}