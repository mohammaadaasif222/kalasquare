

"use client"

import { useParams } from "next/navigation"
import { useTalentProfile } from "@/hooks/use-user"
import { Star, MapPin, Heart, Share2, MessageCircle, Play, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import Loader from "@/components/shared/Loader"
import VideoSection from "@/components/creators/videos"
import ImageGallery from "@/components/creators/image-gallery"
import { ReviewSection } from "@/components/review/review-section"

export default function TalentProfilePage() {
  const params = useParams()
  const talentId = params.id as string
  const { profile, isLoading, error } = useTalentProfile(talentId)
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading profile</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Images Gallery */}
          <div className="lg:col-span-2">
            {/* <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=400&width=400&query=profile banner"}
                  alt={profile.display_name ?? " "}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=192&width=384&query=gallery image"}
                  alt="Gallery 1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=192&width=192&query=gallery image"}
                  alt="Gallery 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=192&width=192&query=gallery image"}
                  alt="Gallery 3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">View More</span>
                </div>
              </div>
            </div> */}
            <ImageGallery talentProfileId={talentId} />
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["About", "Video", "Reels Work", "IMDB", "Portfolio", "Reviews", "Previous Campaigns", "Award"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 text-sm border border-red-300 text-[var(--brand)] rounded-full hover:bg-red-50 transition font-medium"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>

            <hr className="my-4" />
            {/* Services Section */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About</h2>
              <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                {profile.portfolio_description || "Professional services available"}
              </p>
              <button className="text-[var(--brand)] font-semibold hover:text-[var(--brand)] transition">Read more</button>
            </section>

            {/* Rates Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Rates</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Per Live", value: profile.rates?.per_live },
                  { label: "Per Video", value: profile.rates?.per_video },
                  { label: "Per Post", value: profile.rates?.per_post },
                  { label: "Currency", value: profile.rates?.currency },
                ].map((rate) => (
                  <Card key={rate.label} className="p-4 text-center border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">{rate.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{rate.value}</p>
                  </Card>
                ))}
              </div>
            </section>
            <hr className="py-4" />
            {/* Videos Section */}
            <VideoSection talentProfileId={talentId} />
            <hr className="py-4" />
            {/* Reels Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reels Works</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { id: 'Utbd6I13hVo', title: 'YouTube Short 1' },
                  { id: 'hRtMkJxvP-s', title: 'YouTube Short 2' },
                  { id: 'vPuOcYorals', title: 'YouTube Short 3' }
                ].map((short, i) => (
                  <Card key={i} className="flex-shrink-0 py-0 rounded w-[231px] overflow-hidden hover:shadow-lg transition border-0">
                    <div className="aspect-[9/16] h-[300px]">
                      <iframe
                        src={`https://www.youtube.com/embed/${short.id}`}
                        title={short.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                  </Card>
                ))}
              </div>
              <style jsx>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
            </section>

            <hr className="py-4" />
            {/* IMDB Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">IMDB</h2>
                <button className="text-[var(--brand)] font-semibold hover:text-[var(--brand)]/80 transition">View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Animal", role: "Marathi, Jha (News Reporter)", year: "2024", rating: "5" },
                  { title: "Animal", role: "Marathi, Jha (News Reporter)", year: "2024", rating: "5" },
                  { title: "Animal", role: "Marathi, Jha (News Reporter)", year: "2024", rating: "5" },
                  { title: "Animal", role: "Marathi, Jha (News Reporter)", year: "2024", rating: "5" }
                ].map((movie, i) => (
                  <div key={i} className="relative">
                    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
                      <div className="relative h-48 bg-gradient-to-br from-orange-900 via-red-900 to-black flex items-center justify-center">
                        <img
                          src={`https://via.placeholder.com/120x180/8B0000/FFFFFF?text=${movie.title}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-yellow-400 rounded px-2 py-1 flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3 fill-yellow-600 text-yellow-600" />
                          <span className="text-xs font-bold text-gray-900">{movie.rating}</span>
                        </div>
                        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition">
                          <Info className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      <div className="bg-white p-3">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{movie.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{movie.role}</p>
                        <p className="text-xs text-gray-500">{movie.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            {/* <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.recent_reviews && profile.recent_reviews.length > 0 ? (
                  profile.recent_reviews.map((review: any, i: number) => (
                    <Card key={i} className="p-4 border border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-gray-900">{review.reviewer_name || "Anonymous"}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center col-span-2 border border-gray-200">
                    <p className="text-gray-600">No reviews yet</p>
                  </Card>
                )}
                
                <Card className="p-6 bg-[var(--brand)] text-white border-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold mb-2">5.0</p>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold">Fantastic</p>
                  <p className="text-xs text-red-100 mt-2">87 reviews recommended it</p>
                  <Button className="mt-4 bg-white text-[var(--brand)] hover:bg-gray-100 w-full font-semibold">
                    Write a review
                  </Button>
                </Card>
              </div>
            </section> */}

            <ReviewSection />

            {/* Previous Campaigns Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Previous Campaign</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition border-0">
                    <div className="h-40 bg-gray-300">
                      <img
                        src={`/marketing-campaign.png?height=160&width=300&query=campaign ${i}`}
                        alt={`Campaign ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900 mb-2">Lorem Ipsum</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Open up by Pooja is a professional freelance makeup and hair artist with a team of Delhi and has
                        been catering to many brides across the country and not just within the city.
                      </p>
                      <Button className="w-full bg-[var(--brand)] hover:bg-red-700 text-white font-semibold">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Awards Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Award</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition border-0">
                    <div className="h-40 bg-gray-300 flex items-center justify-center">
                      <img
                        src={`/award-certificate-.jpg?height=160&width=120&query=award certificate ${i}`}
                        alt={`Award ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Specializations Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Specializations</h2>
              <div className="flex flex-wrap gap-3">
                {profile.specializations?.map((spec) => (
                  <span
                    key={spec}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-xs sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900 capitalize">{profile.display_name}
                    </h1>
                    {profile.verify_badge || <div className="flex items-center gap-2 mt-1">
                      <Image
                        src="/verifybadge.png"
                        alt="Verified Badge"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    }
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600 capitalize">{profile.talent_type || "Professional"}</span>
                  </div>
                </div>
                <Heart className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500 transition" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(profile.rating?.average || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">5.0 Fantastic</span>
                <span className="text-xs text-gray-500">({profile.rating?.count || 0} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>
                  {profile.location?.city}, {profile.location?.state}
                </span>
              </div>

              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.categories?.slice(0, 3).map((cat) => (
                  <span key={cat} className="px-3 py-1 text-xs font-semibold bg-red-100 text-[var(--brand)]/80 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-[var(--brand)] hover:bg-[var(--brand)]/70 text-white font-semibold">Talk To Creator</Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
