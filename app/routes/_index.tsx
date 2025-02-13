import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
	return {};
}

export default function Home() {
	return <div>bloc home</div>;
}
