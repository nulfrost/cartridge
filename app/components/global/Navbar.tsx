import { Link } from "react-router";

export function Navbar() {
	return (
		<header className="bg-white border-b border-gray-100 py-4 shadow-xs">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="font-bold text-xl">
					cartridge.
				</Link>
				<Link
					to="/login"
					className="font-bold bg-primary py-2 px-5 text-white rounded-sm hover:bg-primary/90 focus-visible:ring-4 ring-primary focus-visible:border-0 focus-visible:outline-1 focus-visible:ring-offset-2"
				>
					Login
				</Link>
			</div>
		</header>
	);
}
