import { Star } from "lucide-react"
import {Link} from "react-router"

export default function RelatedGames() {
  const relatedGames = [
    {
      id: 1,
      title: "Mystic Odyssey",
      image: "/placeholder.svg?height=600&width=450",
      rating: 4.5,
      genre: "RPG, Adventure",
    },
    {
      id: 2,
      title: "Eternal Legends",
      image: "/placeholder.svg?height=600&width=450",
      rating: 4.3,
      genre: "RPG, Strategy",
    },
    {
      id: 3,
      title: "Phantom Realms",
      image: "/placeholder.svg?height=600&width=450",
      rating: 4.7,
      genre: "Action, Adventure",
    },
  ]

  return (
    <div className="space-y-4">
      {relatedGames.map((game) => (
        <Link to="#" key={game.id}>
          <div className="flex gap-3 hover:bg-accent p-2 rounded-md transition-colors">
            <div className="relative h-16 w-12 rounded overflow-hidden">
              <img src={game.image || "/placeholder.svg"} alt={game.title} className="object-cover" />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="font-medium line-clamp-1">{game.title}</h4>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs text-muted-foreground">{game.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">{game.genre}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
