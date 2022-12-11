import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import A from "../../components/A";
import Button from "../../components/Button";
// @ts-ignore
import { Database } from '../utils/database.types'



export default function Gigs({ session }: { session: Session }) {

	const supabase = useSupabaseClient<Database>()
	const user = useUser()

	const [loading, setLoading] = useState(true)
	const [gigs, setGigs] = useState<any[]>()

	async function queryAllGigs() {
		try {
			setLoading(true)


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

	async function addNewGig() {
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('gigs')
				.insert([
					{
						user_id: "4959fadc-9ff0-4244-b06a-8b1d85795d50",
						amount_due: Math.floor(Math.random() * 10_000),
					}
				])
		}
		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllGigs()
		}
	}


	useEffect(() => {
		if (user) queryAllGigs()
	}, [user])

	return <>
		<h1 className="text-3xl my-2">Gigs!</h1>

		<section className="bg-slate-300 m-5 w-fit">

			<table className="table-auto">
				<thead>
					<tr className="bg-slate-200">
						<th className="text-start w-20"><b>#</b></th>
						<th className="text-start w-40"><b>Amount Due</b></th>
						<th className="text-start w-40"><b>Paid?</b></th>
					</tr>
				</thead>
				<tbody>
					{gigs?.map((gig, i) => {
						return <tr key={gig["id"]} className={i % 2 ? "bg-slate-200" : ""}>
							<td className="">{gig["id"]}</td>
							<td className="">${gig["amount_due"]}</td>
							<td className="">{gig["is_paid"] ? "Yes" : "No"}</td>
						</tr>
					})}
				</tbody>

			</table>


		</section>
		<Button label="Add sample gig" onClick={() => addNewGig()} />
		<A href="/" label="go home" />
	</>

}