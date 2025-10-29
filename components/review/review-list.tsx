"use client"

import { useEffect, useRef, useState } from "react"
import { ReviewCard } from "./review-card"
import type { Review } from "./review-section"

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(3)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create intersection observer for infinite scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prev) => Math.min(prev + 3, reviews.length))
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe the last item
    const items = container.querySelectorAll("[data-review-item]")
    if (items.length > 0) {
      const lastItem = items[items.length - 1]
      observerRef.current.observe(lastItem)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [visibleCount, reviews.length])

  const visibleReviews = reviews.slice(0, visibleCount)

  return (
    <div ref={containerRef} className="space-y-4">
      {visibleReviews.map((review, index) => (
        <div key={review.id} data-review-item>
          <ReviewCard review={review} />
        </div>
      ))}

      {visibleCount < reviews.length && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {visibleCount >= reviews.length && reviews.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No more reviews to load</p>
        </div>
      )}
    </div>
  )
}
