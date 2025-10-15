import { Card } from "@/components/ui/card"
import { Calendar, MapPin, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type PriceType = "Free" | "Paid"

export type EventItem = {
  id: string
  title: string
  city: string
  dateLabel: string // e.g., "Dec 25, 2025"
  priceType: PriceType
  imageUrl: string
  verified?: boolean
}

export function EventCard({
  item,
  className,
}: {
  item: EventItem
  className?: string
}) {
  const isFree = item.priceType === "Free"

  return (
    <article className={cn("snap-start", className)} aria-label={item.title}>
      <Card
        className={cn(" py-0 overflow-hidden rounded-md border bg-card shadow-sm transition-shadow hover:shadow-md")}
      >
        <div className="p-2">
          {/* Poster */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>

          {/* Title row */}
          <div className="mt-3 flex items-center gap-1.5">
            <h3 className="text-base font-medium leading-tight text-foreground line-clamp-1 text-pretty">
              {item.title}
            </h3>
            {item.verified ? <BadgeCheck aria-label="Verified event" className="size-4 shrink-0 text-blue-500" /> : null}
          </div>

          {/* Meta: location */}
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin aria-hidden className="size-4 text-red-500" />
            <span className="leading-none">{item.city}</span>
          </div>

          {/* Meta: date */}


          {/* Footer: price pill aligned right for clean balance */}
          <div className="flex items-center justify-between pb-3">
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar aria-hidden className="size-4 text-green-500" />
              <span className="leading-none">{item.dateLabel}</span>
            </div>
            <span
              className={cn(
                "rounded-full text-xs",
                isFree ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {item.priceType}
            </span>
          </div>
        </div>
      </Card>
    </article>
  )
}
