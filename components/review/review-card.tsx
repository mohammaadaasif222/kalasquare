"use client"

import type { Review } from "./review-section"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xl font-medium shadow-sm ring-2 ring-white group-hover:scale-105 transition-transform">
            {review.avatar}
          </div>
          
          {/* Author Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {review.author}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              {review.date}
            </p>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i} 
              className={`text-base transition-all ${
                i < review.rating 
                  ? "text-yellow-400 drop-shadow-sm" 
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
          {review.title}
        </h4>
      )}

      {/* Review Content */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
        {review.content}
      </p>

      {/* Decorative bottom accent */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Verified Review</span>
          <div className="flex gap-1.5">
            <button className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">
              Helpful
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}