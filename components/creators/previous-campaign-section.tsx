"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Campaign {
  id: string
  title: string
  description: string
  image: string
  brand: string
  date: string
}

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Summer Collection 2024",
    description: "Collaborated with leading fashion brand for summer collection launch",
    image: "/fashion-campaign-summer.jpg",
    brand: "Fashion Brand",
    date: "June 2024",
  },
  {
    id: "2",
    title: "Beauty Product Launch",
    description: "Exclusive makeup line collaboration and product showcase",
    image: "/beauty-makeup-campaign.jpg",
    brand: "Beauty Co",
    date: "May 2024",
  },
  {
    id: "3",
    title: "Lifestyle Brand Partnership",
    description: "Premium lifestyle brand collaboration for seasonal campaign",
    image: "/lifestyle-brand-campaign.jpg",
    brand: "Lifestyle Plus",
    date: "April 2024",
  },
  {
    id: "4",
    title: "Digital Marketing Campaign",
    description: "Social media campaign for tech startup product launch",
    image: "/tech-digital-campaign.jpg",
    brand: "Tech Startup",
    date: "March 2024",
  },
]

export default function PreviousCampaignSection() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("campaign-carousel")
    if (container) {
      const scrollAmount = 320
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      container.scrollLeft = newPosition
      setScrollPosition(newPosition)
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Previous Campaigns</h2>
          <p className="text-sm text-muted-foreground">Successful brand collaborations and projects</p>
        </div>
        <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-red-50">
          View All
        </Button>
      </div>

      {/* Desktop View - Carousel */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div
          id="campaign-carousel"
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="flex-shrink-0 w-58 group cursor-pointer">
              <div className="bg-white rounded shadow-md hover:shadow-xl transition-all overflow-hidden">
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Campaign Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-block bg-red-100 text-destructive text-xs font-semibold px-2.5 py-1 rounded-full">
                      {campaign.brand}
                    </span>
                    <span className="text-xs text-muted-foreground">{campaign.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{campaign.description}</p>
                  <Button className="w-full bg-destructive hover:bg-destructive/90 text-white group/btn">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile View - Compact Stack */}
      <div className="md:hidden space-y-3">
        {campaigns.slice(0, 3).map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3">
              {/* Compact Image */}
              <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Compact Info */}
              <div className="flex-1 py-2 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-red-100 text-destructive text-xs font-semibold px-2 py-0.5 rounded">
                    {campaign.brand}
                  </span>
                  <span className="text-xs text-muted-foreground">{campaign.date}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{campaign.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{campaign.description}</p>
                <Button size="sm" className="w-full h-7 bg-destructive hover:bg-destructive/90 text-white text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
