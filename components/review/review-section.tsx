"use client"

import { useState, useCallback } from "react"
import { ReviewList } from "./review-list"
import { ReviewForm } from "./review-form"

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  avatar?: string
}

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      title: "Absolutely Amazing!",
      content:
        "This product exceeded all my expectations. The quality is outstanding and the customer service was incredibly helpful. Highly recommend!",
      date: "2 days ago",
      avatar: "👩‍💼",
    },
    {
      id: "2",
      author: "Michael Chen",
      rating: 4,
      title: "Great Value",
      content:
        "Really impressed with the features and performance. Minor issues with setup, but overall very satisfied with my purchase.",
      date: "1 week ago",
      avatar: "👨‍💻",
    },
    {
      id: "3",
      author: "Emma Davis",
      rating: 5,
      title: "Perfect for My Needs",
      content:
        "Exactly what I was looking for. Fast shipping, excellent packaging, and the product works flawlessly. Will definitely buy again!",
      date: "2 weeks ago",
      avatar: "👩‍🎨",
    },
    {
      id: "4",
      author: "James Wilson",
      rating: 4,
      title: "Solid Choice",
      content:
        "Good quality product at a reasonable price. Works as described. A few minor improvements could make it perfect.",
      date: "3 weeks ago",
      avatar: "👨‍🔧",
    },
    {
      id: "5",
      author: "Lisa Anderson",
      rating: 5,
      title: "Best Purchase Ever",
      content:
        "I cannot recommend this enough. The attention to detail is remarkable and the durability is impressive.",
      date: "1 month ago",
      avatar: "👩‍🏫",
    },
  ])

  const handleAddReview = useCallback((newReview: Omit<Review, "id" | "date">) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: "just now",
    }
    setReviews((prev) => [review, ...prev])
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Customer Reviews</h1>
        <p className="text-muted-foreground text-lg">See what our customers think about us</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews List */}
        <div className="lg:col-span-2">
          <ReviewList reviews={reviews} />
        </div>

        {/* Sticky Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        </div>
      </div>
    </div>
  )
}
