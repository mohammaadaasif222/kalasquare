// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import type { Review } from "./review-section"

// interface ReviewFormProps {
//   onSubmit: (review: Omit<Review, "id" | "date">) => void
// }

// export function ReviewForm({ onSubmit }: ReviewFormProps) {
//   const [rating, setRating] = useState(5)
//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [author, setAuthor] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!author.trim() || !content.trim()) {
//       alert("Please fill in all fields")
//       return
//     }

//     setIsSubmitting(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     onSubmit({
//       author,
//       rating,
//       title,
//       content,
//       avatar: "👤",
//     })

//     // Reset form
//     setAuthor("")
//     setTitle("")
//     setContent("")
//     setRating(5)
//     setIsSubmitting(false)
//   }

//   return (
//     <div className="md:pt-12 mx-auto w-full">
//       <h2 className="text-lg font-bold text-card-foreground mb-4">Write a Review</h2>
//       <form onSubmit={handleSubmit} className="space-y-3 border p-4">
//         <div>
//           <label className="block text-xs font-medium text-card-foreground mb-1.5">Your Name</label>
//           <input
//             type="text"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             placeholder="Enter your name"
//             className="w-full px-3 py-1.5 text-sm bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//           />
//         </div>

//         {/* Rating */}
//         <div>
//           <label className="block text-xs font-medium text-card-foreground mb-1.5">Rating</label>
//           <div className="flex gap-1">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <button
//                 key={i}
//                 type="button"
//                 onClick={() => setRating(i + 1)}
//                 className="text-2xl transition-transform hover:scale-110"
//               >
//                 <span className={i < rating ? "text-yellow-400" : "text-muted"}>★</span>
//               </button>
//             ))}
//           </div>
//           <p className="text-xs text-muted-foreground mt-1">{rating} out of 5 stars</p>
//         </div>

//         {/* Content */}
//         <div>
//           <label className="block text-xs font-medium text-card-foreground mb-1.5">Your Review</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Share your experience..."
//             rows={4}
//             className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
//           />
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 text-sm rounded-md transition-colors"
//         >
//           {isSubmitting ? "Submitting..." : "Submit Review"}
//         </Button>
//       </form>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    review: "",
    name: "",
    email: "",
  })

  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ rating: 0, title: "", review: "", name: "", email: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="text-sm font-medium text-gray-900 mb-2 block">Your overall rating of this listing</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={
                  star <= (hoveredRating || formData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="text-sm font-medium text-gray-900 mb-1 block">
          Title of your review
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g. Amazing experience!"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="review" className="text-sm font-medium text-gray-900 mb-1 block">
          Write Your review
        </label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleInputChange}
          placeholder="Share your experience..."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-900 mb-1 block">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1 block">
            E-mail*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[var(--brand)] hover:bg-[var(--brand)]/60 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Submit Your Review
      </button>
    </form>
  )
}
