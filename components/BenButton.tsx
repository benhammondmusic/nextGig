
interface BenButtonProps {
	label: string;
	onClick: Function;
	styleAsLink?: boolean;
	size?: "xs"
	loading?: boolean
}

export default function BenButton(props: BenButtonProps) {

	const buttonClasses = "bg-slate-800 text-slate-50"
	const linkClasses = "text-slate-800 underline"
	const sizeOverride = props.size ? "text-xs" : ""
	const cursorOverride = props.loading ? "!cursor-wait" : ""
	// const cursorOverride = "!cursor-wait"

	return <button
		disabled={props.loading}
		className={`p-2 rounded-md my-2 ${cursorOverride} ${sizeOverride} ${props.styleAsLink ? linkClasses : buttonClasses}`}
		onClick={() => props.onClick()}
	>{props.label}</button>
}