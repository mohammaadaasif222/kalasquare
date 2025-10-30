// "use client"

// import { useState, useMemo, useEffect } from "react"
// import Header from "@/components/creators/header"
// import Sidebar from "@/components/creators/sidebar"
// import CreatorGrid from "@/components/creators/creator-grid"
// import Pagination from "@/components/creators/pagination"
// import SearchBar from "@/components/creators/search-bar"
// import BottomNav from "@/components/creators/bottom-nav"
// import InquiryModal from "@/components/creators/inquiry-modal"
// import CreatorDetailsModal from "@/components/creators/creator-details-modal"
// import { useIsMobile } from "@/hooks/use-mobile"
// import { useTalentList } from "@/hooks/use-user"
// import { PublicTalentItem } from "@/lib/redux/features/user/userSlice"
// import Loader from "@/components/shared/Loader"
// import { RootState } from "@/lib/redux/store"
// import { useSelector } from "react-redux"
// const CREATORS_PER_PAGE = 8

// function transformTalentToCreator(talent: PublicTalentItem) {
//   return {
//     id: talent.id,
//     name: talent.display_name,
//     followers: talent.followers > 0 ? `${(talent.followers / 1000).toFixed(1)}K` : "0",
//     category: talent.talent_type || talent.categories[0] || "Creator",
//     rating: talent.verify_badge ? 5 : Math.floor(Math.random() * 2) + 4, // 4-5 rating
//     image: talent.profile_image_url || "/placeholder.svg",
//     tags: talent.specializations.length > 0 ? talent.specializations : talent.categories.slice(0, 3),
//     bio: talent.bio,
//     location: talent.location,
//     experienceLevel: talent.experience_level,
//     rates: talent.rates,
//     verifyBadge: talent.verify_badge
//   }
// }

// export interface Creator {
//   id: string
//   name: string
//   followers: string
//   category: string
//   rating: number
//   image: string
//   tags: string[]
// }

// export default function Home() {
//   const isMobile = useIsMobile()
//   const [searchQuery, setSearchQuery] = useState("")
//   const [sortBy, setSortBy] = useState("popular")
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [selectedCity, setSelectedCity] = useState("all")
//   const [selectedRating, setSelectedRating] = useState(0)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [activeNav, setActiveNav] = useState("explore")
//   const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
//   const [selectedCreatorForInquiry, setSelectedCreatorForInquiry] = useState<Creator | null>(null)
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false)
//   const [selectedCreatorForDetails, setSelectedCreatorForDetails] = useState<Creator | null>(null)
//   const [creators, setCreators] = useState<Creator[]>([])
//   const { talents } = useTalentList(true)

//   const { publicTalents, talentsPagination, isLoading, error } = useSelector(
//     (state: RootState) => state.users
//   );


// useEffect(() => {
//   if (publicTalents && publicTalents.length > 0) {
//     const transformedCreators = publicTalents.map(transformTalentToCreator)
//     setCreators(transformedCreators)
//   } else {
//     // Reset creators if publicTalents becomes empty
//     setCreators([])
//   }
// }, [publicTalents])

//   const categories = [
//     "Bollywood",
//     "Haryanavi",
//     "Bhojpuri",
//     "Actor",
//     "Model",
//     "Writer",
//     "Dancer",
//     "Singer",
//     "Standup",
//     "Voice Over",
//     "Anchors",
//     "Poetry",
//     "Fitness",
//     "Lifestyle",
//     "Beauty",
//     "Education",
//     "Finance",
//     "Sports",
//     "Yoga",
//     "Spritual",
//     "Speaker",
//     "Gadget",
//     "Gaming",
//     "Real Estate",
//     "Finance ",
//     "Parenting",
//     "Cooking",
//     "Food",
//     "Podcast",
//     "Travel",
//     "Vlogger"
//   ]
//   const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"]

//   const filteredCreators = useMemo(() => {
//     let filtered = creators

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (creator) =>
//           creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           creator.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
//       )
//     }

//     // Category filter
//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((creator) => selectedCategories.includes(creator.category))
//     }

//     // Rating filter
//     if (selectedRating > 0) {
//       filtered = filtered.filter((creator) => creator.rating >= selectedRating)
//     }

//     // Sorting
//     if (sortBy === "popular") {
//       filtered.sort((a, b) => Number.parseInt(b.followers) - Number.parseInt(a.followers))
//     } else if (sortBy === "newest") {
//       // filtered.sort((a, b) => b.id - a.id)
//     } else if (sortBy === "rating") {
//       filtered.sort((a, b) => b.rating - a.rating)
//     } else if (sortBy === "active") {
//       // filtered.sort((a, b) => a.id - b.id)
//     }

