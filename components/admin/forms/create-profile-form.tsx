"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useCloudinaryUpload } from "@/hooks/use-cloudnary-upload"
import { Upload, X } from "lucide-react"

interface CreateProfileFormProps {
  userId: string
}

export function CreateProfileForm({ userId }: CreateProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const { uploadImage, loading: uploading, error: uploadError } = useCloudinaryUpload()
  const [profileImage, setProfileImage] = useState<string>("")
  const [bannerImage, setBannerImage] = useState<string>("")

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    bio: "",
    cintaId: "",
    whatsapp: "",
    location_city: "",
    location_state: "",
    location_country: "",
    website_url: "",
    time_zone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "banner") => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage(file)
    if (url) {
      if (type === "profile") {
        setProfileImage(url)
      } else {
        setBannerImage(url)
      }
    }
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
      alert("Profile created successfully!")
      setFormData({
        first_name: "",
        last_name: "",
        display_name: "",
        bio: "",
        cintaId: "",
        whatsapp: "",
        location_city: "",
        location_state: "",
        location_country: "",
        website_url: "",
        time_zone: "",
      })
      setProfileImage("")
      setBannerImage("")
    } catch (error) {
      console.error("Error creating profile:", error)
      alert("Failed to create profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label className="font-semibold">Profile Image</Label>
            <div className="relative">
              {profileImage ? (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setProfileImage("")}
                    className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "profile")}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Banner Image */}
          <div className="space-y-2">
            <Label className="font-semibold">Banner Image</Label>
            <div className="relative">
              {bannerImage ? (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                  <img src={bannerImage || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setBannerImage("")}
                    className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "banner")}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {uploadError && <p className="text-destructive text-sm">{uploadError}</p>}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="font-semibold">
              First Name *
            </Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="John"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name" className="font-semibold">
              Last Name *
            </Label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Doe"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>
        </div>

        {/* Display Name & Bio */}
        <div className="space-y-2">
          <Label htmlFor="display_name" className="font-semibold">
            Display Name
          </Label>
          <Input
            id="display_name"
            name="display_name"
            placeholder="John Doe"
            value={formData.display_name}
            onChange={handleChange}
            className="bg-input border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="font-semibold">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleChange}
            className="bg-input border-border min-h-24"
          />
        </div>

        {/* Contact & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cintaId" className="font-semibold">
              Cinta ID
            </Label>
            <Input
              id="cintaId"
              name="cintaId"
              placeholder="cinta_id_123"
              value={formData.cintaId}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="font-semibold">
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              placeholder="+1 (555) 000-0000"
              value={formData.whatsapp}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_city" className="font-semibold">
              City
            </Label>
            <Input
              id="location_city"
              name="location_city"
              placeholder="New York"
              value={formData.location_city}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_state" className="font-semibold">
              State
            </Label>
            <Input
              id="location_state"
              name="location_state"
              placeholder="NY"
              value={formData.location_state}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_country" className="font-semibold">
              Country
            </Label>
            <Input
              id="location_country"
              name="location_country"
              placeholder="United States"
              value={formData.location_country}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url" className="font-semibold">
              Website
            </Label>
            <Input
              id="website_url"
              name="website_url"
              type="url"
              placeholder="https://example.com"
              value={formData.website_url}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time_zone" className="font-semibold">
            Time Zone
          </Label>
          <Input
            id="time_zone"
            name="time_zone"
            placeholder="UTC-5"
            value={formData.time_zone}
            onChange={handleChange}
            className="bg-input border-border"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </Button>
      </form>
    </Card>
  )
}
