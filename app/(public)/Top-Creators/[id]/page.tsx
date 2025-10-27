// import Header from "@/components/talent-profile/header"
// import ProfileHero from "@/components/talent-profile/profile-hero"
// import About from "@/components/talent-profile/about"
// import Services from "@/components/talent-profile/services"
// import Videos from "@/components/talent-profile/videos"
// import Reels from "@/components/talent-profile/reels"
// import Portfolio from "@/components/talent-profile/portfolio"
// import Reviews from "@/components/talent-profile/reviews"
// import Campaigns from "@/components/talent-profile/campaigns"
// import Awards from "@/components/talent-profile/awards"
// import Footer from "@/components/talent-profile/footer"

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-background">
//       <Header />
//       <ProfileHero />
//       <About />
//       <Services />
//       <Videos />
//       <Reels />
//       <Portfolio />
//       <Reviews />
//       <Campaigns />
//       <Awards />
//       <Footer />
//     </main>
//   )
// }




"use client"

import { useParams } from "next/navigation"
import { useTalentProfile } from "@/hooks/use-user"
import { Star, MapPin, Heart, Share2, MessageCircle, Play, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TalentProfilePage() {
  const params = useParams()
  const talentId = params.id as string
  const { profile, isLoading, error } = useTalentProfile(talentId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Images Gallery */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="col-span-2 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=288&width=576&query=profile banner"}
                  alt={profile.display_name??" "}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=192&width=288&query=gallery image"}
                  alt="Gallery 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md relative group cursor-pointer">
                <img
                  src={profile.profile_image_url || "/placeholder.svg?height=192&width=288&query=gallery image"}
                  alt="Gallery 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">View More</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["About", "Video", "Reels Work", "IMDB", "Portfolio", "Reviews", "Previous Campaigns", "Award"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-full hover:bg-red-50 transition font-medium"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.display_name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{profile.categories?.[0] || "Professional"}</span>
                    {profile.verify_badge && <Check className="w-4 h-4 text-green-500" />}
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
                  <span key={cat} className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">Talk To Creator</Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">Talk To Creator</Button>
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

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
          <p className="text-gray-700 leading-relaxed mb-3">{profile.bio || "Professional profile information"}</p>
          <button className="text-red-600 font-semibold hover:text-red-700 transition">Read more</button>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Services offered</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            {profile.portfolio_description || "Professional services available"}
          </p>
          <button className="text-red-600 font-semibold hover:text-red-700 transition">Read more</button>
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

        {/* Videos Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
            <button className="text-red-600 font-semibold hover:text-red-700 transition">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition border-0">
                <div className="relative h-40 bg-gray-800 flex items-center justify-center group cursor-pointer">
                  <Play className="w-12 h-12 text-white group-hover:scale-110 transition" />
                  <div className="absolute bottom-3 left-3 text-xs text-white">
                    <p className="font-semibold">Watch video on YouTube</p>
                    <p className="text-gray-300 text-xs">Video composition</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Reels Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reels Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition border-0">
                <div className="h-48 bg-gray-800 flex items-center justify-center group cursor-pointer">
                  <Play className="w-12 h-12 text-white group-hover:scale-110 transition" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* IMDB Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">IMDB</h2>
            <button className="text-red-600 font-semibold hover:text-red-700 transition">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition border-0">
                <div className="h-40 bg-gray-300 flex items-center justify-center">
                  <img
                    src={`/generic-movie-poster.png?height=160&width=120&query=movie poster ${i}`}
                    alt={`IMDB ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900">Animal</p>
                  <p className="text-xs text-gray-600">Marathi, Jha (News Reporter)</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-12">
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
            {/* Rating Summary Card */}
            <Card className="p-6 bg-red-600 text-white border-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold mb-2">5.0</p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-sm font-semibold">Fantastic</p>
              <p className="text-xs text-red-100 mt-2">87 reviews recommended it</p>
              <Button className="mt-4 bg-white text-red-600 hover:bg-gray-100 w-full font-semibold">
                Write a review
              </Button>
            </Card>
          </div>
        </section>

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
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">View Details</Button>
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

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-12 mt-12 bg-gray-50 -mx-4 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Information</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Useful Links</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Terms & Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Advertise With Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Follow Us On</h3>
                <div className="flex gap-4">
                  {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition capitalize text-sm"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
              <p>&copy; 2025 Talent Square. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
