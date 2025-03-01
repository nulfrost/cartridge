import { igdb } from '#/app/igdb';
import type { Route } from './+types/index';

export function meta() {
	return [
		{
			title: 'cartridge | Home',
		},
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const game = await igdb('/games', {
		method: 'POST',
		body: `
  	 fields *, platforms.*, screenshots.*, genres.*, cover.*;
  	 where id = ${params.id};
    `,
	});

	return { game: game.at(0) };
}

export default function RouteComponent({
	loaderData: { game },
}: Route.ComponentProps) {
	console.log({ game });
	return (
		<>
			<h1>{game.name}</h1>
			<p>{game.summary}</p>
		</>
	);
}
