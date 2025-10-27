"use client"

import { useState } from "react"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PendingArtist {
  id: string
  name: string
  email: string
  submittedDate: string
  status: "pending" | "reviewing" | "rejected"
  reason?: string
}

const mockPendingArtists: PendingArtist[] = [
  {
    id: "1",
    name: "Alex Turner",
    email: "alex@example.com",
    submittedDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    name: "Jordan Smith",
    email: "jordan@example.com",
    submittedDate: "2024-01-14",
    status: "reviewing",
  },
  {
    id: "3",
    name: "Casey Brown",
    email: "casey@example.com",
    submittedDate: "2024-01-10",
    status: "rejected",
    reason: "Incomplete profile information",
  },
]

export function PendingArtistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [artists] = useState<PendingArtist[]>(mockPendingArtists)

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "reviewing":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Pending Artists</h2>
        <p className="text-muted-foreground mt-2">Review and manage pending artist applications</p>
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
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Submitted Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.map((artist, index) => (
              <TableRow key={artist.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{artist.name}</TableCell>
                <TableCell className="text-sm">{artist.email}</TableCell>
                <TableCell className="text-sm">{artist.submittedDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(artist.status)}
                    <span className="text-sm font-medium capitalize">{artist.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {artist.status === "pending" && (
                      <>
                        <Button size="sm" variant="default" className="text-xs">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Reject
                        </Button>
                      </>
                    )}
                    {artist.status === "reviewing" && (
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Details
                      </Button>
                    )}
                    {artist.status === "rejected" && (
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Resubmit
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pending artists found.</p>
        </div>
      )}
    </div>
  )
}
