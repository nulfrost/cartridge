import { client } from "#/app/atproto/client";
import { redirect } from "react-router";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const handle = formData.get("handle") as string;

	if (typeof handle !== "string") {
		throw new Error("Invalid handle");
	}

	const ac = new AbortController();

	const redirectUrl = await client.authorize(handle, {
		signal: ac.signal,
		ui_locales: "en-CA",
	});

	throw redirect(redirectUrl.toString());
}

export default function Login() {
	return (
		<div className="flex flex-col justify-center items-center h-full">
			<h1 className="font-bold text-3xl text-center mb-2">
				cartridge 🎮 community
			</h1>
			<p className="mb-4 text-gray-600">Log in with your AT Protocol account</p>
			<form
				method="POST"
				className="bg-white max-w-[500px] shadow-xs p-5 rounded-sm w-full"
			>
				<label htmlFor="handle" className="block text-gray-600 text-lg">
					Handle
				</label>
				<input
					className="mt-1 mb-4 w-full border border-gray-300 rounded-sm px-3 py-2 focus-visible:ring-2 focus-visible:ring-indigo-500 ring-offset-2 focus-visible:outline-none text-lg"
					type="text"
					placeholder="alice.bsky.social"
					name="handle"
					id="handle"
					required
					autoComplete="username"
				/>
				<button
					type="submit"
					className="block bg-indigo-500 text-white font-medium px-4 py-2 rounded-sm w-full hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none duration-150 ring-offset-2 text-lg"
				>
					Log In
				</button>
			</form>
		</div>
	);
}
