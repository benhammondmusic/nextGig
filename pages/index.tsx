import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

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
        <Account session={session} />
      )}
    </div>
  )
}

export default Home