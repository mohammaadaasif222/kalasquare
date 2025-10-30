"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Review } from "./review-section"

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, "id" | "date">) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!author.trim() || !content.trim()) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit({
      author,
      rating,
      title,
      content,
      avatar: "👤",
    })

    // Reset form
    setAuthor("")
    setTitle("")
    setContent("")
    setRating(5)
    setIsSubmitting(false)
  }

  return (
    <div className="md:pt-12">
      <h2 className="text-lg font-bold text-card-foreground mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-3 shadow border p-4">
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-1.5">Your Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-1.5 text-sm bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-1.5">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="text-2xl transition-transform hover:scale-110"
              >
                <span className={i < rating ? "text-yellow-400" : "text-muted"}>★</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{rating} out of 5 stars</p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-1.5">Your Review</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 text-sm rounded-md transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}