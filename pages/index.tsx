import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Gigs from './gigs'
import Head from 'next/head'

function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      <Head>
        <title>NextGig</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!session ? (
        <div className='flex justify-center'>
          <Auth supabaseClient={supabase} />
        </div>
      ) : (
        <Gigs session={session} />
      )}
    </div>
  )
}

export default Home