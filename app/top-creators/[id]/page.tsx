

"use client"

import { useParams } from "next/navigation"
import { useTalentProfile } from "@/hooks/use-user"
import { Star, MapPin, Heart, Share2, MessageCircle, Play, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState, useEffect, JSX } from "react"
import Loader from "@/components/shared/Loader"
import VideoSection from "@/components/creators/videos"
import ImageGallery from "@/components/creators/image-gallery"
import { ReviewSection } from "@/components/review/review-section"
// import { ReviewForm } from "@/components/review/review-form"
import IMDBSection from "@/components/creators/imdb-section"
import PreviousCampaignSection from "@/components/creators/previous-campaign-section"
import AwardSection from "@/components/creators/award-section"
import { AboutSection } from "@/components/creators/about-section"
import SocialAccountsDisplay from "@/components/creators/social-media"
import SimilarArtistsSection from "@/components/creators/similar-artist"

export default function TalentProfilePage() {
  const params = useParams()
  const talentId = params.id as string
  const { profile, isLoading, error } = useTalentProfile(talentId)
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSocialMenu, setShowSocialMenu] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setShowReviewForm(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleAddReview = (reviewData: any) => {
    // Handle review submission
    console.log('Review submitted:', reviewData);
  };

  const socialIcons: Record<string, JSX.Element> = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    x: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    tiktok: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    pinterest: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
      </svg>
    ),
    snapchat: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.063-.172-.01-.254.184-.464.428-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
      </svg>
    ),
    twitch: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          <div className="lg:col-span-2">
            <ImageGallery talentProfileId={talentId} />

            <div className="flex flex-wrap gap-2">
              {["About", "Video", "Reels Work", "IMDB", "Portfolio", "Reviews", "Previous Campaigns", "Award"].map(
                (tag) => (
                  <a href={`#${tag}`}
                    key={tag}
                    className="px-3 py-2  cursor-pointer text-xs border bg-white border-red-300 text-[var(--brand)] rounded-full hover:bg-red-50 transition font-medium"
                  >
                    {tag}
                  </a>
                ),
              )}
            </div>

            <hr className="my-4" />


            <AboutSection
              description={profile.portfolio_description || "Professional services available"}
              maxLines={3}
            />

            {/* Rates Section */}
            {/* <section className="mb-12">
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
            </section> */}

            <hr className="py-4" />
            <div id="Video">
              <VideoSection talentProfileId={talentId} />
            </div>
            <hr className="py-4" />
            {/* Reels Section */}

            <section className="mb-12" id="Reels Work">
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

              <div className="flex items-center justify-end mb-6">
                <button className="text-[var(--brand)] cursor-pointer font-semibold hover:text-[var(--brand)]/80 transition">View all</button>
              </div>
            </section>

            <hr className="py-4" />
            {/* IMDB Section */}
            <div id="IMDB">
              <IMDBSection />
            </div>
            <hr className="" />
            <div id="Reviews">
              <ReviewSection />
            </div>
            <hr className="py-5" />
            <div id="Previous Campaigns">

              <PreviousCampaignSection />
            </div>
            <hr className="py-5" />
            <div id="Award">

              <AwardSection />
            </div>
            <hr className="py-5" />
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

          {/* Profile Info Card - Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 transition-opacity duration-300">
              {!showReviewForm ? (
                <Card className="p-6 gap-y-3 rounded-xs">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 capitalize">{profile.display_name}</h1>
                        {profile.verify_badge || <div className="flex items-center gap-2 mt-1">
                          <Image
                            src="/verifybadge.png"
                            alt="Verified Badge"
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600 capitalize">{profile.talent_type || "Professional"}</span>
                      </div>
                    </div>
                    <Share2 onMouseEnter={() => setShowSocialMenu(true)}
                      onMouseLeave={() => setShowSocialMenu(false)} className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500 transition" />
                  </div>
                  <div
                    className={`absolute right-5 top-25 -translate-y-2 bg-gray-100 transition-all duration-300 ease-out origin-bottom  ${showSocialMenu ? "opacity-100 visible -translate-y-12" : "opacity-0 invisible translate-y-0"
                      }`}
                    onMouseEnter={() => setShowSocialMenu(true)}
                    onMouseLeave={() => setShowSocialMenu(false)}
                  >
                    {profile.social_accounts?.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-2 rounded-md transition text-gray-700 text-xs font-semibold w-full"
                        style={{
                          transitionDelay: showSocialMenu ? `${idx * 50}ms` : "0ms",
                        }}
                      >
                        {socialIcons[social.platform.toLowerCase()] || (
                          <span className="text-xs font-semibold">{social.platform}</span>
                        )}
                      </a>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>
                      {profile.bio}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(1)].map((_, i) => (
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
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {profile.location?.city}, {profile.location?.state}
                    </span>
                  </div>

                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.categories?.slice(0, 3).map((cat) => (
                      <span key={cat} className="px-3 py-1 text-xs font-semibold bg-red-100 text-[var(--brand)]/80 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <SocialAccountsDisplay socialAccounts={profile.social_accounts} />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-[var(--brand)] hover:bg-[var(--brand)]/70 text-white font-semibold">Talk To Creator</Button>
                    {/* <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div> */}
                  </div>
                </Card>
              ) : (
                <SimilarArtistsSection />
                // <ReviewForm onSubmit={handleAddReview} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}