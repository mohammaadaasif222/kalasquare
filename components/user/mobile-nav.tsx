"use client"

import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  VideoIcon,
  Eye,
  User,
  Share2,
  SearchCheck,
  Star,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

interface MobileNavProps {
  activeNav: string
  setActiveNav: (nav: string) => void
  onLogout?: () => void
}

export default function MobileNav({ activeNav, setActiveNav, onLogout }: MobileNavProps) {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "edit-profile", label: "Edit Profile", icon: User },
    { id: "wacth-earn", label: "Watch & Earn", icon: VideoIcon },
    { id: "public-profile", label: "View Profile", icon: Eye },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "projects", label: "Search Projects", icon: SearchCheck },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "memberships", label: "Memberships", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const quickLinks = [
    { id: "social-accounts", label: "Social Media", icon: Share2 },
    { id: "work-sample", label: "Update Work", icon: Video },
    { id: "public-profile", label: "View Public Profile", icon: Eye },
  ]

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId)
    if (itemId === "public-profile" && user) {
      router.push(`/top-creators/${user.id}`)
    }
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border z-50">
      <div className="flex items-center overflow-x-auto no-scrollbar h-20 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors flex-shrink-0",
                activeNav === item.id
                  ? "text-sidebar-primary-foreground bg-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
              title={item.label}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}

        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors flex-shrink-0",
                activeNav === item.id
                  ? "text-sidebar-primary-foreground bg-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
              title={item.label}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}

        <button
          onClick={onLogout}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors flex-shrink-0"
          title="Log Out"
        >
          <LogOut size={20} />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </nav>
  )
}
