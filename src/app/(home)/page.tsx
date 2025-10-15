import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import QRListSection from '@/components/home/sections/qr-list-section/qr-list-section';

export default async function Home() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main style={{
      display: 'flex',
      padding: 60,
      gap: 60
    }}>
      <QRListSection />
    </main>
  )
}