import { Input } from "#/app/components/ui/input";
import { Label } from "#/app/components/ui/label";
import { Button } from "#/app/components/ui/button";
import { Filter } from "lucide-react";
import {igdb} from "#/app/igdb"
import type {Route} from "./+types/_index"

export function meta() {
  return [
    {
      title: "cartridge | Home",
    },
  ];
}

export async function loader() {
  const games = await igdb("/games", {
   body: "fields id,age_ratings,artworks,cover,first_release_date,genres,name;",
   method: "POST"
  });
  return { games }
}

export default function Home({ loaderData: {games} }: Route.ComponentProps) {
  console.log({ games })
  return (
   <>
     <section className="max-w-xl mx-auto pt-40" id="search">
      <div className="text-center mb-4">
        <h1 className="mb-2 font-bold text-3xl">Find your next journey</h1>
        <p className="text-sm text-gray-500">
          Get started by finding games you want to add to your backlog or write
          a review for a game you&apos;ve completed
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
    <section id="new-releases">
      <h2>New releases</h2>
    </section>
    <section id="popular">
      <h2>Popular</h2>
    </section>
   </>
  );
}
