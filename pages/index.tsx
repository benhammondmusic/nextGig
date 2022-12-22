import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Gigs from './gigs'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div  >
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