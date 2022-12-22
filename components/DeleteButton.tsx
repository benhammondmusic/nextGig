
interface DeleteButtonProps {
	handleClick: Function,
	loading: boolean,
}

export function DeleteButton(props: DeleteButtonProps) {
	return <button onClick={() => props.handleClick()} className={`text-red-800 bg-red-50 rounded p-1 ${props.loading ? "!cursor-wait" : ""}`} >⨉</button>
}

