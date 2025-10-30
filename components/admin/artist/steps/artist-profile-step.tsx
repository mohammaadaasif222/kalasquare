"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/admin/forms/form-input"
import { FormTextarea } from "@/components/admin/forms/form-textarea"
import { FormSelect } from "@/components/admin/forms/form-select"
import { FormCheckboxGroup } from "@/components/admin/forms/form-checkbox-group"
import { useUser } from "@/hooks/use-user"
import { useProfile } from "@/hooks/use-profile"
import { type AvailabilityStatus, type ExperienceLevel, type TalentType, useTalent } from "@/hooks/use-talent"
import { ImageUpload } from "@/components/user/image-upload"
import { Loader2, X } from "lucide-react"

interface FormData {
  email: string
  phone: string
  password: string
  first_name: string
  last_name: string
  display_name: string
  bio: string
  highest_education: string
  website_url: string
  location_city: string
  location_state: string
  location_country: string
  dob: string
  gender: string
  languages: string[]
  profile_image_url: string | null
  talent_type: TalentType
  categories: string[]
  specializations: string[]
  experience_level: ExperienceLevel
  years_of_experience: number
  rate_per_live: number
  rate_per_video: number
  rate_per_post: number
  currency: string
  availability_status: AvailabilityStatus
  portfolio_description: string
  achievements: string
  awards: string[]
  certifications: string[]
  collaboration_preferences: string[]
  cintaId: string
  whatsapp: string
  manager_contact: string
}

const INITIAL_FORM_DATA: FormData = {
  email: "",
  phone: "",
  password: "",
  first_name: "",
  last_name: "",
  display_name: "",
  bio: "",
  website_url: "",
  location_city: "",
  location_state: "",
  location_country: "",
  highest_education: "",
  dob: "",
  gender: "",
  languages: [],
  profile_image_url: null,
  talent_type: "artist",
  categories: [],
  specializations: [],
  experience_level: "beginner",
  years_of_experience: 0,
  rate_per_live: 0,
  rate_per_video: 0,
  rate_per_post: 0,
  currency: "USD",
  availability_status: "available",
  portfolio_description: "",
  achievements: "",
  awards: [],
  certifications: [],
  collaboration_preferences: [],
  cintaId: "",
  whatsapp: "",
  manager_contact: "",
}

const ACTOR_CATEGORIES = ["Drama", "Comedy", "Action", "Thriller", "Romance", "Horror", "Sci-Fi", "Animation"]
const INFLUENCER_CATEGORIES = ["Fashion", "Beauty", "Fitness", "Lifestyle", "Tech", "Travel", "Food", "Gaming"]
const ARTIST_CATEGORIES = [
  "Electronic",
  "Hip-Hop",
  "Indie",
  "Pop",
  "Rock",
  "Jazz",
  "Classical",
  "R&B",
  "Country",
  "Other",
]
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"]
const EXPERIENCE_LEVELS = ["beginner", "intermediate", "professional", "expert"]
const AVAILABILITY_STATUSES = ["available", "busy", "booked", "inactive"]
const COLLABORATION_PREFS = [
  "Solo Projects",
  "Band/Group",
  "Studio Sessions",
  "Live Performances",
  "Remote Work",
  "In-Person Only",
]

interface ValidationErrors {
  [key: string]: string
}

interface Props {
  onComplete: (data: any) => void
}

