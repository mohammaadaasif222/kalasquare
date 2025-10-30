"use client"

import { Heart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"

interface Creator {
  id: string
  name: string
  followers: string
  category: string
  rating: number
  image: string
  tags: string[]
}

interface CreatorGridProps {
  creators: Creator[]
  onTalkToCreator: (creator: Creator) => void
  onCreatorDoubleClick: (creator: Creator) => void
}

export default function CreatorGrid({ creators, onTalkToCreator, onCreatorDoubleClick }: CreatorGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
      {creators.map((creator) => (
        <div

          key={creator.id}
          className="bg-card rounded-lg overflow-hidden border border-border hover:shadow transition-shadow cursor-pointer"
          onDoubleClick={() => onCreatorDoubleClick(creator)}
        >

          <div className="relative aspect-square bg-muted overflow-hidden group">
            <img
              src={creator.image || "/placeholder.svg"}
              alt={creator.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-2 space-y-2">
            <Link href={`/top-creators/${creator.id}`}>
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{creator.name}</h3>
              <p className="text-xs text-muted-foreground">{creator.followers} Followers</p>
            </Link>

            {/* Category */}
            <p className="text-xs text-muted-foreground line-clamp-1">{creator.category}</p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${i < creator.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({creator.rating})</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {creator.tags.slice(0, 1).map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 pt-1">
              <Button variant="ghost" size="sm" className="flex-1 h-7 px-1">
                <Heart className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-7 text-xs px-1 text-primary border-primary hover:bg-primary/5 bg-transparent"
                onClick={() => onTalkToCreator(creator)}
              >
                Talk
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
