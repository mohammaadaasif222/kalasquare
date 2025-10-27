"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TalentFiltersProps {
  filters: {
    talent_type: string
    status: string
    is_premium: boolean
    verify_badge: boolean
  }
  onFilterChange: (filters: any) => void
}

const TALENT_TYPES = ["actor", "director", "producer", "cinematographer", "editor"]
const STATUSES = ["available", "busy", "pending"]

export default function TalentFilters({ filters, onFilterChange }: TalentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTalentTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      talent_type: filters.talent_type === type ? "" : type,
    })
  }

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: filters.status === status ? "" : status,
    })
  }

  const handlePremiumChange = () => {
    onFilterChange({
      ...filters,
      is_premium: !filters.is_premium,
    })
  }

  const handleVerifiedChange = () => {
    onFilterChange({
      ...filters,
      verify_badge: !filters.verify_badge,
    })
  }

  const activeFilters = [
    filters.talent_type,
    filters.status,
    filters.is_premium && "premium",
    filters.verify_badge && "verified",
  ].filter(Boolean).length

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            Talent Type
            {filters.talent_type && (
              <span className="ml-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {filters.talent_type}
              </span>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {TALENT_TYPES.map((type) => (
            <DropdownMenuItem key={type} onClick={() => handleTalentTypeChange(type)}>
              <input type="checkbox" checked={filters.talent_type === type} onChange={() => {}} className="mr-2" />
              <span className="capitalize">{type}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            Status
            {filters.status && (
              <span className="ml-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {filters.status}
              </span>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {STATUSES.map((status) => (
            <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
              <input type="checkbox" checked={filters.status === status} onChange={() => {}} className="mr-2" />
              <span className="capitalize">{status}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant={filters.is_premium ? "default" : "outline"} size="sm" onClick={handlePremiumChange}>
        {filters.is_premium ? "✓ " : ""}Premium
      </Button>

      <Button variant={filters.verify_badge ? "default" : "outline"} size="sm" onClick={handleVerifiedChange}>
        {filters.verify_badge ? "✓ " : ""}Verified
      </Button>

      {activeFilters > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onFilterChange({
              talent_type: "",
              status: "",
              is_premium: false,
              verify_badge: false,
            })
          }
        >
          Clear filters
        </Button>
      )}
    </div>
  )
}
