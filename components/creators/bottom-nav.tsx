"use client"

import { Home, Search, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavProps {
  activeNav: string
  onNavChange: (nav: string) => void
}

export default function BottomNav({ activeNav, onNavChange }: BottomNavProps) {
  const navItems = [
    { id: "explore", icon: Home, label: "Explore" },
    { id: "search", icon: Search, label: "Search" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "menu", icon: Menu, label: "Menu" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border lg:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavChange(item.id)}
              className={`flex-1 h-16 flex flex-col items-center justify-center gap-1 rounded-none ${
                activeNav === item.id ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
