"use client"

import { Home, BookOpen, Briefcase, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export default function MobileNav({ activeNav, setActiveNav }: MobileNavProps) {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
