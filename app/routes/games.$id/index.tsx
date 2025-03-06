import {
	ChevronRight,
	Clock,
	Gamepad2,
	Heart,
	Share2,
	Star,
	Users,
} from 'lucide-react';
import { data } from 'react-router';
import { Badge } from '#/app/components/ui/badge';
import { Button } from '#/app/components/ui/button';
import { Progress } from '#/app/components/ui/progress';
import { ScrollArea } from '#/app/components/ui/scroll-area';
import { Separator } from '#/app/components/ui/separator';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '#/app/components/ui/tabs';
import { igdb } from '#/app/igdb';
// import GameScreenshots from "@/components/game-screenshots"
// import RelatedGames from "@/components/related-games"
// import GameStatusDropdown from "@/components/game-status-dropdown"
// import UserRating from "@/components/user-rating"
// import GamePlaytime from "@/components/game-playtime"
// import UserNotes from "@/components/user-notes"
import type { Route } from './+types/index';

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
	return [
		{
			title: data.game.name,
		},
		{
			name: 'description',
			content: data.game.summary,
		},
		{
			property: 'og:title',
			content: data.game.name,
		},
		{ property: 'og:description', content: data.game.summary },
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const game = await igdb('/games', {
		method: 'POST',
		body: `
  	 fields *, platforms.*, screenshots.*, genres.*, cover.*, game_localizations.*;
  	 where id = ${params.id};
    `,
	});

	if (!game) {
		throw data(null, { status: 404 });
	}

	return { game: game.at(0) };
}

