import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Dropdown from './Dropdown';

// https://tailwindui.com/components/application-ui/forms/input-groups

interface ModalProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	focusButtonRef: any
	venues: any[] | undefined,
	clients: any[] | undefined,
	addNewGig: Function,
}

export default function Modal(props: ModalProps) {

	const { open, setOpen, focusButtonRef } = props

	const [newGigVenueId, setNewGigVenueId] = useState<number | null>(null)
	const [newGigClientId, setNewGigClientId] = useState("")
	const [newGigPrice, setNewGigPrice] = useState<number | null>(null)
	const [newGigStartTime, setNewGigStartTime] = useState("")
	const [newGigStartDate, setNewGigStartDate] = useState(new Date().toISOString().slice(0, 10))
	const [newGigEndTime, setNewGigEndTime] = useState("")
	const [newGigEndDate, setNewGigEndDate] = useState("")

	function handleSubmitNewGig() {
		const newGigInfo = {
			venue: newGigVenueId,
			amount_due: newGigPrice,
			start: newGigStartDate && newGigStartTime ? `${newGigStartDate}T${newGigStartTime}:00.000000+00:00` : null,
			// newGigEndTime,
			// newGigEndDate,
			is_paid: false
		}

		props.addNewGig(newGigInfo)
		setOpen(false)
	}


	return <Transition.Root show={open} as={Fragment}>
		<Dialog as="div" className="relative z-10" initialFocus={focusButtonRef} onClose={setOpen}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</Transition.Child>

			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex justify-center mt-36 p-4 text-center items-center sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
										<PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
											Adding new gig
										</Dialog.Title>
										<div className="mt-2">


											<p className="text-sm text-gray-500">
												Most fields are optional; you can fill in more details later.
											</p>
											<div className="flex">
												<div className="my-3 mr-3">
													<label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start date:</label>

													<input className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' type="date" id="start-date"
														value={newGigStartDate}
														onChange={(e) => setNewGigStartDate(e.target.value)}
													/>
												</div>
												<div className="my-3 ">
													<label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start time:</label>

													<input className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' type="time" id="start-time"

														value={newGigStartTime}
														onChange={(e) => setNewGigStartTime(e.target.value)}
													/>
												</div>
											</div>

											<div className="flex">
												<div className="my-3 mr-3">
													<label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End date:</label>

													<input className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' type="date" id="end-date"

														value={newGigEndDate}
														onChange={(e) => setNewGigEndDate(e.target.value)}
													/>
												</div>
												<div className="my-3 ">
													<label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End time:</label>

													<input className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' type="time" id="end-time"
														value={newGigEndTime}
														onChange={(e) => setNewGigEndTime(e.target.value)}
													/>
												</div>
											</div>
											<div className="flex">
												<div className="my-3 mr-3">
													<label htmlFor="price" className="block text-sm font-medium text-gray-700">
														Price
													</label>
													<div className="relative mt-1 rounded-md shadow-sm">
														<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
															<span className="text-gray-500 sm:text-sm">$</span>
														</div>
														<datalist id="prices">
															<option value={100} />
															<option value={200} />
															<option value={300} />
															<option value={400} />
															<option value={500} />
															<option value={1000} />
															<option value={1500} />
															<option value={2000} />
														</datalist>
														<input
															type="number"
															list={"prices"}
															id="price"
															className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															placeholder="100"
															value={newGigPrice ?? ""}
															onChange={(e) => setNewGigPrice(parseInt(e.target.value))}
														/>

													</div>
												</div>
											</div>

											<div className="flex">
												<div className="my-3 mr-3">
													<label htmlFor="venue" className="block text-sm font-medium text-gray-700">
														Location
													</label>
													<div className="relative mt-1 rounded-md shadow-sm">
														{/* <datalist id="venues">
															{props.venues?.map((venue: any) => <option value={venue["name"]} key={venue["name"]} />) ?? undefined}
														</datalist>
														<input
															type="text"
															list={"venues"}
															id="price"
															className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															value={newGigVenueId}
															onChange={(e) => setNewGigVenueId(props.venues?.find((venue) => venue["name"] === e.target.value))}
														/> */}

														<Dropdown
															id="venue"
															menuItems={props.venues || []}
															selectedItem={newGigVenueId}
															setSelectedItem={setNewGigVenueId}
														/>

													</div>
												</div>
											</div>

											<div className="flex">
												<div className="my-3 mr-3">
													<label htmlFor="client" className="block text-sm font-medium text-gray-700">
														Client
													</label>
													<div className="relative mt-1 rounded-md shadow-sm">
														<datalist id="venues">
															{props.clients?.map((client: any) => <option value={client["name"]} key={client["name"]} />) ?? undefined}
														</datalist>
														<input
															type="text"
															list={"clients"}
															id="client"
															className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															value={newGigClientId}
															onChange={(e) => setNewGigClientId(e.target.value)}
														/>

													</div>
												</div>
											</div>


										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="button"
									className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => handleSubmitNewGig()}
									ref={focusButtonRef}
								>
									Submit
								</button>
								<button
									type="button"
									className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setOpen(false)}
								>
									Cancel
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition.Root>

}