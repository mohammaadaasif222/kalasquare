"use client"

import { useEffect, useRef, useState } from "react"
import { ArtistCard } from "./artist-card"

type Artist = { name: string; role: string; img: string }

type Props = {
  title: string
  seeAllHref?: string
  artists: Artist[]
  autoplayMs?: number
}

export function ArtistSlider({ title, seeAllHref = "#", artists, autoplayMs = 3500 }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>("[data-card]")
    const gap = 16 // gap-4
    const amount = (first?.offsetWidth ?? 220) + gap
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  // Autoplay with pause on hover/focus
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let id: number | undefined
    const start = () => {
      if (id) return
      id = window.setInterval(() => {
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
        if (atEnd) {
          el.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          scrollByCard(1)
        }
      }, autoplayMs)
    }
    const stop = () => {
      if (id) {
        clearInterval(id)
        id = undefined
      }
    }
    if (!isHovering) start()
    return () => stop()
  }, [autoplayMs, isHovering])

  return (
    <section className="space-y-4">
      {/* <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground">
          <span className="inline-block size-5 rounded-full border" aria-hidden="true" />
          <span className="text-foreground">{title}</span>
        </h2>
        <a
          href={seeAllHref}
          className="text-md text-[var(--brand)] underline-offset-4 hover:[var(--brand)]/60 hover:underline"
        >
          see all
        </a>
      </header> */}

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 lg:text-2xl">
            {title} ✨
          </h2> 
          <p className="mt-1.5 text-xs text-gray-600 lg:text-base">
            Explore top events and unforgettable experiences
          </p>
        </div>
        <div>
          <a
            href={seeAllHref}
            className="text-md text-[var(--brand)] underline-offset-4 hover:[var(--brand)]/60 hover:underline"
          >
            see all
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-1">
          <button
            aria-label="Scroll left"
            onClick={() => scrollByCard(-1)}
            className="size-9 rounded-full border bg-card text-foreground shadow transition-colors hover:bg-brand hover:text-primary-foreground"
          >
            ‹
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-1">
          <button
            aria-label="Scroll right"
            onClick={() => scrollByCard(1)}
            className="size-9 rounded-full border bg-card text-foreground shadow transition-colors hover:bg-brand hover:text-primary-foreground"
          >
            ›
          </button>
        </div>

        <div
          ref={scrollerRef}
          tabIndex={0}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-1"
          role="list"
          aria-label={`${title} carousel`}
        >
          {artists.map((a, i) => (
            <div key={i} data-card className="snap-start">
              <ArtistCard name={a.name} role={a.role} img={a.img} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
