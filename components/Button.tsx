
interface ButtonProps {
	label: string;
	onClick: Function;
	disabled?: boolean
}

export default function Button(props: ButtonProps) {
	return <button
		disabled={props.disabled}
		className="bg-slate-800 text-slate-50 p-2 rounded-md m-2"
		onClick={() => props.onClick()}
	>{props.label}</button>
}