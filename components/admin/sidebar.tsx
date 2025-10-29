"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Plus, Clock, Settings, ChevronDown, ChevronRight, Music, Calendar, DollarSign, BarChart3, FileText, Mail, Shield, Globe, LogOut, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Logo from "../shared/Logo"
import { AppDispatch } from "@/lib/redux/store"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/lib/redux/features/auth/authSlice"
import { useRouter } from "next/navigation"

interface NavItem {
  label: string
  href?: string
  icon: any
  submenu?: NavItem[]
}

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>(["Artists", "Content", "Finance"])
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push("/")
  }
  const toggleMenu = (label: string) => {
    setOpenMenus(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: BarChart3,
    },
    {
      label: "Artists",
      icon: Users,
      submenu: [
        {
          label: "All Artists",
          href: "/admin/artists",
          icon: Users,
        },
        {
          label: "Add Artist",
          href: "/admin/artists/new",
          icon: Plus,
        },
        {
          label: "Pending Approval",
          href: "/admin/artists/pending",
          icon: Clock,
        },
        {
          label: "Verified Artists",
          href: "/admin/artists/verified",
          icon: Shield,
        },
      ],
    },
    {
      label: "Content",
      icon: Music,
      submenu: [
        {
          label: "All Content",
          href: "/admin/content",
          icon: Music,
        },
        {
          label: "Songs",
          href: "/admin/content/songs",
          icon: Music,
        },
        {
          label: "Albums",
          href: "/admin/content/albums",
          icon: FileText,
        },
        {
          label: "Pending Review",
          href: "/admin/content/pending",
          icon: Clock,
        },
      ],
    },
    {
      label: "Events",
      icon: Calendar,
      submenu: [
        {
          label: "All Events",
          href: "/admin/events",
          icon: Calendar,
        },
        {
          label: "Create Event",
          href: "/admin/events/new",
          icon: Plus,
        },
        {
          label: "Past Events",
          href: "/admin/events/past",
          icon: Clock,
        },
      ],
    },
    {
      label: "Finance",
      icon: DollarSign,
      submenu: [
        {
          label: "Payments",
          href: "/admin/finance/payments",
          icon: DollarSign,
        },
        {
          label: "Royalties",
          href: "/admin/finance/royalties",
          icon: BarChart3,
        },
        {
          label: "Invoices",
          href: "/admin/finance/invoices",
          icon: FileText,
        },
      ],
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: Mail,
    },
    {
      label: "Website",
      icon: Globe,
      submenu: [
        {
          label: "Pages",
          href: "/admin/website/pages",
          icon: FileText,
        },
        {
          label: "Banners",
          href: "/admin/banner",
          icon: Image,
        },
        {
          label: "SEO",
          href: "/admin/website/seo",
          icon: Globe,
        },
      ],
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const renderNavItem = (item: NavItem, level = 0) => {
    const Icon = item.icon
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isOpen = openMenus.includes(item.label)
    const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))

    if (hasSubmenu) {
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              level > 0 && "pl-8"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs flex-1">{item.label}</span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {isOpen && (
            <div className="ml-4 mt-1 space-y-1">
              {item.submenu?.map(subItem => renderNavItem(subItem, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          level > 0 && "pl-8"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="text-xs">{item.label}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
        <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
      </div>
    </aside>
  )
}