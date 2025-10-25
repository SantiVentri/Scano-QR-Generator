import styles from './page.module.css';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import QRListSection from '@/components/home/sections/qr-list-section/qr-list-section';
import GenerateQRSection from '@/components/home/sections/generate-qr-section/generate-qr-section';

export default async function Home() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className={styles.main}>
      <GenerateQRSection />
      <QRListSection />
    </main>
  )
}