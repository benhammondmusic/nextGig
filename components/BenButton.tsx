
interface BenButtonProps {
	label: string;
	onClick: Function;
	size?: "xs"
	loading?: boolean
}

export default function BenButton(props: BenButtonProps) {

	const sizeOverride = props.size ? "text-xs" : ""
	const cursorOverride = props.loading ? "!cursor-wait" : ""
	// const cursorOverride = "!cursor-wait"

	return <button
		disabled={props.loading}
		className={`bg-slate-800 text-slate-50 p-2 rounded-md my-2 ${cursorOverride} ${sizeOverride}`}
		onClick={() => props.onClick()}
	>{props.label}</button>
}