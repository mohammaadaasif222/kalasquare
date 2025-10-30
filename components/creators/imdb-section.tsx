"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IMDBMovie {
  id: string
  title: string
  rating: number
  year: string
  image: string
  role: string
}

const movies: IMDBMovie[] = [
  {
    id: "1",
    title: "Animal",
    rating: 8.5,
    year: "2023",
    image: "/animal-movie-poster.jpg",
    role: "Lead Role",
  },
  {
    id: "2",
    title: "Pathaan",
    rating: 7.8,
    year: "2023",
    image: "/pathaan-movie-poster.jpg",
    role: "Supporting Role",
  },
  {
    id: "3",
    title: "Jawan",
    rating: 7.2,
    year: "2023",
    image: "/jawan-movie-poster.jpg",
    role: "Cameo",
  },
  {
    id: "4",
    title: "Fighter",
    rating: 7.9,
    year: "2024",
    image: "/fighter-movie-poster.jpg",
    role: "Lead Role",
  },
]

export default function IMDBSection() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("imdb-carousel")
    if (container) {
      const scrollAmount = 300
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      container.scrollLeft = newPosition
      setScrollPosition(newPosition)
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">IMDB</h2>
          <p className="text-sm text-muted-foreground">Featured filmography and ratings</p>
        </div>
        <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-red-50">
          View All
        </Button>
      </div>

    
      <div className="hidden md:block relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div
          id="imdb-carousel"
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-40 group cursor-pointer">
              <div className="relative mb-3 overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-semibold">{movie.role}</p>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1 truncate">{movie.title}</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(movie.rating / 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-foreground">{movie.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{movie.year}</p>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

     
      <div className="md:hidden grid grid-cols-2 gap-3">
        {movies.slice(0, 4).map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative mb-2 overflow-hidden rounded-lg shadow-sm">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                {movie.rating}
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-xs mb-1 truncate">{movie.title}</h3>
            <p className="text-xs text-muted-foreground">{movie.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
