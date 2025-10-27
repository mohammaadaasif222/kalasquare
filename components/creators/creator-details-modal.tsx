"use client"

import { X, Heart, Share2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Creator {
  id: string
  name: string
  followers: string
  category: string
  rating: number
  image: string
  tags: string[]
}

interface CreatorDetailsModalProps {
  isOpen: boolean
  creator: Creator | null
  onClose: () => void
  onTalkToCreator: () => void
}

export default function CreatorDetailsModal({ isOpen, creator, onClose, onTalkToCreator }: CreatorDetailsModalProps) {
  if (!isOpen || !creator) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-lg font-semibold text-foreground">Creator Profile</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={creator.image || "/placeholder.svg"}
                alt={creator.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{creator.name}</h3>
                <p className="text-muted-foreground">{creator.category}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{creator.followers}</span> Followers
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < creator.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({creator.rating}/5)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onTalkToCreator}>
                  <Mail className="w-4 h-4 mr-2" />
                  Talk to Creator
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {creator.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-3 border-t border-border pt-6">
            <h4 className="font-semibold text-foreground">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {creator.name} is a talented creator specializing in {creator.tags.join(", ")}. With {creator.followers}{" "}
              followers and a {creator.rating}/5 rating, they have established themselves as a trusted voice in their
              niche. Available for collaborations and brand partnerships.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{creator.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{creator.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{creator.tags.length}</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
