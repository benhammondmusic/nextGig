import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import BenButton from "./BenButton";

interface AddNewVenueFormProps {
	addNewVenue: Function,
	setShowAddVenueForm?: Dispatch<SetStateAction<boolean>>,
	handleFieldUpdate?: Function
}

export function AddNewVenueForm(props: AddNewVenueFormProps) {

	const [newVenueName, setNewVenueName] = useState("")
	const [newVenueAddress, setNewVenueAddress] = useState("")



	async function handleSubmitNewVenue() {
		const newVenueInfo = {
			name: newVenueName,
			address: newVenueAddress,
		}

		const response = await props.addNewVenue(newVenueInfo)
		setNewVenueAddress("")
		setNewVenueName("")

		// if venue is being added in the middle of adding a gig
		props.setShowAddVenueForm && props.setShowAddVenueForm(false)
		props.handleFieldUpdate && props.handleFieldUpdate("venueId", response.id)


	}

	return <>

		<PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
		<div className="flex">

			<div className="my-3 mr-3">


				<label htmlFor="new-venue-name" className="block text-sm font-medium text-gray-700">
					New Venue Name
				</label>
				<div className="relative mt-1 rounded-md shadow-sm">

					<input
						type="text"
						id="new-venue-name"
						className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						value={newVenueName}
						onChange={(e) => setNewVenueName(e.target.value)}
					/>

				</div>
			</div>
			{/* </div>
		<div className="flex"> */}
			<div className="my-3 mr-3">
				<label htmlFor="new-venue-address" className="block text-sm font-medium text-gray-700">
					New Venue Address
				</label>
				<div className="relative mt-1 rounded-md shadow-sm">
					<input
						type="text"
						id="new-venue-address"
						className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						value={newVenueAddress}
						onChange={(e) => setNewVenueAddress(e.target.value)}
					/>

				</div>
			</div>
		</div>
		{(newVenueName || newVenueAddress) && <BenButton
			label="Submit this venue"
			onClick={handleSubmitNewVenue}

		/>}
	</>


}