//     return filtered
//   }, [searchQuery, selectedCategories, selectedCity, selectedRating, sortBy])

//   const totalPages = Math.ceil(filteredCreators.length / CREATORS_PER_PAGE)
//   const paginatedCreators = filteredCreators.slice(
//     (currentPage - 1) * CREATORS_PER_PAGE,
//     currentPage * CREATORS_PER_PAGE,
//   )

//   const handleCategoryChange = (category: string) => {
//     if (category === "All Categories") {
//       setSelectedCategories([])
//     } else {
//       setSelectedCategories((prev) =>
//         prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//       )
//     }
//     setCurrentPage(1)
//   }

//   const handleTalkToCreator = (creator: Creator) => {
//     setSelectedCreatorForInquiry(creator)
//     setInquiryModalOpen(true)
//   }

//   const handleCreatorDoubleClick = (creator: Creator) => {
//     setSelectedCreatorForDetails(creator)
//     setDetailsModalOpen(true)
//   }

//   const handleInquirySubmit = (data: any) => {
//     console.log("Inquiry submitted:", {
//       creator: selectedCreatorForInquiry?.name,
//       ...data,
//     })
//     // Here you would typically send this to your backend
//   }

//   if (isLoading || publicTalents.length === 0) {

//     return <Loader />
//   }

//   return (
//     <div className="min-h-screen bg-background">

//       <div className="flex max-w-6xl mx-auto flex-col lg:flex-row gap-6 px-4 pb-24 lg:py-8">
//         {/* Sidebar - Hidden on mobile */}
//         <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
//           <Sidebar
//             categories={categories}
//             selectedCategories={selectedCategories}
//             onCategoryChange={handleCategoryChange}
//             cities={cities}
//             selectedCity={selectedCity}
//             onCityChange={setSelectedCity}
//             selectedRating={selectedRating}
//             onRatingChange={setSelectedRating}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 min-w-0">
//           <SearchBar
//             searchQuery={searchQuery}
//             onSearchChange={setSearchQuery}
//             sortBy={sortBy}
//             onSortChange={setSortBy}
//             totalResults={filteredCreators.length}
//           />

//           <CreatorGrid
//             creators={paginatedCreators}
//             onTalkToCreator={handleTalkToCreator}
//             onCreatorDoubleClick={handleCreatorDoubleClick}
//           />

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//             totalResults={filteredCreators.length}
//             resultsPerPage={CREATORS_PER_PAGE}
//           />
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       {isMobile && <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />}

//       <InquiryModal
//         isOpen={inquiryModalOpen}
//         creatorName={selectedCreatorForInquiry?.name || ""}
//         onClose={() => setInquiryModalOpen(false)}
//         onSubmit={handleInquirySubmit}
//       />

//       <CreatorDetailsModal
//         isOpen={detailsModalOpen}
//         creator={selectedCreatorForDetails}
//         onClose={() => setDetailsModalOpen(false)}
//         onTalkToCreator={() => {
//           setDetailsModalOpen(false)
//           if (selectedCreatorForDetails) {
//             handleTalkToCreator(selectedCreatorForDetails)
//           }
//         }}
//       />
//     </div>
//   )
// }


"use client"

import { useState, useMemo } from "react"
import Header from "@/components/creators/header"
import Sidebar from "@/components/creators/sidebar"
import CreatorGrid from "@/components/creators/creator-grid"
import Pagination from "@/components/creators/pagination"
import SearchBar from "@/components/creators/search-bar"
import BottomNav from "@/components/creators/bottom-nav"
import InquiryModal from "@/components/creators/inquiry-modal"
import CreatorDetailsModal from "@/components/creators/creator-details-modal"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTalentList } from "@/hooks/use-user"
import { PublicTalentItem } from "@/lib/redux/features/user/userSlice"
import Loader from "@/components/shared/Loader"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav"

const CREATORS_PER_PAGE = 8

function transformTalentToCreator(talent: PublicTalentItem) {
  return {
    id: talent.id,
    name: talent.display_name,
    followers: talent.followers > 0 ? `${(talent.followers / 1000).toFixed(1)}K` : "0",
    category: talent.talent_type || talent.categories[0] || "Creator",
    rating: talent.verify_badge ? 5 : Math.floor(Math.random() * 2) + 4,
    image: talent.profile_image_url || "/placeholder.svg",
    tags: talent.specializations.length > 0 ? talent.specializations : talent.categories.slice(0, 3),
    bio: talent.bio,
    location: talent.location,
    experienceLevel: talent.experience_level,
    rates: talent.rates,
    verifyBadge: talent.verify_badge
  }
}

