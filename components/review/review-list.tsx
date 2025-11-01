// "use client"

// import { useEffect, useRef, useState } from "react"
// import { ReviewCard } from "./review-card"
// import type { Review } from "./review-section"

// interface ReviewListProps {
//   reviews: Review[]
// }

// export function ReviewList({ reviews }: ReviewListProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [visibleCount, setVisibleCount] = useState(3)
//   const observerRef = useRef<IntersectionObserver | null>(null)

//   useEffect(() => {
//     const container = containerRef.current
//     if (!container) return

//     // Create intersection observer for infinite scroll
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && visibleCount < reviews.length) {
//             setVisibleCount((prev) => Math.min(prev + 3, reviews.length))
//           }
//         })
//       },
//       { 
//         threshold: 0.1,
//         root: container
//       },
//     )

//     // Observe the last item
//     const items = container.querySelectorAll("[data-review-item]")
//     if (items.length > 0) {
//       const lastItem = items[items.length - 1]
//       observerRef.current.observe(lastItem)
//     }

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect()
//       }
//     }
//   }, [visibleCount, reviews.length])

//   const visibleReviews = reviews.slice(0, visibleCount)

//   return (
//     <div 
//       ref={containerRef} 
//       className="space-y-4 max-h-[400px] no-scrollbar overflow-y-auto border-gray-200 rounded p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
//     >
//       {visibleReviews.map((review, index) => (
//         <div key={review.id} data-review-item>
//           <ReviewCard review={review} />
//         </div>
//       ))}

//       {visibleCount < reviews.length && (
//         <div className="flex justify-center py-4">
//           <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
//         </div>
//       )}

//       {visibleCount >= reviews.length && reviews.length > 3 && (
//         <div className="text-center py-4">
//           <p className="text-sm text-muted-foreground">No more reviews to load</p>
//         </div>
//       )}

//       <style jsx>{`
//         /* Custom scrollbar styling */
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 4px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 4px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }
//       `}</style>
//     </div>
//   )
// }

import { Star, ThumbsUp, Share2 } from "lucide-react"

interface Review {
  id: number
  author: string
  date: string
  title: string
  rating: number
  ratingLabel: string
  text: string
  likes: number
  shares: number
  avatar: string
}

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
          <div className="flex gap-3">
            <img
              src={review.avatar || "/placeholder.svg"}
              alt={review.author}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 italic">{review.title}</h3>

              <div className="flex items-center gap-2 my-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({review.ratingLabel})</span>
              </div>

              <p className="text-xs font-semibold text-gray-900">
                {review.author} <span className="font-normal text-gray-600">/ {review.date}</span>
              </p>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{review.text}</p>

              <div className="flex gap-4 mt-2">
                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
                  <ThumbsUp size={14} className="fill-gray-300 text-gray-300" />
                  <span>{review.likes} Liked</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
                  <Share2 size={14} className="text-gray-300" />
                  <span>{review.shares} Shared</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
