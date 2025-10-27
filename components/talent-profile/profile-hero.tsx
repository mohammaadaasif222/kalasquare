"use client"

const profileData = {
  name: "Yoshi Church",
  title: "Influencer",
  status: "Verified",
  rating: 5.0,
  reviews: 11,
  location: "Ullamco molestiae qu",
  bio: "Ut culpa ut incidunt anim nihil aliquam non consectetur reiciendis consequatur vitae ea placeat tempora ut distinctio Quia",
  categories: ["Berlin", "Influencer", "Lifestyle"],
  images: [
    "https://res.cloudinary.com/mae-com-in/image/upload/v1761373713/cdqgbdbr9r0zs5ohilsf.webp",
    "https://res.cloudinary.com/mae-com-in/image/upload/v1761373713/cdqgbdbr9r0zs5ohilsf.webp",
    "https://res.cloudinary.com/mae-com-in/image/upload/v1761373713/cdqgbdbr9r0zs5ohilsf.webp",
  ],
}

export default function ProfileHero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={profileData.images[0] || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={profileData.images[1] || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted col-span-2 md:col-span-1">
                <img
                  src={profileData.images[2] || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{profileData.name}</h1>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  {profileData.status}
                </span>
              </div>
              <p className="text-accent font-semibold text-lg">{profileData.title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium">{profileData.rating} Fantastic</span>
              <span className="text-xs text-muted-foreground">({profileData.reviews} reviews)</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {profileData.categories.map((cat, i) => (
                <span key={i} className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-2 mt-4">
              <button className="w-full bg-accent text-accent-foreground py-2 rounded-lg font-medium hover:opacity-90 transition">
                Talk To Creator
              </button>
              <button className="w-full bg-accent text-accent-foreground py-2 rounded-lg font-medium hover:opacity-90 transition">
                Talk To Creator
              </button>
              <button className="w-full border border-accent text-accent py-2 rounded-lg font-medium hover:bg-accent/5 transition">
                ♡ Save
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          {["About", "Video", "Reels Work", "IMDB", "Portfolio", "Reviews", "Previous Campaigns", "Award"].map(
            (tag, i) => (
              <button
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
