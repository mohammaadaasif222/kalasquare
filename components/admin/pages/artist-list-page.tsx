"use client"

import { useState } from "react"
import { Search, MoreVertical, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Artist {
  id: string
  name: string
  email: string
  emailVerified: boolean
  onboardCreators: boolean
  trendingInfluencer: boolean
  status: "active" | "inactive" | "pending"
  verified: boolean
  views: number
}

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    emailVerified: true,
    onboardCreators: true,
    trendingInfluencer: true,
    status: "active",
    verified: true,
    views: 1250,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    emailVerified: false,
    onboardCreators: false,
    trendingInfluencer: false,
    status: "pending",
    verified: false,
    views: 340,
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    emailVerified: true,
    onboardCreators: true,
    trendingInfluencer: false,
    status: "active",
    verified: true,
    views: 2100,
  },
]

export function ArtistListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [artists] = useState<Artist[]>(mockArtists)

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Artist List</h2>
        <p className="text-muted-foreground mt-2">Manage and view all registered artists</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">SN</TableHead>
              <TableHead className="font-semibold">Artists</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Email Verified</TableHead>
              <TableHead className="font-semibold">Onboard Creators</TableHead>
              <TableHead className="font-semibold">Trending Influencer</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Verify</TableHead>
              <TableHead className="font-semibold">Views</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.map((artist, index) => (
              <TableRow key={artist.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{artist.name}</TableCell>
                <TableCell className="text-sm">{artist.email}</TableCell>
                <TableCell>
                  {artist.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  {artist.onboardCreators ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  {artist.trendingInfluencer ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      artist.status === "active"
                        ? "bg-green-100 text-green-800"
                        : artist.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant={artist.verified ? "outline" : "default"} className="text-xs">
                    {artist.verified ? "Verified" : "Verify"}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{artist.views}</TableCell>
                <TableCell>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artists found matching your search.</p>
        </div>
      )}
    </div>
  )
}
