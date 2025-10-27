"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"
import { Upload, X } from "lucide-react"

interface CreateTalentFormProps {
  userId: string
}

export function CreateTalentForm({ userId }: CreateTalentFormProps) {
  const [loading, setLoading] = useState(false)
  const { uploadImage, loading: uploading } = useCloudinaryUpload()
  const [awardImages, setAwardImages] = useState<string[]>([])

  const [formData, setFormData] = useState({
    talent_type: "musician",
    experience_level: "intermediate",
    years_of_experience: "",
    rate_per_hour: "",
    rate_per_project: "",
    rate_per_post: "",
    currency: "USD",
    availability_status: "available",
    portfolio_description: "",
    achievements: "",
    categories: [] as string[],
    specializations: [] as string[],
    certifications: [] as string[],
    verify_badge: false,
  })

  const [newCategory, setNewCategory] = useState("")
  const [newSpecialization, setNewSpecialization] = useState("")
  const [newCertification, setNewCertification] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }))
      setNewCategory("")
    }
  }

  const removeCategory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }))
  }

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization],
      }))
      setNewSpecialization("")
    }
  }

  const removeSpecialization = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    if (newCertification.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification],
      }))
      setNewCertification("")
    }
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const handleAwardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage(file)
    if (url) {
      setAwardImages((prev) => [...prev, url])
    }
  }

  const removeAwardImage = (index: number) => {
    setAwardImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) {
      alert("Please create a user first")
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Talent profile created successfully!")
      setFormData({
        talent_type: "musician",
        experience_level: "intermediate",
        years_of_experience: "",
        rate_per_hour: "",
        rate_per_project: "",
        rate_per_post: "",
        currency: "USD",
        availability_status: "available",
        portfolio_description: "",
        achievements: "",
        categories: [],
        specializations: [],
        certifications: [],
        verify_badge: false,
      })
      setAwardImages([])
    } catch (error) {
      console.error("Error creating talent:", error)
      alert("Failed to create talent profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Talent Type & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="talent_type" className="font-semibold">
              Talent Type *
            </Label>
            <Select value={formData.talent_type} onValueChange={(value) => handleSelectChange("talent_type", value)}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="musician">Musician</SelectItem>
                <SelectItem value="dancer">Dancer</SelectItem>
                <SelectItem value="actor">Actor</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
                <SelectItem value="videographer">Videographer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience_level" className="font-semibold">
              Experience Level *
            </Label>
            <Select
              value={formData.experience_level}
              onValueChange={(value) => handleSelectChange("experience_level", value)}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Experience & Rates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years_of_experience" className="font-semibold">
              Years of Experience
            </Label>
            <Input
              id="years_of_experience"
              name="years_of_experience"
              type="number"
              placeholder="5"
              value={formData.years_of_experience}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_status" className="font-semibold">
              Availability Status
            </Label>
            <Select
              value={formData.availability_status}
              onValueChange={(value) => handleSelectChange("availability_status", value)}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rate_per_hour" className="font-semibold">
              Rate/Hour
            </Label>
            <Input
              id="rate_per_hour"
              name="rate_per_hour"
              type="number"
              placeholder="50"
              value={formData.rate_per_hour}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate_per_project" className="font-semibold">
              Rate/Project
            </Label>
            <Input
              id="rate_per_project"
              name="rate_per_project"
              type="number"
              placeholder="500"
              value={formData.rate_per_project}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate_per_post" className="font-semibold">
              Rate/Post
            </Label>
            <Input
              id="rate_per_post"
              name="rate_per_post"
              type="number"
              placeholder="100"
              value={formData.rate_per_post}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="font-semibold">
              Currency
            </Label>
            <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <Label className="font-semibold">Categories</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
              className="bg-input border-border"
            />
            <Button type="button" onClick={addCategory} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.categories.map((cat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {cat}
                <button type="button" onClick={() => removeCategory(index)} className="hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-2">
          <Label className="font-semibold">Specializations</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add specialization..."
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
              className="bg-input border-border"
            />
            <Button type="button" onClick={addSpecialization} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.specializations.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {spec}
                <button type="button" onClick={() => removeSpecialization(index)} className="hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <Label className="font-semibold">Certifications</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add certification..."
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
              className="bg-input border-border"
            />
            <Button type="button" onClick={addCertification} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {cert}
                <button type="button" onClick={() => removeCertification(index)} className="hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio & Achievements */}
        <div className="space-y-2">
          <Label htmlFor="portfolio_description" className="font-semibold">
            Portfolio Description
          </Label>
          <Textarea
            id="portfolio_description"
            name="portfolio_description"
            placeholder="Describe your portfolio..."
            value={formData.portfolio_description}
            onChange={handleChange}
            className="bg-input border-border min-h-24"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="achievements" className="font-semibold">
            Achievements
          </Label>
          <Textarea
            id="achievements"
            name="achievements"
            placeholder="List your achievements..."
            value={formData.achievements}
            onChange={handleChange}
            className="bg-input border-border min-h-24"
          />
        </div>

        {/* Award Images */}
        <div className="space-y-2">
          <Label className="font-semibold">Award Images</Label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors p-6">
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload award images</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAwardImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {awardImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Award ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeAwardImage(index)}
                  className="absolute top-1 right-1 p-1 bg-destructive rounded-full text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Verify Badge */}
        <div className="flex items-center gap-3">
          <input
            id="verify_badge"
            name="verify_badge"
            type="checkbox"
            checked={formData.verify_badge}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border"
          />
          <Label htmlFor="verify_badge" className="font-medium cursor-pointer">
            Request Verification Badge
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {loading ? "Creating Talent Profile..." : "Create Talent Profile"}
        </Button>
      </form>
    </Card>
  )
}
