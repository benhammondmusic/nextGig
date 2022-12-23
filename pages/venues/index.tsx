import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { AddNewVenueForm } from "../../components/AddNewVenueForm";
import BenLink from "../../components/BenLink";
import { DeleteButton } from "../../components/DeleteButton";
import { LOCKED } from "../../lib/constants";
// @ts-ignore
import { Database } from '../utils/database.types'

export default function Gigs({ session }: { session: Session }) {

	const supabase = useSupabaseClient<Database>()
	const user = useUser()
	const [loading, setLoading] = useState(true)
	const [venues, setVenues] = useState<any[]>()

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

	async function deleteVenue(id: number) {
		try {
			setLoading(true)
			await supabase
				.from('venues')
				.delete()
				.match({ id })
		}
		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllVenues()
		}
	}



	useEffect(() => {
		queryAllVenues()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className={loading ? "!cursor-wait" : ""}>
				<ul>
					{venues?.map((venue) => {
						const { name, address, id } = venue
						const venueLocked = id === LOCKED
						return <li key={id} className="flex">
							<div className="p-2 m-5 bg-slate-200 rounded-sm">
								<h2 className="M-3">{name}</h2>
								<span className="M-3">{address}</span>


							</div>
							{!venueLocked &&
								<div className="grid content-center ">
									<DeleteButton handleClick={() => deleteVenue(id)} loading={loading} />
								</div>}

						</li>
					})}

					<div className="p-5 m-12 bg-slate-200">

						<AddNewVenueForm
							addNewVenue={addNewVenue}
						/>
					</div>

				</ul>

				<menu className="m-12">
					<BenLink href="/" label="go home" />
				</menu>


			</div>

		</>)

}

