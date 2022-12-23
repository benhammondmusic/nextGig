import Footer from "./Footer";
import Navbar from "./Navbar";
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}