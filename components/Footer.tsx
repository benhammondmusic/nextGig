export default function Footer() {
	return <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
		<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Another site from <a href="https://benhammond.tech/" className="hover:underline">benhammond.tech</a>
		</span>
		<ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
			<li>
				<a href="https://github.com/benhammondmusic/nextgig" className="mr-4 hover:underline md:mr-6 ">GitHub</a>
			</li>
			<li>
				<a href="mailto:hello@benhammond.tech" className="hover:underline">Email</a>
			</li>
		</ul>
	</footer>

} 