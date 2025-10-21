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

const CREATORS_PER_PAGE = 8

const mockCreators = [
  {
    id: 1,
    name: "Mark ",
    followers: "21.3K",
    category: "Beauty",
    rating: 5,
    image: "/creators/creator-profile-1.jpg",
    tags: ["Beauty", "Fashion", "Travel"],
  },
  {
    id: 2,
    name: "Dimple",
    followers: "105.8K",
    category: "Fashion",
    rating: 4,
    image: "/creators/creator-profile-2.jpg",
    tags: ["Fashion", "Lifestyle", "Travel"],
  },
  {
    id: 3,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 5,
    image: "/creators/creator-profile-3.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 4,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 5,
    image: "/creators/creator-profile-4.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 5,
    name: "Subnaree",
    followers: "21.3K",
    category: "Beauty",
    rating: 4,
    image: "/creator-profile-5.jpg",
    tags: ["Beauty", "Fashion", "Travel"],
  },
  {
    id: 6,
    name: "Dimple",
    followers: "105.8K",
    category: "Fashion",
    rating: 5,
    image: "/creators/creator-profile-6.jpg",
    tags: ["Fashion", "Lifestyle", "Travel"],
  },
  {
    id: 7,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 3,
    image: "/creators/creator-profile-7.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 8,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 4,
    image: "/creators/creator-profile-8.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 9,
    name: "Subnaree",
    followers: "21.3K",
    category: "Beauty",
    rating: 5,
    image: "/creators/creator-profile-9.jpg",
    tags: ["Beauty", "Fashion", "Travel"],
  },
  {
    id: 10,
    name: "Dimple",
    followers: "105.8K",
    category: "Fashion",
    rating: 4,
    image: "/creators/creator-profile-10.jpg",
    tags: ["Fashion", "Lifestyle", "Travel"],
  },
  {
    id: 11,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 5,
    image: "/creators/creator-profile-11.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 12,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 4,
    image: "/creators/placeholder-xaiii.png",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 13,
    name: "Subnaree",
    followers: "21.3K",
    category: "Beauty",
    rating: 5,
    image: "/creators/creator-profile-13.jpg",
    tags: ["Beauty", "Fashion", "Travel"],
  },
  {
    id: 14,
    name: "Dimple",
    followers: "105.8K",
    category: "Fashion",
    rating: 3,
    image: "/creators/creator-profile-14.jpg",
    tags: ["Fashion", "Lifestyle", "Travel"],
  },
  {
    id: 15,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 5,
    image: "/creators/creator-profile-15.jpg",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
  {
    id: 16,
    name: "Vaishali",
    followers: "22.7K",
    category: "Lifestyle",
    rating: 4,
    image: "/creators/placeholder.svg?height=300&width=300",
    tags: ["Entertainment", "Traveling", "Fashion"],
  },
]

interface Creator {
  id: number
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

  const categories = [
    "All Categories",
    "Beauty",
    "Bloggers",
    "Fashion",
    "Foods",
    "Gamers",
    "Life Styles",
    "Modeling",
    "Parenting",
    "Pets",
    "Photography",
    "Sports and Fitness",
    "Travel",
    "Vloggers",
  ]
  const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"]

  const filteredCreators = useMemo(() => {
    let filtered = mockCreators

    // Search filter
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
      filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "active") {
      filtered.sort((a, b) => a.id - b.id)
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedCity, selectedRating, sortBy])

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
    // Here you would typically send this to your backend
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 pb-24 lg:pb-8">
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
      {isMobile && <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />}

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
