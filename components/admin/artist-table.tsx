"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

interface Artist {
  id: string
  name: string
  email: string
  genre: string
  status: "active" | "inactive"
  joinDate: string
  followers: number
}

interface ArtistTableProps {
  artists: Artist[]
  sortBy: "name" | "followers" | "joinDate"
  onSortChange: (sortBy: "name" | "followers" | "joinDate") => void
}

export function ArtistTable({ artists, sortBy, onSortChange }: ArtistTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const SortHeader = ({
    label,
    sortKey,
  }: {
    label: string
    sortKey: "name" | "followers" | "joinDate"
  }) => (
    <button
      onClick={() => onSortChange(sortKey)}
      className="flex items-center gap-2 hover:text-primary transition-colors"
    >
      {label}
      {sortBy === sortKey && <ArrowUpDown className="w-4 h-4" />}
    </button>
  )

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <SortHeader label="Name" sortKey="name" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Genre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <SortHeader label="Followers" sortKey="followers" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <SortHeader label="Joined" sortKey="joinDate" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{artist.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{artist.email}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{artist.genre}</td>
                <td className="px-6 py-4 text-sm">
                  <Badge variant={artist.status === "active" ? "default" : "secondary"}>{artist.status}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{artist.followers.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(artist.joinDate)}</td>
                <td className="px-6 py-4 text-sm">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {artists.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No artists found</p>
        </div>
      )}
    </div>
  )
}
