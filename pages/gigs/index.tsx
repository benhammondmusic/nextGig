import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// @ts-ignore
import { Database } from '../utils/database.types'



export default function Gigs({ session }: { session: Session }) {

	const supabase = useSupabaseClient<Database>()
	const user = useUser()

	const [loading, setLoading] = useState(true)
	const [gigs, setGigs] = useState<any[]>()


	useEffect(() => {
		async function queryAllGigs() {
			try {
				setLoading(true)
				if (!user) return <></>

				let { data, error, status } = await supabase
					.from('gigs')
					.select(`id, is_paid, amount_due`)

				if (error && status !== 406) {
					throw error
				}

				if (data) {
					console.log("Success!", data);
					setGigs(data)
				}
			} catch (error) {
				// alert('Error loading user data!')
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		queryAllGigs()
	}, [session, supabase, user])

	return <>
		<h1>Gigs!</h1>
		{gigs?.map((gig) => {
			return <div key={gig.id}>
				<p><b>Amount Due:</b> ${gig["amount_due"]} <b>Paid In Full:</b> {gig["is_paid"] ? "Yes" : "No"}</p>
			</div>
		})}
		<Link href="/">go home</Link>
	</>
}