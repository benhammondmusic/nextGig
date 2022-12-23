import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useSession } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'
import Layout from '../components/Layout'


function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const session = useSession()


  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
export default MyApp