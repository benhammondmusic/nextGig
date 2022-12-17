import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import BenButton from "../../components/BenButton";
// @ts-ignore
import { Database } from '../utils/database.types'
import { useRef, useState, useEffect } from 'react'
import Modal from "../../components/Modal";
import BenLink from "../../components/BenLink";


export default function Gigs({ session }: { session: Session }) {

	// modal
	const focusModalButtonRef = useRef(null)
	const [modalOpen, setModalOpen] = useState(false)

	const supabase = useSupabaseClient<Database>()
	const user = useUser()
	const [loading, setLoading] = useState(true)
	const [gigs, setGigs] = useState<any[]>()
	const [venues, setVenues] = useState<any[]>()
	const [clients, setClients] = useState<any[]>()

	async function queryAllGigs() {
		try {
			setLoading(true)
			let { data, error, status } = await supabase
				.from('gigs')
				.select(`id, is_paid, amount_due, start, end, venue, client`)
				.order('start')

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setGigs(data)
			}
		} catch (error) {
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

	async function queryAllClients() {
		try {
			setLoading(true)
			let { data, error, status } = await supabase
				.from('clients')
				.select(`id, name, address, email, phone`)
				.order('name')

			if (error && status !== 406) {
				throw error
			}
			if (data) {
				setClients(data)
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

	async function addNewVenue(venueInfo: any) {

		let resp
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('venues')
				.insert([venueInfo])
				.select()

			resp = data?.[0]
		}


		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllVenues()
			return resp
		}
	}

	async function addNewClient(clientInfo: any) {

		let resp
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('clients')
				.insert([clientInfo])
				.select()

			resp = data?.[0]
		}


		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllClients()
			return resp
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
		if (user) {
			queryAllGigs()
			queryAllClients()
		}
		queryAllVenues()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (<><div className={loading ? "!cursor-wait" : ""}>



		<h1 className="text-3xl my-2">Gigs!</h1>

		<section className="bg-slate-300 m-5 w-fit">

			<table className="table-auto">
				<thead>
					<tr className="bg-slate-200">
						<th className="text-start w-20"><b>#</b></th>
						<th className="text-start w-20"><b>Start</b></th>
						<th className="text-start w-20"><b>Venue</b></th>
						<th className="text-start w-40"><b>Amount Due</b></th>
						<th className="text-start w-40"><b>Paid?</b></th>
						<th className="text-start w-40"><b>Delete Gig</b></th>
						<th className="text-start w-40"><b>Client</b></th>
					</tr>
				</thead>
				<tbody>
					{gigs?.map((gig, i) => {

						const { id, amount_due, is_paid, start, venue: venueId, client: clientId } = gig

						const startDT = new Date(start)
						const startTime = startDT.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' })
						const startDate = startDT.toLocaleString('en-US', { dateStyle: "medium" })

						return <tr key={id} className={i % 2 ? "bg-slate-200" : ""}>
							<td className="">{id}</td>
							<td className=""><p>{startDate}</p>{startTime}</td>
							<td className="">{venues?.find((venue) => venue.id === venueId)?.name}</td>
							<td className="">${amount_due}</td>
							<td className="">{is_paid ? "Yes" : "No"} <BenButton loading={loading} size="xs" label={`Mark as ${!is_paid ? "paid" : "unpaid"}`} onClick={() => updateGigIsPaid(id, !is_paid)} /> </td>
							<td className=""><BenButton loading={loading} label={"X"} onClick={() => deleteGig(gig["id"])} /></td>
							<td className="">{clients?.find((client) => client.id === clientId)?.name}</td>

						</tr>
					})}

				</tbody>

			</table>


		</section>


		<menu className="m-12">
			{/* <BenButton label="Add sample gig" onClick={() => addNewGig()} loading={loading} /> */}
			<BenButton label="Add new gig" onClick={() => setModalOpen(true)} />
			<BenLink href="/" label="go home" />
		</menu>


	</div>

		<Modal
			addNewGig={addNewGig}
			addNewVenue={addNewVenue}
			addNewClient={addNewClient}
			open={modalOpen}
			setOpen={setModalOpen}
			focusButtonRef={focusModalButtonRef}
			venues={venues}
			clients={clients}
		/>


	</>)

}






