import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import BenButton from "../../components/BenButton";
// @ts-ignore
import { Database } from '../utils/database.types'
import { useRef, useState, useEffect } from 'react'
import BenLink from "../../components/BenLink";
import AddGigModal from "../../components/AddGigModal";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { DeleteButton } from "../../components/DeleteButton";


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
				.select(`id, is_paid, amount_due, start_date, end_date, start_time, end_time, venue, client`)
				.order('start_date')

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

	return (
		<>
			<div className={loading ? "!cursor-wait" : ""}>


				<ul>
					{gigs?.map((gig, i) => {

						const { id, amount_due, is_paid, venue: venueId, client: clientId } = gig

						const { startDate, startTime, endDate, endTime } = getDisplayDatesTimes(gig)

						const clientName = clients?.find((client) => client.id === clientId)?.name
						const venueName = venues?.find((venue) => venue.id === venueId)?.name

						return <li key={id} className={`p-2 m-3 ${i % 2 ? "bg-slate-200" : ""}`}>
							{/* <span className="">{id}</span> */}
							{(startDate || startTime) && <span className="mx-5"><b>Start:</b> {startDate}{" "}{startTime}</span>}
							{(endDate || endTime) && <span className="mx-5"><b>End:</b> {endDate}{endTime}</span>}
							{venueName && <span className="mx-5"><b>Venue:</b> {venueName}</span>}
							{amount_due && <span className="mx-5"><b>Invoice total:</b> ${amount_due}</span>}
							<span className="mx-5"><b>{is_paid ? "Paid" : "Unpaid"}</b> <span className="ml-1"><BenButton loading={loading} size="xs" label={`Mark as ${!is_paid ? "paid" : "unpaid"}`} onClick={() => updateGigIsPaid(id, !is_paid)} /></span> </span>
							{clientName && <span className="mx-5"><b>Client:</b> {clientName}</span>}
							<span className="mx-3 justify-self-end">
								<DeleteButton loading={loading} handleClick={() => deleteGig(id)} />
							</span>
						</li>
					})}

				</ul>





				<menu className="m-12">
					{/* <BenButton label="Add sample gig" onClick={() => addNewGig()} loading={loading} /> */}
					<BenButton label="Add new gig" onClick={() => setModalOpen(true)} />
					<BenLink href="/venues" label="View Venues" />
					<BenLink href="/clients" label="View Clients" />
				</menu>


			</div>

			<AddGigModal
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




function getDisplayDatesTimes(gig: any) {
	const { start_date, end_date, start_time, end_time } = gig

	dayjs.extend(localizedFormat)
	dayjs.extend(customParseFormat)

	const startDate = start_date ? dayjs(start_date).format('MMMD') : ""

	const startTimeDJS = dayjs(start_time, "HH:mm:ss")
	const startTimeIsOnTheHour = startTimeDJS.minute() === 0
	const startTimeDisplayFormat = `h${startTimeIsOnTheHour ? "" : ":mm"}a`
	const startTime = start_time ? dayjs(start_time, "HH:mm:ss").format(startTimeDisplayFormat) : ""

	const endDate = end_date ? dayjs(end_date).format('MMMD') : ""

	const endTimeDJS = dayjs(end_time, "HH:mm:ss")
	const endTimeIsOnTheHour = endTimeDJS.minute() === 0
	const endTimeDisplayFormat = `h${endTimeIsOnTheHour ? "" : ":mm"}a`
	const endTime = end_time ? dayjs(end_time, "HH:mm:ss").format(endTimeDisplayFormat) : ""


	return { startDate, startTime, endDate, endTime }

}




