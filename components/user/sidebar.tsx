"use client"

import { Home, BookOpen, Briefcase, BarChart3, Settings, LogOut, FileText, Eye, User, Share2, VideoIcon, SearchCheck, Star, MedalIcon, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppDispatch, RootState } from '@/lib/redux/store';
import { logoutUser } from "@/lib/redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import ProfileCard from "./ProfileCard"
import Logo from "../shared/Logo"
import { useSelector } from "react-redux";
import MobileNav from "./mobile-nav";
interface SidebarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push("/")
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "edit-profile", label: "Edit Profile", icon: User, action: "edit-profile" },
    { id: "wacth-earn", label: "Watch & Earn", icon: VideoIcon },
    { id: "public-profile", label: "View Profile", icon: Eye },
    { id: "bookings", label: "Booking & Collabs ", icon: BookOpen },
    { id: "projects", label: "Search Projects", icon: SearchCheck },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "memberships", label: "Memberships", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const quickLinks = [
    // { id: "/", label: "Profile", icon: User, action: "edit-profile" },
    { id: "social-accounts", label: "Social Media", icon: Share2 },
    { id: "work-sample", label: "Update Work", icon: Video, },
    // { id: "public-profile", label: "View Public Profile", icon: Eye },
  ]

  return (
    <aside className="hidden md:flex no-scrollbar flex-col w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
      {/* Logo */}
      <Logo />
      <ProfileCard />


      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id)
                if (item.id === 'public-profile' && user) {
                  router.push(`/top-creators/${user.id}`)
                }
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeNav === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Quick Links */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wide mb-3">Quick Links</h3>
        <nav className="space-y-2">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id)

                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                  activeNav === (item.id)
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <MobileNav activeNav={activeNav} setActiveNav={setActiveNav} onLogout={handleLogout} />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </aside>
  )
}
