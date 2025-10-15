"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EventCard, type EventItem } from "./event-card"
import { useState } from "react"

const events: EventItem[] = [
  {
    id: "1",
    title: "Private Dinner Meetup — Million Dollar D2C Founders",
    city: "Chennai",
    dateLabel: "Oct 23, 2025",
    priceType: "Free",
    verified: true,
    imageUrl: "/event-poster-blue-tech-meetup.jpg",
  },
  {
    id: "2",
    title: "IRUVAR — Echoes Of...",
    city: "Chennai",
    dateLabel: "Oct 25, 2025",
    priceType: "Paid",
    verified: true,
    imageUrl: "/event-poster-typography-yellow-on-gray.jpg",
  },
  {
    id: "3",
    title: "Sanjay Sabha Live...",
    city: "Chennai",
    dateLabel: "Dec 24, 2025",
    priceType: "Paid",
    verified: true,
    imageUrl: "/classical-music-concert-poster-black-green.jpg",
  },
  {
    id: "4",
    title: "Sanjay Sabha Live...",
    city: "Chennai",
    dateLabel: "Dec 25, 2025",
    priceType: "Paid",
    verified: true,
    imageUrl: "/classical-music-concert-poster-black-green-variant.jpg",
  },
  {
    id: "5",
    title: "Sanjay Sabha Live...",
    city: "Chennai",
    dateLabel: "Dec 28, 2025",
    priceType: "Paid",
    verified: true,
    imageUrl: "/classical-music-concert-poster-black-green-third.jpg",
  },
  {
    id: "6",
    title: "Theera Ulaa Singa...",
    city: "Chennai",
    dateLabel: "Nov 01, 2025",
    priceType: "Paid",
    verified: true,
    imageUrl: "/colorful-festival-poster-temple-art.jpg",
  },
]

export  function FeaturedEventsSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('events-scroll-container')
    if (!container) return

    const scrollAmount = direction === 'left' ? -300 : 300
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const updateScrollButtons = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setScrollPosition(target.scrollLeft)
    setCanScrollLeft(target.scrollLeft > 0)
    setCanScrollRight(
      target.scrollLeft < target.scrollWidth - target.clientWidth - 10
    )
  }

  return (
    <section className="w-full py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Featured Events ✨
        </h2>
        <p className="mt-1.5 text-sm text-gray-600 sm:text-base">
          Explore top events and unforgettable experiences
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow - Hidden on mobile if can't scroll */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Cards Container */}
        <div
          id="events-scroll-container"
          onScroll={updateScrollButtons}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-4 sm:overflow-visible pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-none w-[calc(50%-6px)] snap-start sm:w-auto sm:flex-auto"
            >
              <EventCard item={event} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Mobile scroll indicator dots */}
      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {Array.from({ length: Math.ceil(events.length / 2) }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              Math.floor(scrollPosition / 200) === idx
                ? 'w-6 bg-blue-500'
                : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}