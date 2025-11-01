"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import TalentFilters from "@/components/admin/pages/talent-filters"
import TalentListTable from "@/components/admin/pages/talent-list-table"
import { useAdminUsers } from "@/hooks/use-user"

export default function TalentListPage() {
  const router = useRouter()
  const { adminUserList, adminPagination, isLoading, error, fetchAdminUsers } = useAdminUsers()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    talent_type: "",
    status: "",
    is_premium: false,
    verify_badge: false,
    email_verified: false,
  })

  useEffect(() => {
    fetchAdminUsers({
      page: currentPage,
      limit: 10,
      search: searchTerm || undefined,
      talent_type: filters.talent_type || undefined,
      is_active: filters.status ? filters.status === "available" : undefined,
      is_premium: filters.is_premium || undefined,
      email_verified: filters.verify_badge || undefined,
    })
  }, [searchTerm, currentPage, filters, fetchAdminUsers])

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }, [])

  const handleTalentClick = (talentId: string) => {
    router.push(`/admin/artists/${talentId}`)
  }

  const totalPages = adminPagination?.totalPages || 1

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Talent Management</h1>
          <p className="text-muted-foreground">Manage and view all registered talents on your platform</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-11"
              disabled={isLoading}
            />
          </div>

          <TalentFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Results Info */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{adminUserList?.length || 0}</span> of{" "}
            <span className="font-semibold text-foreground">{adminPagination?.total || 0}</span> talents
          </p>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border border-red-500/50 bg-red-500/10 p-4 mb-6">
            <p className="text-red-700 dark:text-red-400">Error loading talents: {error}</p>
          </Card>
        )}

        {/* Table */}
        <Card className="border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full  bg-gray-100" />
              ))}
            </div>
          ) : adminUserList && adminUserList.length > 0 ? (
            <TalentListTable talents={adminUserList} onTalentClick={handleTalentClick} />
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No talents found matching your filters.</p>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
              <span className="font-semibold text-foreground">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
