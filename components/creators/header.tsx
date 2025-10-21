"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">KalaSquare</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">
              Login
            </a>
            <a href="#" className="hover:text-foreground transition">
              New Talent
            </a>
            <a href="#" className="hover:text-foreground transition">
              Top Creators
            </a>
            <a href="#" className="hover:text-foreground transition">
              Events & Shows
            </a>
            <a href="#" className="hover:text-foreground transition">
              Exclusive
            </a>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-muted-foreground">Delhi, NCR</span>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign In</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