export interface Creator {
  id: string
  name: string
  followers: string
  category: string
  rating: number
  image: string
  tags: string[]
}

export default function Home() {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedRating, setSelectedRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeNav, setActiveNav] = useState("explore")
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [selectedCreatorForInquiry, setSelectedCreatorForInquiry] = useState<Creator | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedCreatorForDetails, setSelectedCreatorForDetails] = useState<Creator | null>(null)

  const { talents } = useTalentList(true)

  const { publicTalents, talentsPagination, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );

  // Transform talents directly in useMemo instead of useEffect + state
  const creators = useMemo(() => {
    if (publicTalents && publicTalents.length > 0) {
      return publicTalents.map(transformTalentToCreator)
    }
    return []
  }, [publicTalents])

  const categories = [
    "Bollywood",
    "Haryanavi",
    "Bhojpuri",
    "Actor",
    "Model",
    "Writer",
    "Dancer",
    "Singer",
    "Standup",
    "Voice Over",
    "Anchors",
    "Poetry",
    "Fitness",
    "Lifestyle",
    "Beauty",
    "Education",
    "Finance",
    "Sports",
    "Yoga",
    "Spritual",
    "Speaker",
    "Gadget",
    "Gaming",
    "Real Estate",
    "Finance ",
    "Parenting",
    "Cooking",
    "Food",
    "Podcast",
    "Travel",
    "Vlogger"
  ]
  const newCategories = categories.map((item: any, index) => {
    return { id: index.toString(), name: item }
  })
  const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"]
  const newCitis = cities.map((item: any, index) => {
    return { id: index.toString(), name: item }
  })
  const filteredCreators = useMemo(() => {
    let filtered = [...creators] // Create a copy

    if (searchQuery) {
      filtered = filtered.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((creator) => selectedCategories.includes(creator.category))
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((creator) => creator.rating >= selectedRating)
    }

    // Sorting
    if (sortBy === "popular") {
      filtered.sort((a, b) => Number.parseInt(b.followers) - Number.parseInt(a.followers))
    } else if (sortBy === "newest") {
      // filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "active") {
      // filtered.sort((a, b) => a.id - b.id)
    }

    return filtered
  }, [creators, searchQuery, selectedCategories, selectedCity, selectedRating, sortBy])

  const totalPages = Math.ceil(filteredCreators.length / CREATORS_PER_PAGE)
  const paginatedCreators = filteredCreators.slice(
    (currentPage - 1) * CREATORS_PER_PAGE,
    currentPage * CREATORS_PER_PAGE,
  )

  const handleCategoryChange = (category: string) => {
    if (category === "All Categories") {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
      )
    }
    setCurrentPage(1)
  }

  const handleTalkToCreator = (creator: Creator) => {
    setSelectedCreatorForInquiry(creator)
    setInquiryModalOpen(true)
  }

  const handleCreatorDoubleClick = (creator: Creator) => {
    setSelectedCreatorForDetails(creator)
    setDetailsModalOpen(true)
  }

  const handleInquirySubmit = (data: any) => {
    console.log("Inquiry submitted:", {
      creator: selectedCreatorForInquiry?.name,
      ...data,
    })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-6xl mx-auto flex-col lg:flex-row gap-6 px-4 pb-24 lg:py-8">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredCreators.length}
          />

          <CreatorGrid
            creators={paginatedCreators}
            onTalkToCreator={handleTalkToCreator}
            onCreatorDoubleClick={handleCreatorDoubleClick}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalResults={filteredCreators.length}
            resultsPerPage={CREATORS_PER_PAGE}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}

      <MobileBottomNav categories={newCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        cities={newCitis}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating} />
      {/* {isMobile && <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />} */}

      <InquiryModal
        isOpen={inquiryModalOpen}
        creatorName={selectedCreatorForInquiry?.name || ""}
        onClose={() => setInquiryModalOpen(false)}
        onSubmit={handleInquirySubmit}
      />

      <CreatorDetailsModal
        isOpen={detailsModalOpen}
        creator={selectedCreatorForDetails}
        onClose={() => setDetailsModalOpen(false)}
        onTalkToCreator={() => {
          setDetailsModalOpen(false)
          if (selectedCreatorForDetails) {
            handleTalkToCreator(selectedCreatorForDetails)
          }
        }}
      />
    </div>
  )
}