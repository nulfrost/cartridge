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
		<div>
			<h1>bloc login</h1>
			<form method="POST">
				<label htmlFor="handle">Bluesky Handle</label>
				<input
					type="text"
					placeholder="enter handle"
					name="handle"
					id="handle"
				/>
				<button type="submit">login with bluesky</button>
			</form>
		</div>
	);
}
