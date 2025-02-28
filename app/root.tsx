import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "#/app/tailwind.css";
import { TID } from "@atproto/common";
import { getSession } from "#/app/session";
import { client } from "#/app/atproto/client";
import { Agent } from "@atproto/api";
import { Navbar } from "./components/global/Navbar";

export async function action({ request }: Route.ActionArgs) {
	const cookieSession = await getSession(request.headers.get("Cookie"));
	const userSession = await client.restore(cookieSession.data.did as string);

	const agent = new Agent(userSession);

	const rkey = TID.nextStr();

	const record = {
		$type: "community.cartridge.log",
		gameId: "1234",
		status: "community.cartridge.defs#playing",
		platform: "community.cartridge.defs#playstation",
		startedAt: new Date().toISOString(),
	};

	await agent.com.atproto.repo.putRecord({
		repo: agent.assertDid,
		collection: "community.cartridge.log",
		rkey,
		record,
	});
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { pathname } = useLocation();
	return (
		<html lang="en" className="h-full">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className=" bg-gray-50">
				{pathname === "/login" ? null : <Navbar />}
				<main className="h-full antialiased container mx-auto">{children}</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1 className="font-bold text-3xl">{message}</h1>
			<p className="text-xl mb-4">{details}</p>
			<p>
				This is likely something that should not be happening try going{" "}
				<Link to="/" className="text-primary">
					home
				</Link>{" "}
				or try refreshing the page.
			</p>
		</main>
	);
}
