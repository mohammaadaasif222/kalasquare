"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"
import Image from "next/image"

interface Talent {
  id: string
  display_name: string
  email: string
  talent_type: string
  categories: string[]
  status: string
  followers: number
  is_premium: boolean
  verify_badge: boolean
  location: string
  created_at: string
}

interface TalentListTableProps {
  talents: Talent[]
  onTalentClick: (id: string) => void
}

export default function TalentListTable({ talents, onTalentClick }: TalentListTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      case "busy":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400"
      case "pending":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }
    const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="overflow-x-auto">
      
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sr</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Talent</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Followers</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Verified</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Premium</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Joined At</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((talent, index) => (
            <tr
              key={talent.id}
              onClick={() => onTalentClick(talent.id)}
              className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <p className="text-foreground">#{index + 1}</p>

              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-foreground">{talent.display_name}</p>
                  <p className="text-sm text-muted-foreground">{talent.email}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant="secondary" className="capitalize">
                  {talent.talent_type}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(talent.status)}`}
                >
                  {talent.status.charAt(0).toUpperCase() + talent.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-foreground">{talent.followers}</p>
              </td>
              <td className="px-6 py-4">
                {talent.verify_badge ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src="/verifybadge.png"
                      alt="Verified Badge"
                      width={20}
                      height={20}
                      className="object-contain"
                    />

                  </div>
                ) : (
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                )}
              </td>
              <td className="px-6 py-4">
                {talent.is_premium ? (
                  <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400">Premium</Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-muted-foreground">{talent.location}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-muted-foreground">{formatDate(talent.created_at)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
