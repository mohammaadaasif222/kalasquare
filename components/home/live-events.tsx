"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { LiveCard } from "./live-card"

interface SectionHeaderProps {
  title: string
  href?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, href }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    {href && (
      <a href={href} className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
        View All
        <ChevronRight className="w-4 h-4 ml-1" />
      </a>
    )}
  </div>
)

export default function LiveEventsSection() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const events = [
    {
      title: "ICC WOMEN'S CWC 2025",
      eventCount: "Featured Event",
      color: "bg-purple-600",
      image: "/singing.webp",
    },
    {
      title: "COMEDY SHOWS",
      eventCount: "230+ Events",
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
      image: "/nanhe-funkar.webp",
    },
    {
      title: "AMUSEMENT PARK",
      eventCount: "15+ Events",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      image: "/melody-evenings.webp",
    },
    {
      title: "THEATRE SHOWS",
      eventCount: "95+ Events",
      color: "bg-gradient-to-br from-blue-600 to-teal-600",
      image: "/open-mic-events.webp",
    },
    {
      title: "KIDS",
      eventCount: "35+ Events",
      color: "bg-gradient-to-br from-blue-400 to-purple-500",
      image: "/talent-ki-class.webp",
    },
  ]

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("live-events-scroll-container")
    if (!container) return
    const scrollAmount = direction === "left" ? -300 : 300
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const updateScrollButtons = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setScrollPosition(target.scrollLeft)
  }

  return (
    <section className="w-full py-8 px-4 max-w-7xl mx-auto">
      <SectionHeader title="Live Show" href="#" />

      {/* Desktop and larger (md+) - EXACTLY 5 equal columns */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {events.map((event, index) => (
          <div key={index} className="w-full">
            <LiveCard {...event} />
          </div>
        ))}
      </div>

      {/* Mobile (< md) - Horizontal scroll keeps existing behavior */}
      <div className="relative md:hidden mt-1">
        {/* Cards Container */}
        <div
          id="live-events-scroll-container"
          onScroll={updateScrollButtons}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {events.map((event, index) => (
            <div key={index} className="flex-none w-[calc(50%-6px)] snap-start">
              <LiveCard {...event} />
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: Math.ceil(events.length / 2) }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                Math.floor(scrollPosition / 200) === idx ? "w-6 bg-blue-500" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
