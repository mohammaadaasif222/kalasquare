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
          if (entry.isIntersecting && visibleCount < reviews.length) {
            setVisibleCount((prev) => Math.min(prev + 3, reviews.length))
          }
        })
      },
      { 
        threshold: 0.1,
        root: container
      },
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
    <div 
      ref={containerRef} 
      className="space-y-4 max-h-[600px] no-scrollbar overflow-y-auto border border-gray-200 rounded-lg p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {visibleReviews.map((review, index) => (
        <div key={review.id} data-review-item>
          <ReviewCard review={review} />
        </div>
      ))}

      {visibleCount < reviews.length && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {visibleCount >= reviews.length && reviews.length > 3 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No more reviews to load</p>
        </div>
      )}

      <style jsx>{`
        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  )
}