
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Bolt, Sparkle, Star } from "lucide-react"
import { cn } from "@/lib/utils"

type VenueCardProps = {
  coverSrc: string
  logoSrc?: string
  name: string
  city: string
  rating?: number
  className?: string
  delay?: number
}

export function VenueCard({ coverSrc, logoSrc, name, city, rating = 5, className, delay = 0 }: VenueCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const stars = Array.from({ length: 5 })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Card 
      className={cn(
        "overflow-hidden rounded-xl py-0 shadow-sm bg-card transition-all duration-700 ease-out h-full flex flex-col",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden group">
        <img 
          src={coverSrc || "/placeholder.svg"} 
          alt={`${name} cover`} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />

        {/* Red lightning ribbon */}
        <div className="absolute left-8 top-0 bg-[var(--brand)] rounded-br-lg px-2.5 py-2 text-primary-foreground shadow-sm transition-transform duration-300 hover:scale-110">
          <Sparkle className="h-4 w-4 animate-pulse" aria-hidden />
        </div>

        {/* Rating over image */}
        <div className="absolute bottom-7 left-3 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm transition-all duration-300 hover:bg-black/50">
          {stars.map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-2.5 w-2.5 transition-all duration-300",
                i < rating ? "fill-[var(--chart-4)] text-[var(--chart-4)]" : "text-white/50"
              )}
              aria-hidden
            />
          ))}
          <span className="ml-1 text-xs font-medium text-white">({rating})</span>
        </div>
      </div>

  
      <div className="mx-4 -mt-10 z-50 rounded-xl border bg-card px-3 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 ring-1 ring-border transition-all duration-300 hover:ring-2 hover:ring-primary">
              <AvatarImage
                src={logoSrc || "/placeholder.svg?height=48&width=48&query=venue%20logo"}
                alt={`${name} logo`}
              />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-xs font-mono">{name}</p>
          </div>
          {/* Online dot with pulse */}
          <span 
            className="relative h-2.5 w-2.5 rounded-full bg-[var(--chart-2)]" 
            aria-label="online" 
            role="status"
          >
            <span className="absolute inset-0 rounded-full bg-[var(--chart-2)] animate-ping opacity-75" />
          </span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between px-6 pb-4 mt-auto">
        <p className="text-xs ">{city}</p>
        <Button 
          size="sm" 
          variant="destructive" 
          className="rounded p-2 text-xs bg-[var(--brand)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          View Now
        </Button>
      </div>
    </Card>
  )
}