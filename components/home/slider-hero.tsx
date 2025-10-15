"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const slides = [
  { id: 1, src: "/hero-awards-banner.jpg", alt: "Awards banner" },
  { id: 2, src: "/registration-open-banner.jpg", alt: "Registration open banner" },
  { id: 3, src: "/event-poster.jpg", alt: "Event poster" },
]

export function SliderHero() {
  return (
    <section aria-label="Featured" className="mx-auto max-w-screen-lg px-4 pt-3">
      {/* Negative left margin + inner padding to show prev slide peeking */}
      <Carousel opts={{ align: "center", loop: true }} className="-ml-3">
        <CarouselContent className="gap-3 pl-3">
          {slides.map((s) => (
            <CarouselItem key={s.id} className="basis-[88%] sm:basis-[70%] md:basis-[60%]">
              <div className="overflow-hidden rounded-lg border bg-muted/20">
                <Image
                  src={s.src || "/placeholder.svg"}
                  alt={s.alt}
                  width={1024}
                  height={512}
                  className="h-44 w-full object-cover sm:h-56"
                  priority={s.id === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  )
}
