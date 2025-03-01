import { Filter } from "lucide-react";
import { Link } from "react-router";
import { Button } from "#/app/components/ui/button";
import { Input } from "#/app/components/ui/input";
import { Label } from "#/app/components/ui/label";
import { igdb } from "#/app/igdb";
import { type Game, GameSchema } from "#/app/schemas/game";
import { Heading2, Heading3 } from "../components/ui/typography";
import type { Route } from "./+types/_index";

export function meta() {
	return [
		{
			title: "cartridge | Home",
		},
	];
}

export async function loader() {
	const games = await igdb<Game>("/games", {
		body: `
      fields id,age_ratings.*,artworks.*,cover.*,first_release_date,genres.*,name;
      sort first_release_date desc;
      limit 8;
    `,
		method: "POST",
	});

	return { games };
}

export default function Home({ loaderData: { games } }: Route.ComponentProps) {
	return (
		<>
			<section className="max-w-xl mx-auto pt-40" id="search">
				<div className="text-center mb-4">
					<h1 className="mb-2 font-bold text-3xl">Find your next journey</h1>
					<p className="text-sm text-gray-500 text-pretty">
						Get started by finding games you want to add to your backlog or
						write a review for a game you&apos;ve completed
					</p>
				</div>
				<form className="mb-4">
					<Label htmlFor="search" className="sr-only">
						Search for a game
					</Label>
					<div className="flex mb-1">
						<Input
							type="search"
							name="q"
							className="py-2 h-11 rounded-r-none shadow-none"
							id="search"
							placeholder="Search for a video game"
							aria-describedby="search-desc"
						/>
						<Button
							type="submit"
							aria-label="Apply filters to your search to refine your results"
							className="rounded-l-none block size-auto"
						>
							<Filter className="size-5" aria-hidden />
						</Button>
					</div>
					<span id="search-desc" className="text-sm text-gray-500">
						Enter your query into the search input and press enter
					</span>
				</form>
			</section>
			<section id="new-releases" className="mt-20">
				<div className="flex justify-between">
					<Heading2 className="text-sm uppercase font-bold mb-4">
						New releases
					</Heading2>
					<Link to="/new-releases" className="text-primary hover:underline">
						see more &rarr;
					</Link>
				</div>
				<div className="grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-2">
					{games.map((game) => (
						<Link
							to={`/games/${game.id}`}
							key={game.id}
							aria-label={`see more details about ${game.name}`}
							className="rounded-md border border-gray-100 shadow-xs overflow-hidden relative hover:[&>div]:flex ring-primary focus-visible:ring-8 focus-visible:[&>div]:flex"
						>
							<img
								src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.png`}
								alt=""
								fetchPriority="high"
								title={game.name}
								className="w-full h-auto"
								height={720}
								width={540}
							/>
							<div className="absolute bottom-0 text-white bg-black/60 w-full h-10 hidden justify-center items-center">
								<p className="font-bold">{game.name}</p>
							</div>
						</Link>
					))}
				</div>
			</section>
			{/* <section id="popular">
				<h2>Popular</h2>
			</section> */}
		</>
	);
}
