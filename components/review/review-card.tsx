"use client"

import type { Review } from "./review-section"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
            {review.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{review.author}</h3>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-muted"}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      <h4 className="font-semibold text-card-foreground mb-2">{review.title}</h4>
      <p className="text-card-foreground/80 leading-relaxed">{review.content}</p>
    </div>
  )
}
