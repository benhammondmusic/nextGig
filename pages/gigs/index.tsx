import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import A from "../../components/A";
import Btn from "../../components/Button";
// @ts-ignore
import { Database } from '../utils/database.types'
import { useRef, useState, useEffect } from 'react'
import Modal from "../../components/Modal";


export default function Gigs({ session }: { session: Session }) {

	// modal
	const focusModalButtonRef = useRef(null)
	const [modalOpen, setModalOpen] = useState(false)

	const supabase = useSupabaseClient<Database>()
	const user = useUser()

	const [loading, setLoading] = useState(true)
	const [gigs, setGigs] = useState<any[]>()
	const [venues, setVenues] = useState<any[]>()

	async function queryAllGigs() {
		try {
			setLoading(true)
			let { data, error, status } = await supabase
				.from('gigs')
				.select(`id, is_paid, amount_due`)
				.order('id')

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setGigs(data)
			}
		} catch (error) {
			// alert('Error loading user data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	async function queryAllVenues() {
		try {
			setLoading(true)
			let { data, error, status } = await supabase
				.from('venues')
				.select(`id, name, address`)
				.order('name')

			if (error && status !== 406) {
				throw error
			}
			if (data) {
				setVenues(data)
			}
		} catch (error) {
			// alert('Error loading user data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	async function addNewGig(gigInfo: any) {
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('gigs')
				.insert([
					{
						user_id: "4959fadc-9ff0-4244-b06a-8b1d85795d50",
						...gigInfo
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

	async function updateGigIsPaid(id: number, isPaid: boolean) {
		try {
			setLoading(true)
			await supabase
				.from('gigs')
				.update({ "is_paid": isPaid })
				.eq("id", id)
		}
		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllGigs()
		}
	}

	async function deleteGig(id: number) {
		try {
			setLoading(true)
			await supabase
				.from('gigs')
				.delete()
				.match({ id })
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
		queryAllVenues()
		console.log(venues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (<><div className={loading ? "!cursor-wait" : ""}>



		<h1 className="text-3xl my-2">Gigs!</h1>

		<section className="bg-slate-300 m-5 w-fit">

			<table className="table-auto">
				<thead>
					<tr className="bg-slate-200">
						<th className="text-start w-20"><b>#</b></th>
						<th className="text-start w-40"><b>Amount Due</b></th>
						<th className="text-start w-40"><b>Paid?</b></th>
						<th className="text-start w-40"><b>Delete Gig</b></th>
					</tr>
				</thead>
				<tbody>
					{gigs?.map((gig, i) => {

						const { id, amount_due, is_paid } = gig

						return <tr key={id} className={i % 2 ? "bg-slate-200" : ""}>
							<td className="">{id}</td>
							<td className="">${amount_due}</td>
							<td className="">{is_paid ? "✔️" : "𝙓"} <Btn loading={loading} size="xs" label={`Mark as ${!is_paid ? "paid" : "unpaid"}`} onClick={() => updateGigIsPaid(id, !is_paid)} /> </td>
							<td className=""><Btn loading={loading} label={"X"} onClick={() => deleteGig(gig["id"])} /></td>

						</tr>
					})}

				</tbody>

			</table>


		</section>
		{/* <Btn label="Add sample gig" onClick={() => addNewGig()} loading={loading} /> */}
		<Btn label="Add new gig(s)" onClick={() => setModalOpen(true)} />
		<A href="/" label="go home" />



	</div>

		<Modal addNewGig={addNewGig} open={modalOpen} setOpen={setModalOpen} focusButtonRef={focusModalButtonRef} venues={venues} />


	</>)

}






