import { client } from "#/app/atproto/client";
import type { Route } from "./+types/callback";
import { commitSession, getSession } from "#/app/session.server";

export async function loader({ request }: Route.LoaderArgs) {
	let params = new URLSearchParams(request.url.split("?")[1]);
	let cookieSession = await getSession(request.headers.get("Cookie"));

	try {
		const { session } = await client.callback(params);
		cookieSession.set("did", session.did);

		return new Response(null, {
			status: 302,
			headers: {
				"Set-Cookie": await commitSession(cookieSession),
				Location: "/",
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
	}
}
