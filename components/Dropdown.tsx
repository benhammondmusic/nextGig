import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { LOCKED } from '../lib/constants'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

interface DropdownProps {
	id: string,
	menuItems: any[],
	selectedItemId: number | null,
	setSelectedItemId: Function
}

export default function Dropdown(props: DropdownProps) {

	const tbdItem = props.menuItems?.find((item) => item.id === LOCKED)
	const menuItems = props.menuItems?.filter((item) => item.id !== LOCKED)

	const defaultLabel = `Choose existing ${props.id}`
	const selectedItemName = menuItems.find((item) => item.id === props.selectedItemId)?.name
	const tbdItemName = props.selectedItemId === tbdItem.id ? tbdItem.name : ""

	return (
		<Menu as="div" className="relative inline-block text-left" id={props.id}>
			<div>
				<Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
					{tbdItemName || selectedItemName || defaultLabel}
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<MenuItem
							item={tbdItem}
							setSelectedItemId={props.setSelectedItemId}
						/>
						{menuItems.map((item) => {
							return <MenuItem
								key={item.id}
								item={item}
								setSelectedItemId={props.setSelectedItemId}
							/>
						})}

					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}


interface MenuItemProps {
	item: any,
	setSelectedItemId: Function
}

function MenuItem(props: MenuItemProps) {

	const { id, name } = props.item


	return <Menu.Item>
		{({ active }) => (
			<button
				onClick={() => props.setSelectedItemId(id)}
				className={classNames(
					active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
					'block w-full px-4 py-2 text-left text-sm'
				)}
			>
				{name}
			</button>
		)}
	</Menu.Item>

}

