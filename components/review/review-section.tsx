// "use client"

// import { useState, useCallback } from "react"
// import { ReviewList } from "./review-list"
// import { ReviewForm } from "./review-form"



// export function ReviewSection() {
//   const [reviews, setReviews] = useState<Review[]>([
//     {
//       id: "1",
//       author: "Sarah Johnson",
//       rating: 5,
//       title: "Absolutely Amazing!",
//       content:
//         "This product exceeded all my expectations. The quality is outstanding and the customer service was incredibly helpful. Highly recommend!",
//       date: "2 days ago",
//       avatar: "👩‍💼",
//     },
//     {
//       id: "2",
//       author: "Michael Chen",
//       rating: 4,
//       title: "Great Value",
//       content:
//         "Really impressed with the features and performance. Minor issues with setup, but overall very satisfied with my purchase.",
//       date: "1 week ago",
//       avatar: "👨‍💻",
//     },
//     {
//       id: "3",
//       author: "Emma Davis",
//       rating: 5,
//       title: "Perfect for My Needs",
//       content:
//         "Exactly what I was looking for. Fast shipping, excellent packaging, and the product works flawlessly. Will definitely buy again!",
//       date: "2 weeks ago",
//       avatar: "👩‍🎨",
//     },
//     {
//       id: "4",
//       author: "James Wilson",
//       rating: 4,
//       title: "Solid Choice",
//       content:
//         "Good quality product at a reasonable price. Works as described. A few minor improvements could make it perfect.",
//       date: "3 weeks ago",
//       avatar: "👨‍🔧",
//     },
//     {
//       id: "5",
//       author: "Lisa Anderson",
//       rating: 5,
//       title: "Best Purchase Ever",
//       content:
//         "I cannot recommend this enough. The attention to detail is remarkable and the durability is impressive.",
//       date: "1 month ago",
//       avatar: "👩‍🏫",
//     },
//   ])

//   const handleAddReview = useCallback((newReview: Omit<Review, "id" | "date">) => {
//     const review: Review = {
//       ...newReview,
//       id: Date.now().toString(),
//       date: "just now",
//     }
//     setReviews((prev) => [review, ...prev])
//   }, [])

//   return (
//     <div className="container mx-auto border">
//       <div className="mt-6">
//         <h2 className="px-7 border-b-red-400 text-xl font-bold text-foreground">
//           Reviews
//         </h2>
//       </div>
//       <div className="grid grid-cols-1  gap-8">

//         <div className="lg:col-span-2">
//           <ReviewList reviews={reviews} />
//         </div>

//         <div className="lg:col-span-1 ">
//           <div className="sticky top-8 flex">
//             <ReviewForm onSubmit={handleAddReview} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"
import { useEffect, useState, useRef, useCallback } from "react"
import ReviewForm from "@/components/review/review-form"
import ReviewList from "@/components/review/review-list"
export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  avatar?: string
}
const initialReviews = [
  {
    id: 1,
    author: "Mariay Zaman",
    date: "October 26, 2018",
    title: "Awesome Tour Experience!!!",
    rating: 5,
    ratingLabel: "Excellent",
    text: "Borem Ipsum is simply dummy text of the printing and type aee setting are industry eorem Ipsum has is simple.",
    likes: 25,
    shares: 19,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    author: "Fahim Rahman",
    date: "October 26, 2018",
    title: "Awesome Tour Experience!!!",
    rating: 5,
    ratingLabel: "Good",
    text: "Borem Ipsum is simply dummy text of the printing and type aee setting are industry eorem Ipsum has is simple.",
    likes: 25,
    shares: 19,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    author: "Fahim Rahman",
    date: "October 26, 2018",
    title: "Awesome Tour Experience!!!",
    rating: 5,
    ratingLabel: "Good",
    text: "Borem Ipsum is simply dummy text of the printing and type aee setting are industry eorem Ipsum has is simple.",
    likes: 25,
    shares: 19,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
]

const generateMockReviews = (startId: number, count: number) => {
  const authors = ["Alex Turner", "Sarah Johnson", "Mike Chen", "Emma Davis", "John Smith", "Lisa Anderson"]
  const adjectives = ["Amazing", "Wonderful", "Fantastic", "Incredible", "Outstanding", "Excellent"]
  const labels = ["Excellent", "Good", "Great", "Very Good", "Perfect", "Awesome"]

  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    author: authors[Math.floor(Math.random() * authors.length)],
    date: `October ${Math.floor(Math.random() * 28) + 1}, 2024`,
    title: `${adjectives[Math.floor(Math.random() * adjectives.length)]} Tour Experience!!!`,
    rating: Math.floor(Math.random() * 2) + 4,
    ratingLabel: labels[Math.floor(Math.random() * labels.length)],
    text: "Borem Ipsum is simply dummy text of the printing and type aee setting are industry eorem Ipsum has is simple.",
    likes: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 30) + 5,
    avatar: `https://images.unsplash.com/photo-${1494790108377 + Math.floor(Math.random() * 10)}?w=150&h=150&fit=crop`,
  }))
}

export  function ReviewSection() {
  const [reviews, setReviews] = useState(initialReviews)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current

    // Load more when user scrolls near the bottom
    if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading) {
      setIsLoading(true)

      // Simulate API delay
      setTimeout(() => {
        const newReviews = generateMockReviews(reviews.length + 1, 3)
        setReviews((prev) => [...prev, ...newReviews])
        setIsLoading(false)
      }, 500)
    }
  }, [isLoading, reviews.length])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="min-h-screen border py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Reviews Section - Scrollable */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
              <div className="w-12 h-1 bg-[var(--brand)] mt-2"></div>
            </div>
            <p className="text-gray-600">({reviews.length}) Ratings</p>
          </div>

          <div ref={scrollContainerRef} className="max-h-96 overflow-y-auto pr-2">
            <ReviewList reviews={reviews} />
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-5 w-5 border-2 border-[var(--brand)] border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        <hr/>

        {/* Review Form Section */}
        <div className="bg-white rounded-lg p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leave your review</h2>
            <div className="w-12 h-1 bg-[var(--brand)] mt-2 mb-6"></div>
          </div>
          <ReviewForm />
        </div>
      </div>
    </div>
  )
}
