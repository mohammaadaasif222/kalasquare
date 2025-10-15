"use client"

import { VenueCard } from "./venue-card"

const venues = [
  {
    coverSrc: "/vanues/venue-cover-5.jpg",
    logoSrc: "/vanues/comedy-county.jpg",
    name: "Comedy County",
    city: "Noida",
    rating: 5,
  },
  {
    coverSrc: "/vanues/the-live-stage-cover.jpg",
    logoSrc: "/vanues/the-live-stage-logo.jpg",
    name: "The Live Stage",
    city: "East Delhi",
    rating: 5,
  },
  {
    coverSrc: "/vanues/rasa-the-stage-cover.jpg",
    logoSrc: "/vanues/rasa-the-stage-logo.jpg",
    name: "Rasa The Stage",
    city: "Mumbai",
    rating: 5,
  },
  {
    coverSrc: "/vanues/addy-s-studio-cover.jpg",
    logoSrc: "/vanues/addy-s-studio-logo.jpg",
    name: "Addy Studio & Productions",
    city: "South Delhi",
    rating: 5,
  },
  {
    coverSrc: "/vanues/venue-cover-5.jpg",
    logoSrc: "/vanues/venue-logo-5.jpg",
    name: "Stage Five",
    city: "Gurugram",
    rating: 5,
  },
]

export function VenuesSection() {
  return (
    <section aria-labelledby="venues-heading" className="mx-auto max-w-7xl py-8 md:py-12 lg:py-16">
      <header className="mb-6 px-4 md:px-6 lg:px-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 id="venues-heading" className="text-pretty text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          Venues
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Discover amazing venues for your next event
        </p>
      </header>

      {/* 
        Mobile: horizontal snap-scrolling with 2 cards visible per view
        Desktop (md+): 5-column grid, no horizontal scroll
      */}
      <div
        className="
          flex gap-4 overflow-x-auto px-4 md:px-6 lg:px-8 pb-4
          snap-x snap-mandatory scroll-smooth
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:snap-none
        "
      >
        {venues.map((v, i) => (
          <div
            key={i}
            className="
              snap-start flex-none
              w-[calc(50%-0.5rem)]
              md:w-auto md:snap-align-none
              h-full
            "
            aria-roledescription="carousel item"
          >
            <VenueCard {...v} delay={i * 100} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default VenuesSection