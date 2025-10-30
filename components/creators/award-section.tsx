"use client"

import { Trophy, AwardIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Award {
  id: string
  title: string
  organization: string
  year: string
  category: string
  image: string
}

const awards: Award[] = [
  {
    id: "1",
    title: "Best Influencer Award",
    organization: "Digital Excellence Awards",
    year: "2024",
    category: "Content Creator",
    image: "/award-best-influencer.jpg",
  },
  {
    id: "2",
    title: "Rising Star Recognition",
    organization: "Entertainment Industry Awards",
    year: "2023",
    category: "Emerging Talent",
    image: "/award-rising-star.jpg",
  },
  {
    id: "3",
    title: "Social Impact Award",
    organization: "Community Excellence Awards",
    year: "2023",
    category: "Social Responsibility",
    image: "/award-social-impact.jpg",
  },
  {
    id: "4",
    title: "Brand Ambassador Excellence",
    organization: "Marketing & Branding Awards",
    year: "2022",
    category: "Partnership",
    image: "/award-brand-ambassador.jpg",
  },
]

export default function AwardSection() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-destructive" />
            <h2 className="text-2xl font-bold text-foreground">Awards & Recognition</h2>
          </div>
          <p className="text-sm text-muted-foreground">Achievements and accolades</p>
        </div>
        <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-red-50">
          View All
        </Button>
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {awards.map((award) => (
          <div
            key={award.id}
            className="group cursor-pointer bg-white rounded shadow hover:shadow-sm transition-all overflow-hidden border border-gray-100 hover:border-destructive/20"
          >
            {/* Award Image */}
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center">
              <img
                src={award.image || "/placeholder.svg"}
                alt={award.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>

            {/* Award Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AwardIcon className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-xs font-semibold text-destructive uppercase tracking-wide">{award.year}</span>
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2 group-hover:text-destructive transition-colors">
                {award.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{award.organization}</p>
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                {award.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet View - 2 Column Grid */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
        {awards.slice(0, 4).map((award) => (
          <div
            key={award.id}
            className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100"
          >
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center">
              <img
                src={award.image || "/placeholder.svg"}
                alt={award.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <AwardIcon className="w-3 h-3 text-destructive flex-shrink-0" />
                <span className="text-xs font-semibold text-destructive">{award.year}</span>
              </div>
              <h3 className="font-bold text-foreground text-xs mb-1 line-clamp-2">{award.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{award.organization}</p>
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {award.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Compact Vertical Stack */}
      <div className="sm:hidden space-y-2">
        {awards.slice(0, 3).map((award) => (
          <div
            key={award.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex gap-3 p-3">
              {/* Compact Award Badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                <img src={award.image || "/placeholder.svg"} alt={award.title} className="w-full h-full object-cover" />
              </div>

              {/* Compact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <AwardIcon className="w-3 h-3 text-destructive flex-shrink-0" />
                  <span className="text-xs font-bold text-destructive">{award.year}</span>
                </div>
                <h3 className="font-semibold text-foreground text-xs mb-0.5 line-clamp-1">{award.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{award.organization}</p>
                <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-1.5 py-0.5 rounded">
                  {award.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
