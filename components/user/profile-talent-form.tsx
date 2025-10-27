"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { Loader2, X } from "lucide-react"
import type { TalentProfile } from "@/types/talent.types"

interface ProfileTalentFormProps {
  talent: TalentProfile | null
  onSubmit: (data: any) => Promise<void>
  isLoading: boolean
  onCancel: () => void
}

const ACTOR_CATEGORIES = [
  "Drama",
  "Comedy",
  "Action",
  "Thriller",
  "Romance",
  "Horror",
  "Sci-Fi",
  "Fantasy",
  "Documentary",
  "Animation",
]

const ARTIST_CATEGORIES = [
  "Influencer",
  "Content Creator",
  "Musician",
  "Dancer",
  "Photographer",
  "Videographer",
  "Illustrator",
  "Designer",
  "Writer",
  "Comedian",
]

export function ProfileTalentForm({ talent, onSubmit, isLoading, onCancel }: ProfileTalentFormProps) {
  const [formData, setFormData] = useState({
    talent_type: talent?.talent_type || "",
    experience_level: talent?.experience_level || "",
    years_of_experience: talent?.years_of_experience || 0,
    rate_per_video: talent?.rate_per_video || 0,
    rate_per_live: talent?.rate_per_live || 0,
    rate_per_post: talent?.rate_per_post || 0,
    currency: talent?.currency || "INR",
    availability_status: talent?.availability_status || "",
    portfolio_description: talent?.portfolio_description || "",
    achievements: talent?.achievements || "",
    categories: talent?.categories || [],
    specializations: talent?.specializations || [],
  })

  const [specializationInput, setSpecializationInput] = useState("")

  const getAvailableCategories = () => {
    if (formData.talent_type === "actor") return ACTOR_CATEGORIES
    if (formData.talent_type === "artist") return ARTIST_CATEGORIES
    return [...ACTOR_CATEGORIES, ...ARTIST_CATEGORIES]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "talent_type") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        categories: [],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name.includes("rate") || name === "years_of_experience" ? Number(value) : value,
      }))
    }
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c:any) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleAddSpecialization = () => {
    if (specializationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, specializationInput.trim()],
      }))
      setSpecializationInput("")
    }
  }

  const handleRemoveSpecialization = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_:any, i:number) => i !== index),
    }))
  }

  const handleSpecializationKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSpecialization()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const availableCategories = getAvailableCategories()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Talent Type</h3>
        <div className="space-y-2">
          <Label htmlFor="talent_type">Select Talent Type</Label>
          <select
            id="talent_type"
            name="talent_type"
            value={formData.talent_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Select type</option>
            <option value="actor">Actor</option>
            <option value="artist">Artist</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience_level">Experience Level</Label>
            <select
              id="experience_level"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="years_of_experience">Years of Experience</Label>
            <Input
              id="years_of_experience"
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Availability & Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="availability_status">Availability Status</Label>
          <select
            id="availability_status"
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Select status</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" name="currency" value={formData.currency} onChange={handleChange} placeholder="INR" />
        </div>
      </div>

      {/* Rates */}
      <div className="space-y-4">
        <h3 className="font-semibold">Rates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rate_per_video">Per Video</Label>
            <Input
              id="rate_per_video"
              name="rate_per_video"
              type="number"
              value={formData.rate_per_video}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate_per_live">Per Live</Label>
            <Input
              id="rate_per_live"
              name="rate_per_live"
              type="number"
              value={formData.rate_per_live}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate_per_post">Per Post</Label>
            <Input
              id="rate_per_post"
              name="rate_per_post"
              type="number"
              value={formData.rate_per_post}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Expertise</h3>

        {/* Categories Multi-Select */}
        <div className="space-y-2">
          <Label>
            Categories
            {formData.talent_type && (
              <span className="text-sm text-muted-foreground ml-2">
                ({formData.talent_type === "both" ? "All" : formData.talent_type})
              </span>
            )}
          </Label>
          {!formData.talent_type ? (
            <p className="text-sm text-muted-foreground italic">Please select a talent type first</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 border border-input rounded-md bg-muted/30">
              {availableCategories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded border-input"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          )}
          {formData.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories.map((cat:any) => (
                <span key={cat} className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Specializations Todo-like Input */}
        <div className="space-y-2">
          <Label htmlFor="specialization_input">Specializations</Label>
          <div className="flex gap-2">
            <Input
              id="specialization_input"
              value={specializationInput}
              onChange={(e) => setSpecializationInput(e.target.value)}
              onKeyPress={handleSpecializationKeyPress}
              placeholder="Type a specialization and press Enter or click Add"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddSpecialization} variant="outline">
              Add
            </Button>
          </div>
          {formData.specializations.length > 0 && (
            <div className="space-y-2 mt-3">
              <p className="text-sm text-muted-foreground">Added specializations:</p>
              <div className="flex flex-wrap gap-2">
                {formData.specializations.map((spec:any, index:number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    <span>{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialization(index)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio & Achievements */}
      <div className="space-y-4">
        <h3 className="font-semibold">Portfolio & Achievements</h3>
        <div className="space-y-2">
          <Label htmlFor="portfolio_description">Portfolio Description</Label>
          <Textarea
            id="portfolio_description"
            name="portfolio_description"
            value={formData.portfolio_description}
            onChange={handleChange}
            placeholder="Describe your portfolio and best work"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="achievements">Achievements</Label>
          <Textarea
            id="achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="List your key achievements and milestones"
            rows={4}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
