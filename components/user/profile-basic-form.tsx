"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { UserProfile } from "@/types/profile"
import { Loader2 } from "lucide-react"
import { UpdateProfileData } from "@/types/profile.types"
import { ImageUpload } from "./image-upload"

interface ProfileBasicFormProps {
  profile: UserProfile
  onSubmit: (data: UpdateProfileData) => Promise<void>
  isLoading: boolean
  onCancel: () => void
}

export function ProfileBasicForm({ profile, onSubmit, isLoading, onCancel }: ProfileBasicFormProps) {
  const [profileImagePreview, setProfileImagePreview] = useState(profile.profile_image_url || "")
  const [bannerImagePreview, setBannerImagePreview] = useState(profile.banner_image_url || "")
  const [uploadingProfile, setUploadingProfile] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)

  const [formData, setFormData] = useState<UpdateProfileData>({
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    display_name: profile.display_name || "",
    bio: profile.bio || "",
    whatsapp: profile.whatsapp || "",
    dob: profile.dob || "",
    cintaId: profile.cintaId || "",
    website_url: profile.website_url || "",
    location_city: profile.location_city || "",
    location_state: profile.location_state || "",
    location_country: profile.location_country || "",
    languages: profile.languages || "",
    highest_education: profile.highest_education || "",
    profile_image_url: profile.profile_image_url || "",
    banner_image_url: profile.banner_image_url || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleProfileImageUpload = async (url: string) => {
    setUploadingProfile(true)
    try {
      setProfileImagePreview(url)
      setFormData((prev) => ({
        ...prev,
        profile_image_url: url,
      }))
    } finally {
      setUploadingProfile(false)
    }
  }

  const handleBannerImageUpload = async (url: string) => {
    setUploadingBanner(true)
    try {
      setBannerImagePreview(url)
      setFormData((prev) => ({
        ...prev,
        banner_image_url: url,
      }))
    } finally {
      setUploadingBanner(false)
    }
  }

  const handleProfileImageRemove = () => {
    setProfileImagePreview("")
    setFormData((prev) => ({
      ...prev,
      profile_image_url: "",
    }))
  }

  const handleBannerImageRemove = () => {
    setBannerImagePreview("")
    setFormData((prev) => ({
      ...prev,
      banner_image_url: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture Upload */}
      <ImageUpload
        label="Profile Picture"
        preview={profileImagePreview}
        onUpload={handleProfileImageUpload}
        onRemove={handleProfileImageRemove}
        loading={uploadingProfile}
      />

      {/* Banner Image Upload */}
      <ImageUpload
        label="Banner Image"
        preview={bannerImagePreview}
        onUpload={handleBannerImageUpload}
        onRemove={handleBannerImageRemove}
        loading={uploadingBanner}
      />

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">Cinata ID</Label>
          <Input
            id="cintaId"
            name="cintaId"
            value={formData.cintaId}
            onChange={handleChange}
            placeholder="Enter Your ID "
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date Of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Select level</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Otjers</option>

          </select>
        </div>
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={handleChange}
          placeholder="How you want to be displayed"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows={4}
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website_url">Website</Label>
            <Input
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="font-semibold">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location_city">City</Label>
            <Input
              id="location_city"
              name="location_city"
              value={formData.location_city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location_state">State</Label>
            <Input
              id="location_state"
              name="location_state"
              value={formData.location_state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location_country">Country</Label>
            <Input
              id="location_country"
              name="location_country"
              value={formData.location_country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Input
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="e.g., English, Spanish, French"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="highest_education">Highest Education</Label>
          <Input
            id="highest_education"
            name="highest_education"
            value={formData.highest_education}
            onChange={handleChange}
            placeholder="e.g., Bachelor's Degree"
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