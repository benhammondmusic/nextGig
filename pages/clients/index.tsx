import { useSupabaseClient, Session, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import BenLink from "../../components/BenLink";
import { DeleteButton } from "../../components/DeleteButton";
import { LOCKED } from "../../lib/constants";
// @ts-ignore
import { Database } from '../utils/database.types'

export default function Venues({ session }: { session: Session }) {

	const supabase = useSupabaseClient<Database>()
	const user = useUser()
	const [loading, setLoading] = useState(true)
	const [clients, setClients] = useState<any[]>()


	async function queryAllClients() {
		try {
			setLoading(true)
			let { data, error, status } = await supabase
				.from('clients')
				.select(`id, name, email, phone, address`)
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

	async function deleteClient(id: number) {
		try {
			setLoading(true)
			await supabase
				.from('clients')
				.delete()
				.match({ id })
		}
		catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			queryAllClients()
		}
	}



	useEffect(() => {
		queryAllClients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className={loading ? "!cursor-wait" : ""}>
				<ul>
					{clients?.map((client) => {
						const { name, email, phone, address, id } = client
						const clientLocked = id === LOCKED
						return <li key={id} className="flex">
							<div className="p-2 m-5 bg-slate-200 rounded-sm">
								<h2 className="M-3">{name}</h2>
								<span className="M-3">{address}</span>


							</div>
							{!clientLocked &&
								<div className="grid content-center ">
									<DeleteButton handleClick={() => deleteClient(id)} loading={loading} />
								</div>}

						</li>
					})}


				</ul>

				<menu className="m-12">
					<BenLink href="/" label="go home" />
				</menu>


			</div>

		</>)

}

