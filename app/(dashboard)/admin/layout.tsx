import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/admin/sidebar"

export const metadata: Metadata = {
  title: "Artist Admin Dashboard",
  description: "Manage artists and submissions",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