export default function RouteComponent({
	loaderData: { game },
}: Route.ComponentProps) {
	console.log({ game });
	return (
		<>
			{/* Hero Section */}
			<div className="relative h-[40vh] w-full">
				{/* <img
					src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`}
					alt="Game hero"
					className="object-cover brightness-50"
					fetchPriority="high"
				/> */}
				{/* <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" /> */}
				<div className="absolute bottom-0 left-0 py-6 md:py-10 w-full">
					<div className="flex flex-col md:flex-row gap-6 items-start">
						<div className="relative h-40 w-32 md:h-60 md:w-48 rounded-md overflow-hidden shadow-lg">
							<img
								src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.png`}
								alt=""
								fetchPriority="high"
							/>
						</div>
						<div className="space-y-2">
							<div className="flex flex-wrap gap-2">
								<Badge variant="secondary" className="text-xs">
									RPG
								</Badge>
								<Badge variant="secondary" className="text-xs">
									Open World
								</Badge>
								<Badge variant="secondary" className="text-xs">
									Adventure
								</Badge>
							</div>
							<h1 className="text-3xl md:text-5xl font-bold text-black">
								{game.name}
							</h1>
							<div className="flex items-center gap-2">
								<div className="flex">
									{[1, 2, 3, 4].map((i) => (
										<Star
											key={i}
											className="h-5 w-5 fill-primary text-primary"
										/>
									))}
									<Star
										className="h-5 w-5 fill-primary text-primary"
										strokeWidth={1}
									/>
								</div>
								<span className="text-sm text-muted-foreground">
									4.2 (1,024 reviews)
								</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Developed by <span className="text-primary">Stellar Games</span>{' '}
								• Published by{' '}
								<span className="text-primary">Cosmic Entertainment</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container py-6 md:py-10">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Game Info */}
					<div className="lg:col-span-2 space-y-8">
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								{/* <GameStatusDropdown /> */}
								<Button variant="outline">
									<Heart className="mr-2 h-4 w-4" />
									Add to Backlog
								</Button>
								<Button variant="ghost" size="icon">
									<Share2 className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex items-center gap-2">
								{/* <UserRating /> */}
							</div>
						</div>

						<Tabs defaultValue="overview" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="screenshots">Screenshots</TabsTrigger>
								<TabsTrigger value="reviews">Reviews</TabsTrigger>
							</TabsList>
							<TabsContent value="overview" className="space-y-6 pt-4">
								<div>
									<h2 className="text-2xl font-bold mb-4">About the Game</h2>
									<p className="text-muted-foreground">
										Celestial Chronicles is an epic open-world RPG that takes
										you on a journey through the mystical realm of Aetheria. As
										the chosen hero, you must navigate through treacherous
										landscapes, battle formidable foes, and uncover the secrets
										of an ancient civilization to restore balance to a world on
										the brink of chaos.
									</p>
									<p className="mt-4 text-muted-foreground">
										With a vast open world to explore, countless quests to
										undertake, and a deep, engaging storyline, Celestial
										Chronicles offers an immersive gaming experience like no
										other. Customize your character, forge alliances, and make
										choices that will shape the fate of Aetheria.
									</p>
								</div>
							</TabsContent>
							<TabsContent value="screenshots" className="pt-4">
								{/* <GameScreenshots /> */}
							</TabsContent>
							<TabsContent value="reviews" className="pt-4">
								<div className="space-y-6">
									<div className="flex flex-col md:flex-row gap-6 items-start">
										<div className="w-full md:w-1/3 bg-card rounded-lg p-6 space-y-4">
											<div className="text-center">
												<h3 className="text-5xl font-bold">4.2</h3>
												<div className="flex justify-center my-2">
													{[1, 2, 3, 4].map((i) => (
														<Star
															key={i}
															className="h-5 w-5 fill-primary text-primary"
														/>
													))}
													<Star className="h-5 w-5 fill-primary/50 text-primary" />
												</div>
												<p className="text-sm text-muted-foreground">
													1,024 reviews
												</p>
											</div>
											<Separator />
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<span className="text-sm w-6">5★</span>
													<Progress value={65} className="h-2" />
													<span className="text-sm text-muted-foreground">
														65%
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm w-6">4★</span>
													<Progress value={20} className="h-2" />
													<span className="text-sm text-muted-foreground">
														20%
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm w-6">3★</span>
													<Progress value={10} className="h-2" />
													<span className="text-sm text-muted-foreground">
														10%
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm w-6">2★</span>
													<Progress value={3} className="h-2" />
													<span className="text-sm text-muted-foreground">
														3%
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm w-6">1★</span>
													<Progress value={2} className="h-2" />
													<span className="text-sm text-muted-foreground">
														2%
													</span>
												</div>
											</div>
										</div>
										<div className="w-full md:w-2/3 space-y-4">
											<h3 className="text-xl font-bold">Top Reviews</h3>
											<ScrollArea className="h-[400px] rounded-md border p-4">
												<div className="space-y-6">
													{[1, 2, 3, 4, 5].map((i) => (
														<div key={i} className="space-y-2">
															<div className="flex justify-between">
																<div className="flex items-center gap-2">
																	<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
																		<span className="font-medium">JD</span>
																	</div>
																	<div>
																		<p className="font-medium">John Doe</p>
																		<p className="text-xs text-muted-foreground">
																			Played 120+ hours
																		</p>
																	</div>
																</div>
																<div className="flex">
																	{Array(5)
																		.fill(0)
																		.map((_, j) => (
																			<Star
																				key={j}
																				className={`h-4 w-4 ${j < 5 - (i % 2) ? 'fill-primary text-primary' : 'text-muted'}`}
																			/>
																		))}
																</div>
															</div>
															<p className="text-sm text-muted-foreground">
																{i % 2 === 0
																	? "One of the best RPGs I've played in years! The world is immersive, the story is captivating, and the combat is satisfying. Highly recommended for any RPG fan."
																	: 'Celestial Chronicles offers a beautiful open world with tons of content. The character progression is deep and rewarding. Some minor bugs, but nothing game-breaking.'}
															</p>
															<div className="flex justify-between items-center">
																<span className="text-xs text-muted-foreground">
																	Posted on May {i + 10}, 2023
																</span>
																<div className="flex gap-2">
																	<Button
																		variant="ghost"
																		size="sm"
																		className="h-8 px-2"
																	>
																		<span className="text-xs">
																			Helpful (42)
																		</span>
																	</Button>
																	<Button
																		variant="ghost"
																		size="sm"
																		className="h-8 px-2"
																	>
																		<span className="text-xs">Report</span>
																	</Button>
																</div>
															</div>
															{i < 5 && <Separator />}
														</div>
													))}
												</div>
											</ScrollArea>
										</div>
									</div>
								</div>
							</TabsContent>
						</Tabs>
					</div>

					{/* Right Column - Details & Related */}
					<div className="space-y-8">
						<div className="bg-card rounded-lg p-6 space-y-4">
							<h3 className="text-xl font-bold">Game Details</h3>
							<Separator />
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Release Date
									</span>
									<span className="text-sm font-medium">November 15, 2023</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Developer
									</span>
									<span className="text-sm font-medium">Stellar Games</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Publisher
									</span>
									<span className="text-sm font-medium">
										Cosmic Entertainment
									</span>
								</div>
								<Separator />
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">
										Platforms
									</span>
									<div className="flex gap-2">
										{game.platforms.map((platform) => (
											<Badge variant="outline" key={platform.checksum}>
												{platform.abbreviation}
											</Badge>
										))}
									</div>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Languages
									</span>
									<span className="text-sm font-medium">16 supported</span>
								</div>
								<Separator />
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">40+ hours main story</span>
									</div>
									<div className="flex items-center gap-2">
										<Users className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">Single player</span>
									</div>
									<div className="flex items-center gap-2">
										<Gamepad2 className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">Controller supported</span>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-lg p-6 space-y-4">
							<div className="flex justify-between items-center">
								<h3 className="text-xl font-bold">Related Games</h3>
								<Button variant="link" size="sm" className="text-primary">
									View All
								</Button>
							</div>
							{/* <RelatedGames /> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
