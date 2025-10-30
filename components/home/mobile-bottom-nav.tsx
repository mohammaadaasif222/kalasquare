// "use client"

// import Link from "next/link"
// import { Home, Search, Ticket, Calendar, User, LogOut } from "lucide-react"
// import { usePathname, useRouter } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { useCallback } from "react"
// import { useSelector } from "react-redux"
// import { AppDispatch, RootState } from "@/lib/redux/store"
// import { useDispatch } from "react-redux"
// import { logoutUser } from "@/lib/redux/features/auth/authSlice"


// const baseItems = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/explore", label: "Explore", icon: Search },
//   { href: "/shows", label: "Shows", icon: Ticket },
//   { href: "/events", label: "Events", icon: Calendar },
// ]

// export function MobileBottomNav() {
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth)

//   const router = useRouter()
//   const dispatch = useDispatch<AppDispatch>();
//   const pathname = usePathname()

//   const handleLogout = useCallback(async () => {
//     await dispatch(logoutUser())
//     router.push("/")

//   }, [])

//   const items = isAuthenticated
//     ? [...baseItems, { href: "/user", label: "Profile", icon: User }]
//     : [...baseItems, { href: "/login", label: "Login", icon: User }]

//   return (
//     <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background sm:hidden">
//       <ul className="mx-auto flex max-w-screen-sm items-stretch justify-between px-2 py-1">
//         {items.map(({ href, label, icon: Icon }) => {
//           const active = pathname === href
//           return (
//             <li key={href} className="flex-1">
//               <Link
//                 href={href}
//                 className={cn(
//                   "flex flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[11px]",
//                   active ? "text-primary" : "text-muted-foreground",
//                 )}
//                 aria-current={active ? "page" : undefined}
//               >
//                 <Icon className={cn("h-5 w-5", active && "text-primary")} />
//                 <span className="leading-none">{label}</span>
//               </Link>
//             </li>
//           )
//         })}
//         {isAuthenticated && (
//           <li className="flex-1">
//             <button
//               onClick={handleLogout}
//               className={cn(
//                 "flex w-full flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[11px]",
//                 "text-muted-foreground hover:text-primary transition-colors",
//               )}
//               aria-label="Logout"
//             >
//               <LogOut className="h-5 w-5" />
//               <span className="leading-none">Logout</span>
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   )
// }

"use client"

import Link from "next/link"
import { Home, Search, Ticket, Calendar, User, LogOut, Filter } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/lib/redux/features/auth/authSlice"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const baseItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/shows", label: "Shows", icon: Ticket },
  { href: "/events", label: "Events", icon: Calendar },
]

interface MobileBottomNavProps {
  categories?: Array<{ id: string; name: string }>
  selectedCategories?: string[]
  onCategoryChange?: (categoryId: string) => void
  cities?: Array<{ id: string; name: string }>
  selectedCity?: string
  onCityChange?: (cityId: string) => void
  selectedRating?: number
  onRatingChange?: (rating: number) => void
}

export function MobileBottomNav({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  cities = [],
  selectedCity,
  onCityChange,
  selectedRating,
  onRatingChange,
}: MobileBottomNavProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const pathname = usePathname()

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser())
    router.push("/")
  }, [])

  const items = isAuthenticated
    ? [...baseItems, { href: "/user", label: "Profile", icon: User }]
    : [...baseItems, { href: "/login", label: "Login", icon: User }]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background sm:hidden">
      <ul className="mx-auto flex max-w-screen-sm items-stretch justify-between px-2 py-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[11px]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-5 w-5", active && "text-primary")} />
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          )
        })}

        <li className="flex-1">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "flex w-full flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[11px]",
                  "text-muted-foreground hover:text-primary transition-colors",
                )}
                aria-label="Filters"
              >
                <Filter className="h-5 w-5" />
                <span className="leading-none">Filters</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-4">
                {/* Categories Filter */}
                {categories.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => onCategoryChange?.(category.id)}
                          />
                          <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* City Filter */}
                {cities.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">City</h3>
                    <Select value={selectedCity || ""} onValueChange={onCityChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Rating Filter */}
                {onRatingChange && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Minimum Rating</h3>
                    <Select
                      value={selectedRating?.toString() || ""}
                      onValueChange={(value) => onRatingChange(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All Ratings</SelectItem>
                        <SelectItem value="1">1+ Stars</SelectItem>
                        <SelectItem value="2">2+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsFilterOpen(false)}>
                  Close
                </Button>
                <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </li>

        {isAuthenticated && (
          <li className="flex-1">
            <button
              onClick={handleLogout}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[11px]",
                "text-muted-foreground hover:text-primary transition-colors",
              )}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="leading-none">Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
