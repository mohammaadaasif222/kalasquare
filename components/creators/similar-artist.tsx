"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface SimilarArtist {
  id: string
  name: string
  image: string
  location: string
  profession: string
}

const mockArtists: SimilarArtist[] = [
  {
    id: "1",
    name: "Swapnanil Deka",
    image: "/male-singer.png",
    location: "Noida",
    profession: "Singer",
  },
  {
    id: "2",
    name: "Vinay Khatri",
    image: "/male-singer.png",
    location: "Muzaffaranagar",
    profession: "Singer",
  },
  {
    id: "3",
    name: "Yash Dwivedi",
    image: "/male-singer-glasses.png",
    location: "Bhopal",
    profession: "Singer",
  },
  {
    id: "4",
    name: "Kuvara King",
    image: "/male-singer-glasses.png",
    location: "Virar",
    profession: "Singer",
  },
]

export default function SimilarArtistsSection() {
  return (
    <Card className="p-4 rounded ">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Artists</h3>
      <div className="space-y-3">
        {mockArtists.map((artist) => (
          <div
            key={artist.id}
            className="flex items-center border-b gap-3 p-2 rounded-lg transition cursor-pointer group"
          >
            {/* Artist Image */}
            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
              <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
            </div>

            {/* Artist Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[var(--brand)] transition truncate">
                {artist.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{artist.location}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{artist.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
