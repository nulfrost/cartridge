import type { Route } from "./+types/_index";
import { getSession } from "#/app/session";
import { client } from "#/app/atproto/client";
import { Agent } from "@atproto/api";

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await getSession(request.headers.get("Cookie"));
	const userSession = await client.restore(cookieSession?.data?.did);

	const agent = new Agent(userSession);
	const profile = await agent.getProfile({ actor: agent.did });
	console.log({ profile });
	return {};
}

export default function Home() {
	return <div>bloc home</div>;
}
