import type { Route } from "./+types/_index";
import { prisma } from "#/app/db.server";

export async function loader({ request }: Route.LoaderArgs) {
	await prisma.log.create({
		data: {
			uri: "at://some-url",
			status: "PLANNED",
			started_at: new Date(),
			userId: "1",
			gameId: "1234",
		},
	});
	return {};
}

export default function Home() {
	return <div>bloc home</div>;
}
