import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
// @ts-ignore
import { Database } from '../utils/database.types'
// import Avatar from './Avatar'
import Link from 'next/link'
import Button from './Button'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>()
	const user = useUser()
	const [loading, setLoading] = useState(true)
	const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

	useEffect(() => {
		async function getProfile() {
			try {
				setLoading(true)
				if (!user) throw new Error('No user')

				let { data, error, status } = await supabase
					.from('profiles')
					.select(`avatar_url`)
					.eq('id', user.id)
					.single()

				if (error && status !== 406) {
					throw error
				}

				if (data) {
					setAvatarUrl(data.avatar_url)
				}
			} catch (error) {
				alert('Error loading user data!')
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getProfile()
	}, [session, supabase, user])



	async function updateProfile({
		avatar_url,
	}: {
		avatar_url: Profiles['avatar_url']
	}) {
		try {
			setLoading(true)
			if (!user) throw new Error('No user')

			const updates = {
				id: user.id,
				avatar_url,
				updated_at: new Date().toISOString(),
			}

			let { error } = await supabase.from('profiles').upsert(updates)
			if (error) throw error
			alert('Profile updated!')
		} catch (error) {
			alert('Error updating the data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="">
			{/* {user && <Avatar
				uid={user.id}
				url={avatar_url}
				size={150}
				onUpload={(url) => {
					setAvatarUrl(url)
					updateProfile({ avatar_url: url })
				}}
			/>} */}
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>
			<div>
				<button
					className=""
					onClick={() => updateProfile({ avatar_url })}
					disabled={loading}
				>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</div>

			<Link href="/gigs">view gigs</Link>


			<div>
				<Button onClick={() => supabase.auth.signOut()} label={"Sign Out"} />

			</div>
		</div>
	)
}