"use client"

import { useState } from "react"
import { Header } from "@/components/admin/header"
import { PendingArtistCard } from "@/components/admin/pending-artist-card"

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

const SAMPLE_PENDING = [
  {
    id: "p1",
    name: "Luna Martinez",
    email: "luna@example.com",
    genre: "Indie Pop",
    bio: "Emerging indie pop artist with a focus on emotional storytelling and atmospheric production.",
    website: "https://lunamartinez.com",
    submittedDate: "2024-03-15",
  },
  {
    id: "p2",
    name: "Phoenix Rising",
    email: "phoenix@example.com",
    genre: "Electronic",
    bio: "Experimental electronic producer exploring the intersection of ambient and techno.",
    submittedDate: "2024-03-14",
  },
  {
    id: "p3",
    name: "Sage Williams",
    email: "sage@example.com",
    genre: "Folk",
    bio: "Singer-songwriter crafting intimate folk narratives with acoustic instrumentation.",
    submittedDate: "2024-03-13",
  },
]

export default function PendingPage() {
  const [pending, setPending] = useState<PendingArtist[]>(SAMPLE_PENDING)

  const handleApprove = (id: string) => {
    setPending((prev) => prev.filter((artist) => artist.id !== id))
    // TODO: Call API to approve artist
  }

  const handleReject = (id: string) => {
    setPending((prev) => prev.filter((artist) => artist.id !== id))
    // TODO: Call API to reject artist
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Pending Artists"
        description={`${pending.length} artist${pending.length !== 1 ? "s" : ""} awaiting approval`}
      />
      <div className="flex-1 p-6 overflow-auto">
        {pending.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground text-lg">No pending artists</p>
            <p className="text-muted-foreground text-sm mt-2">All submissions have been reviewed</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pending.map((artist) => (
              <PendingArtistCard
                key={artist.id}
                artist={artist}
                onApprove={() => handleApprove(artist.id)}
                onReject={() => handleReject(artist.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
