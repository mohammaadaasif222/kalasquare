"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ExternalLink } from "lucide-react"

interface PendingArtist {
  id: string
  name: string
  email: string
  genre: string
  bio: string
  website?: string
  submittedDate: string
  profileImage?: string
}

interface PendingArtistCardProps {
  artist: PendingArtist
  onApprove: () => void
  onReject: () => void
}

export function PendingArtistCard({ artist, onApprove, onReject }: PendingArtistCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
            <p className="text-sm text-muted-foreground">{artist.email}</p>
          </div>
          <Badge variant="outline">{artist.genre}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Submitted {formatDate(artist.submittedDate)}</p>
      </div>

      {/* Bio */}
      <div className="mb-4 flex-1">
        <p className="text-sm text-foreground line-clamp-3">{artist.bio}</p>
      </div>

      {/* Website Link */}
      {artist.website && (
        <div className="mb-4">
          <a
            href={artist.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Visit Website
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={onReject}
          className="flex-1 text-destructive hover:text-destructive bg-transparent"
        >
          <X className="w-4 h-4 mr-1" />
          Reject
        </Button>
        <Button size="sm" onClick={onApprove} className="flex-1">
          <Check className="w-4 h-4 mr-1" />
          Approve
        </Button>
      </div>
    </Card>
  )
}
