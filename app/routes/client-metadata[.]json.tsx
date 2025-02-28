import { client } from "#/app/atproto/client";

export async function loader() {
	return Response.json(client.clientMetadata);
}
