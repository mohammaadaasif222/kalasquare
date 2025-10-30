"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalResults: number
}

export default function SearchBar({ searchQuery, onSearchChange, sortBy, onSortChange, totalResults }: SearchBarProps) {
  return (
    <div className="mb-8  mt-5 md:mt-0 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search creators by name or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 py-6 text-base"
        />
      </div>

      {/* Results and Sort */}
      <div className="flex  sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted p-4 rounded-lg">
        <div className="text-sm">
          <span className="font-semibold">Total {totalResults}</span>
          <span className="text-muted-foreground"> Found</span>
          <span className="text-muted-foreground"> • Sort By: </span>
          <span className="font-medium capitalize">{sortBy}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Sort By:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="active">Most Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
