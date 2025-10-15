import { CalendarDays, Grid2X2, Home, Radio, User2 } from "lucide-react"
import Link from "next/link"

export function MobileBottomNav() {
  const items = [
    { href: "#", label: "Home", icon: Home },
    { href: "#categories", label: "Categories", icon: Grid2X2 },
    { href: "#live", label: "Live", icon: Radio },
    { href: "#events", label: "Events", icon: CalendarDays },
    { href: "#profile", label: "Profile", icon: User2 },
  ]
  return (
    <nav aria-label="Primary" className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t bg-card">
      <ul className="grid grid-cols-5 h-16">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex h-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span className="leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-2" />
    </nav>
  )
}