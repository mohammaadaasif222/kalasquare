'use client'
import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHeader } from "@/components/home/section-header"
import { HScroll } from "@/components/home/hs-scroll"

import { MobileBottomNav } from "@/components/home/mobile-bottom-nav"
import { ArtistSlider } from "@/components/home/artist-slider"
import { CategoryCard } from "@/components/home/category-card"
import Image from "next/image"
import { FeaturedEventsSection } from "@/components/home/featured-events"
import LiveEventsSection from "@/components/home/live-events"
import { Button } from "@/components/ui/button"
import { VenuesSection } from "@/components/home/venues-section"



export default function HomePageComponent() {
  const actions = [
    { label: "Rising Digi Star", img: "/awards.webp" },
    { label: "Singing", img: "/fame.webp" },
    { label: "Melody", img: "/melodyaquare.webp" },
  ];
  const categories = [
    "Standup Comedy",
    "Poetry",
    "Anchors",
    "Actor / Model",
    "Influencer",
    "Singer",
    "Writer",
    "Dancer",
    "Speaker",
    "Panel / Judges",
    "Vloggers",
    "Fitness & Health",
  ].map((label) => ({
    label,
    img: `/placeholder.svg?height=320&width=320&query=${encodeURIComponent(label)}%20category%20tile`,
  }))

  const artists = [
    { name: "Mohammad Aasif", role: "Gaming", img: "/artists/stylish-gamer-portrait.jpg" },
    { name: "Pawan Bansode", role: "Singer", img: "/artists/singer-portrait-studio.jpg" },
    { name: "Alok Chauhan", role: "Standup Comedy", img: "/artists/standup-comedian-mic.jpg" },
    { name: "Vinay Khatri", role: "Singer", img: "/artists/concert-singer-red-lights.jpg" },
    { name: "Saurav Yadav", role: "Singer", img: "/artists/young-singer-outdoor.jpg" },
    { name: "Guest Artist", role: "DJ", img: "/artists/dj-turntables-neon.jpg" },
    { name: "Featured Host", role: "MC", img: "/artists/mc-on-stage.jpg" },
  ]

  const venues = [
    { name: "Comedy County", city: "Noida" },
    { name: "The Live Stage", city: "East Delhi" },
    { name: "Rosò Stage", city: "Mumbai" },
    { name: "Addy's Club", city: "South Delhi" },
  ]
  const carouselImages = [
    {
      src: "https://kalasquare.com/frontend/images/craousel1.jpg",
      alt: "Awards banner",
    },
    {
      src: "https://kalasquare.com/frontend/images/craousel2.jpg",
      alt: "Registration open",
    },
    {
      src: "/event-poster.jpg",
      alt: "Featured event",
    },
  ];
  return (
    <main className="pb-20 md:pb-8">
      {/* <section className="container mx-auto px-0 pt-3 mt-5 group relative">
        <Carousel opts={{ align: "center", loop: true, skipSnaps: false }} className="relative" aria-label="Highlights">
          <CarouselContent className="px-0">
            <CarouselItem className="basis-[88%] sm:basis-[70%]">
              <div className="overflow-hidden rounded-xs border bg-card">
                <img
                  src="https://kalasquare.com/frontend/images/craousel1.jpg"
                  alt="Awards banner"
                  className="h-44 w-full object-cover md:h-64"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[88%] sm:basis-[70%]">
              <div className="overflow-hidden rounded-xs border bg-card">
                <img
                  src="https://kalasquare.com/frontend/images/craousel2.jpg"
                  alt="Registration open"
                  className="h-44 w-full object-cover md:h-64"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[88%] sm:basis-[70%]">
              <div className="overflow-hidden rounded-xs border bg-card">
                <img
                  src="/event-poster.jpg"
                  alt="Featured event"
                  className="h-44 w-full object-cover md:h-64"
                />
              </div>
            </CarouselItem>
          </CarouselContent>

      
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-1 sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="pointer-events-auto">
              <CarouselPrevious className="left-2 bg-background/80" />
            </div>
            <div className="pointer-events-auto">
              <CarouselNext className="right-2 bg-background/80" />
            </div>
          </div>
        </Carousel>
      </section> */}

      <section className="container mx-auto px-0 pt-3 mt-5 group relative">
        <Carousel opts={{ align: "center", loop: true, skipSnaps: false }} className="relative" aria-label="Highlights">
          <CarouselContent className="px-0">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="basis-[88%] sm:basis-[70%]">
                <div className="overflow-hidden rounded-xs border bg-card">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-44 w-full object-cover md:h-64"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows (show only on hover) */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-1 sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="pointer-events-auto">
              <CarouselPrevious className="left-2 bg-background/80" />
            </div>
            <div className="pointer-events-auto">
              <CarouselNext className="right-2 bg-background/80" />
            </div>
          </div>
        </Carousel>
      </section>


      <div className="max-w-6xl m-auto">
        <section className="container mx-auto px-4 py-8">
          <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 md:gap-6">
            {actions.map(({ label, img }) => (
              <Link key={label} href="#" className="group">
                <Card className="overflow-hidden p-0 transition-all border-black shadow-sm duration-300 group-hover:border-primary group-hover:shadow-lg sm:p-2">
                  <CardContent className="p-0">
                    {/* Mobile View: Image Background with Text Overlay */}
                    <div className="relative h-32 sm:hidden">
                      <Image
                        src={img}
                        alt={label}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      {/* Blur overlay */}
                      <div className="absolute inset-0 backdrop-blur-xs bg-black/10 transition-all duration-300 group-hover:bg-black/30" />

                      {/* Text content */}
                      <div className="absolute inset-0 flex items-center justify-between px-6">
                        <span className="text-md md:text-2xl font-sans text-white font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-105">
                          {label}
                        </span>
                        <svg
                          className="w-7 h-7 text-white transition-all duration-300 group-hover:translate-x-1 drop-shadow-lg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Tablet/Desktop View: Side-by-side Layout */}
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="relative w-26 h-26 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={img}
                          alt={label}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                      </div>

                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xl font-sans transition-colors duration-300 group-hover:text-primary">
                          {label}
                        </span>
                        <svg
                          className="w-6 h-6 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* PLATINUM ARTIST */}
        <section className="container mx-auto px-4 py-8">
          <ArtistSlider title="PLATINUM ARTIST" seeAllHref="#" artists={artists} />
        </section>

        {/* POPULAR TALENT CATEGORIES */}

        <section className="py-16 md:py-16 px-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative mb-6">
                <h1 className="text-2xl md:text-3xl top-[-21px] lg:text-3xl font-mono font-semibold text-center text-black tracking-tighter relative z-10 px-4">
                  POPULAR TALENT CATEGORIES
                </h1>
                <div className="absolute top-1/2 left-0 right-0 h-10 md:h-10 bg-red-600 -translate-y-1/2 z-0"></div>
              </div>
              <p className="text-center text-muted-foreground text-base md:text-lg px-4">
                Select the most relevant performers from the best universe of talent.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-10"
              role="list"
              aria-label="Popular talent categories"
            >
              {categories.map((c) => (
                <div key={c.label} role="listitem">
                  <CategoryCard label={c.label} img={c.img} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-end px-4">
              <button className=" hover:underline text-[var(--brand)] font-normal">
                View All
              </button>
            </div>
          </div>
        </section>


        {/* REGISTER PROMO */}

        <section aria-label="Registration 2024" className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              {/* Decorative icon */}
              <div className="relative w-8 h-8 md:w-12 md:h-12 text-foreground/80" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path
                    d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="text-balance font-mono font-bold uppercase tracking-wide text-lg sm:text-xl md:text-2xl">
                REGISTER 2024
              </h2>
            </div>

            {/* Hero */}
            <div className="relative w-full h-48 sm:h-56 md:h-72 rounded-lg overflow-hidden">
              <Image src="/open-mic.webp" alt="Singing Contest Banner" fill priority className="object-cover" />

              {/* CTA */}
              <div className="relative h-full flex items-end justify-end p-3 sm:p-4 md:p-4">
                <Button className="bg-red-500 text-primary-foreground hover:bg-white border md:border-2 border-border shadow-md md:shadow-2xl uppercase md:font-normal px-4 py-3 sm:px-6 sm:py-3 md:px-4 rounded-xs hover:text-red-500 hover:border-red-500 cursor-pointer md:py-4 text-sm sm:text-base md:text-2xl tracking-tighter transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2">
                  Registration Open
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* LIVE SHOW TILES */}
        <LiveEventsSection />
        {/* FEATURED EVENTS */}
        <FeaturedEventsSection />

        {/* EMERGING ARTIST */}
        <section className="container mx-auto px-4 py-6">
          <ArtistSlider title="EMERGING ARTIST" seeAllHref="#" artists={artists} />
        </section>

        {/* VENUES */}
        <VenuesSection />
        {/* <section className="container mx-auto px-4 py-6">
          <SectionHeader title="Venues" href="#" />
          <div className="mt-4">
            <HScroll>
              {venues.map((v) => (
                <Card key={v.name} className="snap-start w-44 shrink-0">
                  <img alt={`${v.name} logo`} className="h-24 w-full rounded-t-lg object-cover" src="/venue-logo.jpg" />
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-tight">{v.name}</p>
                      <Badge className="rounded-md" variant="secondary">
                        {v.city}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </HScroll>
          </div>
        </section> */}
      </div>
      <MobileBottomNav />
    </main>
  )
}


function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props} className={cn("h-5 w-5", props.className)}>
      <path fill="currentColor" d="M12 2l2.9 6.1L22 9.2l-5 4.9L18 22l-6-3.2L6 22l1-7.9-5-4.9 7.1-1.1z" />
    </svg>
  )
}
