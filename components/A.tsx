import Link from "next/link";

interface AProps {
	label: string;
	href: string;
}

export default function A(props: AProps) {
	return <Link
		className="bg-slate-800 text-slate-50 p-2 rounded-md m-2"
		href={props.href}
	>{props.label}</Link>
}