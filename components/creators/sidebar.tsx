"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

interface SidebarProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
  cities: string[]
  selectedCity: string
  onCityChange: (city: string) => void
  selectedRating: number
  onRatingChange: (rating: number) => void
}

export default function Sidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  cities,
  selectedCity,
  onCityChange,
  selectedRating,
  onRatingChange,
}: SidebarProps) {
  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={
                  selectedCategories.includes(category) ||
                  (category === "All Categories" && selectedCategories.length === 0)
                }
                onCheckedChange={() => onCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* City Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">City</h3>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[0, 5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => onRatingChange(rating === selectedRating ? 0 : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center gap-1">
                {rating === 0 ? (
                  "All"
                ) : (
                  <>
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-muted-foreground" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">& up</span>
                  </>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sign up CTA */}
      <div className="bg-muted p-6 rounded-lg text-center">
        <div className="text-3xl mb-2">✨</div>
        <h4 className="font-semibold mb-2">Sign up as an Influencer</h4>
        <p className="text-xs text-muted-foreground">Start earning with your content</p>
      </div>
    </div>
  )
}