export default function ArtistProfileStep({ onComplete }: Props) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [profileImagePreview, setProfileImagePreview] = useState("")
  const [uploadingProfile, setUploadingProfile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [specializationInput, setSpecializationInput] = useState("")
  const [languageInput, setLanguageInput] = useState("")
  const [awardInput, setAwardInput] = useState("")
  const [certificationInput, setCertificationInput] = useState("")
  const [submitProgress, setSubmitProgress] = useState(0)

  const { create, isLoading } = useUser()
  const { createProfile, loading } = useProfile()
  const { createTalent, loading: talentLoading } = useTalent()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const getAvailableCategories = () => {
    if (formData.talent_type === "actor") return ACTOR_CATEGORIES
    if (formData.talent_type === "influencer") return INFLUENCER_CATEGORIES
    if (formData.talent_type === "both")
      return [...new Set([...ACTOR_CATEGORIES, ...INFLUENCER_CATEGORIES, ...ARTIST_CATEGORIES])]
    return ARTIST_CATEGORIES
  }

  const handleArrayToggle = (field: "categories" | "collaboration_preferences", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleAddSpecialization = () => {
    const trimmed = specializationInput.trim()
    if (trimmed && !formData.specializations.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, trimmed],
      }))
      setSpecializationInput("")
    }
  }

  const handleRemoveSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== spec),
    }))
  }

  const handleAddLanguage = () => {
    const trimmed = languageInput.trim()
    if (trimmed && !formData.languages.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, trimmed],
      }))
      setLanguageInput("")
    }
  }

  const handleRemoveLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }))
  }

  const handleAddAward = () => {
    const trimmed = awardInput.trim()
    if (trimmed && !formData.awards.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        awards: [...prev.awards, trimmed],
      }))
      setAwardInput("")
    }
  }

  const handleRemoveAward = (award: string) => {
    setFormData((prev) => ({
      ...prev,
      awards: prev.awards.filter((a) => a !== award),
    }))
  }

  const handleAddCertification = () => {
    const trimmed = certificationInput.trim()
    if (trimmed && !formData.certifications.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, trimmed],
      }))
      setCertificationInput("")
    }
  }

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^[\d\s\-+()]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Invalid phone number"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.categories.length === 0) newErrors.categories = "Select at least one category"
    if (formData.specializations.length === 0) newErrors.specializations = "Add at least one specialization"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitProgress(0)

    try {
      // Step 1: Create User
      setSubmitProgress(25)
      const userPayload = {
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        user_type: "user",
      }
      const newUser = await create(userPayload)
      const userId = newUser.payload.id

      // Step 2: Create Profile
      setSubmitProgress(50)
      const profilePayload = {
        user_id: userId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        display_name: formData.display_name,
        bio: formData.bio,
        dob: formData.dob,
        gender: formData.gender,
        profile_image_url: formData.profile_image_url ?? "",
        banner_image_url: "",
        location_city: formData.location_city,
        location_state: formData.location_state,
        location_country: formData.location_country,
        website_url: formData.website_url,
        languages: formData.languages,
        highest_education: formData.highest_education,
        cintaId: formData.cintaId,
        whatsapp: formData.whatsapp,
      }
      await createProfile(profilePayload)

      // Step 3: Create Talent Profile
      setSubmitProgress(75)
      const talentPayload = {
        user_id: userId,
        talent_type: formData.talent_type,
        categories: formData.categories,
        specializations: formData.specializations,
        experience_level: formData.experience_level,
        years_of_experience: Number(formData.years_of_experience),
        rate_per_video: formData.rate_per_video,
        rate_per_live: formData.rate_per_live,
        rate_per_post: formData.rate_per_post,
        availability_status: formData.availability_status,
        portfolio_description: formData.portfolio_description,
        achievements: formData.achievements,
        awards: formData.awards,
        certifications: formData.certifications,
        collaboration_preferences: formData.collaboration_preferences,
        verify_badge: false,
      }
      const talent = await createTalent(talentPayload)
      const talentProfileId = talent.payload.id

      setSubmitProgress(100)

      // Call onComplete with the data
      onComplete({
        talentProfileId,
        userId,
        profileData: formData,
      })
    } catch (error) {
      console.error("Error during submission:", error)
      setErrors({ submit: "Failed to create profile. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setProfileImagePreview(url)
    setFormData((prev) => ({
      ...prev,
      profile_image_url: url,
    }))
  }

  const handleImageRemove = () => {
    setProfileImagePreview("")
    setFormData((prev) => ({
      ...prev,
      profile_image_url: "",
    }))
  }

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Artist Profile</h2>
          <p className="text-slate-600">Tell us about yourself and your artistic journey</p>
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.submit}</div>
        )}

        {/* Account Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="artist@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
            <FormInput
              label="Phone Number"
              id="phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              required
            />
          </div>
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <FormInput
              label="Last Name"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <FormInput
            label="Display Name"
            id="display_name"
            name="display_name"
            placeholder="How you want to be displayed"
            value={formData.display_name}
            onChange={handleInputChange}
          />
          <FormTextarea
            label="Bio"
            id="bio"
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleInputChange}
            maxLength={500}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Gender"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={GENDERS.map((g) => ({ value: g, label: g }))}
            />
          </div>
          <FormInput
            label="Highest Education"
            id="highest_education"
            name="highest_education"
            placeholder="e.g., Bachelor's Degree"
            value={formData.highest_education}
            onChange={handleInputChange}
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Languages</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddLanguage()
                  }
                }}
                placeholder="Type a language and press Enter"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={handleAddLanguage} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang) => (
                <div
                  key={lang}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {lang}
                  <button onClick={() => handleRemoveLanguage(lang)} className="hover:text-blue-600 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="City"
              id="location_city"
              name="location_city"
              placeholder="City"
              value={formData.location_city}
              onChange={handleInputChange}
            />
            <FormInput
              label="State"
              id="location_state"
              name="location_state"
              placeholder="State"
              value={formData.location_state}
              onChange={handleInputChange}
            />
            <FormInput
              label="Country"
              id="location_country"
              name="location_country"
              placeholder="Country"
              value={formData.location_country}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Website URL"
              id="website_url"
              name="website_url"
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.website_url}
              onChange={handleInputChange}
            />
            <FormInput
              label="CINTA ID"
              id="cintaId"
              name="cintaId"
              placeholder="CINTA ID"
              value={formData.cintaId}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="WhatsApp"
              id="whatsapp"
              name="whatsapp"
              placeholder="+1 (555) 000-0000"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
            <FormInput
              label="Manager Contact"
              id="manager_contact"
              name="manager_contact"
              placeholder="Manager contact"
              value={formData.manager_contact}
              onChange={handleInputChange}
            />
          </div>
          <ImageUpload
            label="Profile Picture"
            preview={profileImagePreview}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            loading={uploadingProfile}
          />
        </div>

        {/* Talent Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Talent Information</h3>
          <FormSelect
            label="Talent Type"
            id="talent_type"
            name="talent_type"
            value={formData.talent_type}
            onChange={handleInputChange}
            options={[
              { value: "artist", label: "Artist" },
              { value: "influencer", label: "Influencer" },
              { value: "actor", label: "Actor" },
              { value: "both", label: "Both" },
            ]}
          />
          <FormCheckboxGroup
            label="Categories"
            options={getAvailableCategories()}
            selected={formData.categories}
            onChange={(cat) => handleArrayToggle("categories", cat)}
            error={errors.categories}
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Specializations <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={specializationInput}
                onChange={(e) => setSpecializationInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddSpecialization()
                  }
                }}
                placeholder="Type a specialization and press Enter"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={handleAddSpecialization} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec) => (
                <div
                  key={spec}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {spec}
                  <button
                    onClick={() => handleRemoveSpecialization(spec)}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Experience Level"
              id="experience_level"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleInputChange}
              options={EXPERIENCE_LEVELS.map((level) => ({
                value: level,
                label: level.charAt(0).toUpperCase() + level.slice(1),
              }))}
            />
            <FormInput
              label="Years of Experience"
              id="years_of_experience"
              name="years_of_experience"
              type="number"
              placeholder="0"
              value={formData.years_of_experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormInput
              label="Rate/Live"
              id="rate_per_live"
              name="rate_per_live"
              type="number"
              placeholder="0.00"
              value={formData.rate_per_live}
              onChange={handleInputChange}
            />
            <FormInput
              label="Rate/Video"
              id="rate_per_video"
              name="rate_per_video"
              type="number"
              placeholder="0.00"
              value={formData.rate_per_video}
              onChange={handleInputChange}
            />
            <FormInput
              label="Rate/Post"
              id="rate_per_post"
              name="rate_per_post"
              type="number"
              placeholder="0.00"
              value={formData.rate_per_post}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Currency"
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              options={[
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "GBP", label: "GBP" },
                { value: "INR", label: "INR" },
                { value: "AUD", label: "AUD" },
              ]}
            />
          </div>
          <FormSelect
            label="Availability Status"
            id="availability_status"
            name="availability_status"
            value={formData.availability_status}
            onChange={handleInputChange}
            options={AVAILABILITY_STATUSES.map((status) => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1),
            }))}
          />
          <FormTextarea
            label="About Your Work"
            id="portfolio_description"
            name="portfolio_description"
            placeholder="Describe your work and style..."
            value={formData.portfolio_description}
            onChange={handleInputChange}
            rows={3}
          />
          <FormTextarea
            label="Achievements"
            id="achievements"
            name="achievements"
            placeholder="List your achievements..."
            value={formData.achievements}
            onChange={handleInputChange}
            rows={3}
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Awards</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={awardInput}
                onChange={(e) => setAwardInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddAward()
                  }
                }}
                placeholder="Type an award and press Enter"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={handleAddAward} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.awards.map((award) => (
                <div
                  key={award}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {award}
                  <button onClick={() => handleRemoveAward(award)} className="hover:text-amber-600 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Certifications</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCertification()
                  }
                }}
                placeholder="Type a certification and press Enter"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={handleAddCertification} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert) => (
                <div
                  key={cert}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {cert}
                  <button
                    onClick={() => handleRemoveCertification(cert)}
                    className="hover:text-green-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <FormCheckboxGroup
            label="Collaboration Preferences"
            options={COLLABORATION_PREFS}
            selected={formData.collaboration_preferences}
            onChange={(pref) => handleArrayToggle("collaboration_preferences", pref)}
            columns={2}
          />
        </div>

        {/* Submit Progress */}
        {isSubmitting && (
          <div className="bg-slate-50 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Creating your profile...</h3>
              <span className="text-sm text-slate-600">{submitProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${submitProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-slate-200">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Profile...
              </span>
            ) : (
              "Continue to Social Media"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
