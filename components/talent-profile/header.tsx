"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">TALENT</div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:opacity-80">
            Hire Talent
          </a>
          <a href="#" className="hover:opacity-80">
            Top Creators
          </a>
          <a href="#" className="hover:opacity-80">
            Events & Promo
          </a>
          <a href="#" className="hover:opacity-80">
            Exclusive
          </a>
          <a href="#" className="hover:opacity-80">
            Talent Management
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-white text-accent px-4 py-1 rounded text-sm font-medium hover:opacity-90">
            Sign In
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-accent/95 px-4 py-4 space-y-3 text-sm">
          <a href="#" className="block hover:opacity-80">
            Hire Talent
          </a>
          <a href="#" className="block hover:opacity-80">
            Top Creators
          </a>
          <a href="#" className="block hover:opacity-80">
            Events & Promo
          </a>
          <a href="#" className="block hover:opacity-80">
            Exclusive
          </a>
          <a href="#" className="block hover:opacity-80">
            Talent Management
          </a>
        </nav>
      )}
    </header>
  )
}
