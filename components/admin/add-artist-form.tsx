
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { FormSection } from "@/components/admin/forms/form-section"
// import { FormInput } from "@/components/admin/forms/form-input"
// import { FormTextarea } from "@/components/admin/forms/form-textarea"
// import { FormSelect } from "@/components/admin/forms/form-select"
// import { FormCheckboxGroup } from "@/components/admin/forms/form-checkbox-group"
// import { useUser } from "@/hooks/use-user"
// import { useProfile } from "@/hooks/use-profile"
// import { type AvailabilityStatus, type ExperienceLevel, type TalentType, useTalent } from "@/hooks/use-talent"
// import { ImageUpload } from "@/components/user/image-upload"
// import { Loader2, CheckCircle2 } from "lucide-react"

// interface FormData {
//   email: string
//   phone: string
//   password: string
//   first_name: string
//   last_name: string
//   display_name: string
//   bio: string
//   highest_education: string
//   website_url: string
//   location_city: string
//   location_state: string
//   location_country: string
//   dob: string
//   gender: string
//   languages: string[]
//   profile_image_url: string | null
//   talent_type: TalentType
//   categories: string[]
//   specializations: string[]
//   experience_level: ExperienceLevel
//   years_of_experience: number
//   rate_per_live: number
//   rate_per_video: number
//   rate_per_post: number
//   currency: string
//   availability_status: AvailabilityStatus
//   portfolio_description: string
//   achievements: string
//   awards: string[]
//   certifications: string[]
//   collaboration_preferences: string[]
//   cintaId: string
//   whatsapp: string
//   manager_contact: string
//   reels: string[]
//   videos: string[]
// }

// const INITIAL_FORM_DATA: FormData = {
//   email: "",
//   phone: "",
//   password: "",
//   first_name: "",
//   last_name: "",
//   display_name: "",
//   bio: "",
//   website_url: "",
//   location_city: "",
//   location_state: "",
//   location_country: "",
//   highest_education: "",
//   dob: "",
//   gender: "",
//   languages: [],
//   profile_image_url: null,
//   talent_type: "artist",
//   categories: [],
//   specializations: [],
//   experience_level: "beginner",
//   years_of_experience: 0,
//   rate_per_live: 0,
//   rate_per_video: 0,
//   rate_per_post: 0,
//   currency: "USD",
//   availability_status: "available",
//   portfolio_description: "",
//   achievements: "",
//   awards: [],
//   certifications: [],
//   collaboration_preferences: [],
//   cintaId: "",
//   whatsapp: "",
//   manager_contact: "",
//   reels: Array(6).fill(""),
//   videos: Array(6).fill(""),
// }

// const CATEGORIES = ["Electronic", "Hip-Hop", "Indie", "Pop", "Rock", "Jazz", "Classical", "R&B", "Country", "Other"]
// const SPECIALIZATIONS = [
//   "Singing",
//   "Dancing",
//   "Acting",
//   "Music Production",
//   "Photography",
//   "Videography",
//   "Modeling",
//   "DJ",
//   "Songwriting",
//   "Choreography",
// ]
// const LANGUAGES = [
//   "English",
//   "Hindi",
//   "Spanish",
//   "French",
//   "German",
//   "Italian",
//   "Portuguese",
//   "Mandarin",
//   "Japanese",
//   "Korean",
// ]
// const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"]
// const EXPERIENCE_LEVELS = ["beginner", "intermediate",
//   "professional",
//   "expert"
// ]
// const AVAILABILITY_STATUSES = ["available",
//   "busy",
//   "booked",
//   "inactive"
// ]
// const COLLABORATION_PREFS = [
//   "Solo Projects",
//   "Band/Group",
//   "Studio Sessions",
//   "Live Performances",
//   "Remote Work",
//   "In-Person Only",
// ]

// interface ValidationErrors {
//   [key: string]: string
// }
// interface PartStatus {
//   [key: string]: "idle" | "loading" | "success" | "error"
// }

// export default function AddArtistForm() {
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
//   const [errors, setErrors] = useState<ValidationErrors>({})
//   const [profile_image_urlPreview, setprofile_image_urlPreview] = useState("")
//   const [uploadingProfile, setUploadingProfile] = useState(false)
//   const [partStatus, setPartStatus] = useState<PartStatus>({
//     user: "idle",
//     profile: "idle",
//     talent: "idle",
//     media: "idle",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitSuccess, setSubmitSuccess] = useState(false)

//   const { create, isLoading } = useUser()
//   const { createProfile, loading } = useProfile()
//   const { createTalent, loading: talentLoading } = useTalent()

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
//   }

//   const handleArrayToggle = (
//     field: "categories" | "specializations" | "languages" | "collaboration_preferences",
//     value: string,
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
//     }))
//   }

//   const handleMediaChange = (type: "reels" | "videos", index: number, value: string) => {
//     setFormData((prev) => {
//       const newMedia = [...prev[type]]
//       newMedia[index] = value
//       return { ...prev, [type]: newMedia }
//     })
//   }

//   const validateUserPart = (): boolean => {
//     const newErrors: ValidationErrors = {}
//     if (!formData.email.trim()) newErrors.email = "Email is required"
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required"
//     else if (!/^[\d\s\-+()]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10)
//       newErrors.phone = "Invalid phone number"
//     if (!formData.password.trim()) newErrors.password = "Password is required"
//     else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
//     setErrors((prev) => ({ ...prev, ...newErrors }))
//     return Object.keys(newErrors).length === 0
//   }

//   const validateProfilePart = (): boolean => {
//     return true
//   }

//   const validateTalentPart = (): boolean => {
//     const newErrors: ValidationErrors = {}
//     if (formData.categories.length === 0) newErrors.categories = "Select at least one category"
//     if (formData.specializations.length === 0) newErrors.specializations = "Select at least one specialization"
//     setErrors((prev) => ({ ...prev, ...newErrors }))
//     return Object.keys(newErrors).length === 0
//   }

//   const validateMediaPart = (): boolean => {
//     const newErrors: ValidationErrors = {}
//     formData.reels.forEach((reel, index) => {
//       if (reel.trim() && !/^https?:\/\/.+/.test(reel)) newErrors[`reels[${index}]`] = "Invalid URL"
//     })
//     formData.videos.forEach((video, index) => {
//       if (video.trim() && !/^https?:\/\/.+/.test(video)) newErrors[`videos[${index}]`] = "Invalid URL"
//     })
//     setErrors((prev) => ({ ...prev, ...newErrors }))
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmitAll = async () => {
//     setIsSubmitting(true)
//     setSubmitSuccess(false)

//     try {
//       // Step 1: User
//       if (!validateUserPart()) {
//         setIsSubmitting(false)
//         return
//       }
//       setPartStatus((prev) => ({ ...prev, user: "loading" }))
//       const pay = { email: formData.email, password: formData.password, phone: formData.phone, user_type: "user" }
//       const newUser = await create(pay)
//       localStorage.setItem("newUser", JSON.stringify(newUser.payload))
//       setPartStatus((prev) => ({ ...prev, user: "success" }))

//       // Step 2: Profile
//       if (!validateProfilePart()) {
//         setIsSubmitting(false)
//         return
//       }
//       setPartStatus((prev) => ({ ...prev, profile: "loading" }))
//       const storedUser = JSON.parse(localStorage.getItem("newUser") ?? "{}")
//       const profilePay = {
//         user_id: storedUser.id,
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         display_name: formData.display_name,
//         bio: formData.bio,
//         dob: formData.dob,
//         gender: formData.gender,
//         profile_image_url: formData.profile_image_url ?? "",
//         banner_image_url: "",
//         location_city: formData.location_city,
//         location_state: formData.location_state,
//         location_country: formData.location_country,
//         website_url: "",
//         languages: formData.languages,
//         highest_education: formData.highest_education,
//         cintaId: formData.cintaId,
//         whatsapp: formData.whatsapp,
//       }
//       await createProfile(profilePay)
//       setPartStatus((prev) => ({ ...prev, profile: "success" }))

//       // Step 3: Talent
//       if (!validateTalentPart()) {
//         setIsSubmitting(false)
//         return
//       }
//       setPartStatus((prev) => ({ ...prev, talent: "loading" }))
//       const talentPay = {
//         user_id: storedUser.id,
//         talent_type: formData.talent_type,
//         categories: formData.categories,
//         specializations: formData.specializations,
//         experience_level: formData.experience_level,
//         years_of_experience: Number(formData.years_of_experience),
//         rate_per_video: formData.rate_per_video,
//         rate_per_live: formData.rate_per_video,
//         rate_per_post: formData.rate_per_video,
//         availability_status: formData.availability_status,
//         portfolio_description: formData.portfolio_description,
//         achievements: formData.achievements,
//         awards: formData.awards,
//         certifications: formData.certifications,
//         collaboration_preferences: formData.collaboration_preferences,
//         verify_badge: false,
//       }
//       await createTalent(talentPay)
//       setPartStatus((prev) => ({ ...prev, talent: "success" }))

//       // Step 4: Media
//       if (!validateMediaPart()) {
//         setIsSubmitting(false)
//         return
//       }
//       setPartStatus((prev) => ({ ...prev, media: "loading" }))
//       const mediaData = {
//         reels: formData.reels.filter((r) => r.trim()),
//         videos: formData.videos.filter((v) => v.trim()),
//       }
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       setPartStatus((prev) => ({ ...prev, media: "success" }))

//       setSubmitSuccess(true)
//     } catch (error) {
//       console.error("Error during submission:", error)
//       setPartStatus((prev) => ({ ...prev, [Object.keys(prev).find((k) => prev[k] === "loading") || "user"]: "error" }))
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleImageUpload = (url: string) => {
//     setprofile_image_urlPreview(url)
//     setFormData((prev) => ({
//       ...prev,
//       profile_image_url: url,
//     }))
//   }

//   const handleImageRemove = () => {
//     setprofile_image_urlPreview("")
//     setFormData((prev) => ({
//       ...prev,
//       profile_image_url: "",
//     }))
//   }

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in duration-500">
//           <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
//           <h1 className="text-2xl font-bold text-slate-900">Registration Complete!</h1>
//           <p className="text-slate-600">Your artist profile has been successfully created.</p>
//           <Button onClick={() => window.location.reload()} className="w-full">
//             Create Another Profile
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-2 mb-8">
//           <h1 className="text-4xl font-bold text-slate-900">Create Artist Profile</h1>
//           <p className="text-slate-600">Complete all sections to register your artist account</p>
//         </div>

//         {/* Form Sections */}
//         <FormSection title="Account Details" description="Create your login credentials" status={partStatus.user}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="Email Address"
//               id="email"
//               name="email"
//               type="email"
//               placeholder="artist@example.com"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//               required
//             />
//             <FormInput
//               label="Phone Number"
//               id="phone"
//               name="phone"
//               placeholder="+1 (555) 000-0000"
//               value={formData.phone}
//               onChange={handleInputChange}
//               error={errors.phone}
//               required
//             />
//           </div>
//           <FormInput
//             label="Password"
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Minimum 8 characters"
//             value={formData.password}
//             onChange={handleInputChange}
//             error={errors.password}
//             required
//           />
//         </FormSection>

//         <FormSection title="Profile Information" description="Tell us about yourself" status={partStatus.profile}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="First Name"
//               id="first_name"
//               name="first_name"
//               placeholder="First name"
//               value={formData.first_name}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="Last Name"
//               id="last_name"
//               name="last_name"
//               placeholder="Last name"
//               value={formData.last_name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <FormInput
//             label="Display Name"
//             id="display_name"
//             name="display_name"
//             placeholder="How you want to be displayed"
//             value={formData.display_name}
//             onChange={handleInputChange}
//           />
//           <FormTextarea
//             label="Bio"
//             id="bio"
//             name="bio"
//             placeholder="Tell us about yourself..."
//             value={formData.bio}
//             onChange={handleInputChange}
//             maxLength={500}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="Date of Birth"
//               id="dob"
//               name="dob"
//               type="date"
//               value={formData.dob}
//               onChange={handleInputChange}
//             />
//             <FormSelect
//               label="Gender"
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               options={GENDERS.map((g) => ({ value: g, label: g }))}
//             />
//           </div>
//           <FormInput
//             label="Highest Education"
//             id="highest_education"
//             name="highest_education"
//             placeholder="e.g., Bachelor's Degree"
//             value={formData.highest_education}
//             onChange={handleInputChange}
//           />
//           <FormCheckboxGroup
//             label="Languages"
//             options={LANGUAGES}
//             selected={formData.languages}
//             onChange={(lang) => handleArrayToggle("languages", lang)}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <FormInput
//               label="City"
//               id="location_city"
//               name="location_city"
//               placeholder="City"
//               value={formData.location_city}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="State"
//               id="location_state"
//               name="location_state"
//               placeholder="State"
//               value={formData.location_state}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="Country"
//               id="location_country"
//               name="location_country"
//               placeholder="Country"
//               value={formData.location_country}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="CINTA ID"
//               id="cintaId"
//               name="cintaId"
//               placeholder="CINTA ID"
//               value={formData.cintaId}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="WhatsApp"
//               id="whatsapp"
//               name="whatsapp"
//               placeholder="+1 (555) 000-0000"
//               value={formData.whatsapp}
//               onChange={handleInputChange}
//             />
//           </div>
//           <ImageUpload
//             label="Profile Picture"
//             preview={profile_image_urlPreview}
//             onUpload={handleImageUpload}
//             onRemove={handleImageRemove}
//             loading={uploadingProfile}
//           />
//         </FormSection>

//         <FormSection
//           title="Talent Profile"
//           description="Showcase your skills and experience"
//           status={partStatus.talent}
//         >
//           <FormSelect
//             label="Talent Type"
//             id="talent_type"
//             name="talent_type"
//             value={formData.talent_type}
//             onChange={handleInputChange}
//             options={[
//               { value: "artist", label: "Artist" },
//               { value: "influencer", label: "Influencer" },
//               { value: "actor", label: "Actor" },
//               { value: "both", label: "Both" },
//             ]}
//           />
//           <FormCheckboxGroup
//             label="Categories"
//             options={CATEGORIES}
//             selected={formData.categories}
//             onChange={(cat) => handleArrayToggle("categories", cat)}
//             error={errors.categories}
//             required
//           />
//           <FormCheckboxGroup
//             label="Specializations"
//             options={SPECIALIZATIONS}
//             selected={formData.specializations}
//             onChange={(spec) => handleArrayToggle("specializations", spec)}
//             error={errors.specializations}
//             required
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormSelect
//               label="Experience Level"
//               id="experience_level"
//               name="experience_level"
//               value={formData.experience_level}
//               onChange={handleInputChange}
//               options={EXPERIENCE_LEVELS.map((level) => ({
//                 value: level,
//                 label: level.charAt(0).toUpperCase() + level.slice(1),
//               }))}
//             />
//             <FormInput
//               label="Years of Experience"
//               id="years_of_experience"
//               name="years_of_experience"
//               type="number"
//               placeholder="0"
//               value={formData.years_of_experience}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <FormInput
//               label="Rate/Hour"
//               id="rate_per_live"
//               name="rate_per_live"
//               type="number"
//               placeholder="0.00"
//               value={formData.rate_per_live}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="Rate/Project"
//               id="rate_per_video"
//               name="rate_per_video"
//               type="number"
//               placeholder="0.00"
//               value={formData.rate_per_video}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="Rate/Post"
//               id="rate_per_post"
//               name="rate_per_post"
//               type="number"
//               placeholder="0.00"
//               value={formData.rate_per_post}
//               onChange={handleInputChange}
//             />
//             <FormSelect
//               label="Currency"
//               id="currency"
//               name="currency"
//               value={formData.currency}
//               onChange={handleInputChange}
//               options={[
//                 { value: "USD", label: "USD" },
//                 { value: "EUR", label: "EUR" },
//                 { value: "GBP", label: "GBP" },
//                 { value: "INR", label: "INR" },
//                 { value: "AUD", label: "AUD" },
//               ]}
//             />
//           </div>
//           <FormSelect
//             label="Availability Status"
//             id="availability_status"
//             name="availability_status"
//             value={formData.availability_status}
//             onChange={handleInputChange}
//             options={AVAILABILITY_STATUSES.map((status) => ({
//               value: status,
//               label: status.charAt(0).toUpperCase() + status.slice(1),
//             }))}
//           />
//           <FormTextarea
//             label="Portfolio Description"
//             id="portfolio_description"
//             name="portfolio_description"
//             placeholder="Describe your work and style..."
//             value={formData.portfolio_description}
//             onChange={handleInputChange}
//             rows={3}
//           />
//           <FormTextarea
//             label="Achievements"
//             id="achievements"
//             name="achievements"
//             placeholder="List your achievements..."
//             value={formData.achievements}
//             onChange={handleInputChange}
//             rows={3}
//           />
//           <FormCheckboxGroup
//             label="Collaboration Preferences"
//             options={COLLABORATION_PREFS}
//             selected={formData.collaboration_preferences}
//             onChange={(pref) => handleArrayToggle("collaboration_preferences", pref)}
//             columns={2}
//           />
//           <FormInput
//             label="Manager Contact"
//             id="manager_contact"
//             name="manager_contact"
//             placeholder="Manager contact"
//             value={formData.manager_contact}
//             onChange={handleInputChange}
//           />
//         </FormSection>

//         <FormSection title="Media Links" description="Add your reels and videos" status={partStatus.media}>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-slate-700 block mb-3">Reels (Up to 6)</label>
//               <div className="space-y-2">
//                 {formData.reels.map((reel, index) => (
//                   <FormInput
//                     key={`reel-${index}`}
//                     label=""
//                     id={`reel-${index}`}
//                     name={`reel-${index}`}
//                     placeholder={`Reel ${index + 1} URL`}
//                     value={reel}
//                     onChange={(e) => handleMediaChange("reels", index, e.target.value)}
//                     error={errors[`reels[${index}]`]}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-slate-700 block mb-3">Videos (Up to 6)</label>
//               <div className="space-y-2">
//                 {formData.videos.map((video, index) => (
//                   <FormInput
//                     key={`video-${index}`}
//                     label=""
//                     id={`video-${index}`}
//                     name={`video-${index}`}
//                     placeholder={`Video ${index + 1} URL`}
//                     value={video}
//                     onChange={(e) => handleMediaChange("videos", index, e.target.value)}
//                     error={errors[`videos[${index}]`]}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </FormSection>

//         {/* Single Submit Button */}
//         <div className="flex justify-center pt-4">
//           <Button
//             onClick={handleSubmitAll}
//             disabled={isSubmitting}
//             size="lg"
//             className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center gap-2">
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Submitting...
//               </span>
//             ) : (
//               "Complete Registration"
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/admin/forms/form-section"
import { FormInput } from "@/components/admin/forms/form-input"
import { FormTextarea } from "@/components/admin/forms/form-textarea"
import { FormSelect } from "@/components/admin/forms/form-select"
import { FormCheckboxGroup } from "@/components/admin/forms/form-checkbox-group"
import { useUser } from "@/hooks/use-user"
import { useProfile } from "@/hooks/use-profile"
import { type AvailabilityStatus, type ExperienceLevel, type TalentType, useTalent } from "@/hooks/use-talent"
import { ImageUpload } from "@/components/user/image-upload"
import { Loader2, CheckCircle2, X } from "lucide-react"

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
  reels: string[]
  videos: string[]
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
  reels: Array(6).fill(""),
  videos: Array(6).fill(""),
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
interface PartStatus {
  [key: string]: "idle" | "loading" | "success" | "error"
}

export default function AddArtistForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [profile_image_urlPreview, setprofile_image_urlPreview] = useState("")
  const [uploadingProfile, setUploadingProfile] = useState(false)
  const [partStatus, setPartStatus] = useState<PartStatus>({
    user: "idle",
    profile: "idle",
    talent: "idle",
    media: "idle",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [specializationInput, setSpecializationInput] = useState("")
  const [languageInput, setLanguageInput] = useState("")
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
      if (errors.specializations) setErrors((prev) => ({ ...prev, specializations: "" }))
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
      if (errors.languages) setErrors((prev) => ({ ...prev, languages: "" }))
    }
  }

  const handleRemoveLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }))
  }

  const handleMediaChange = (type: "reels" | "videos", index: number, value: string) => {
    setFormData((prev) => {
      const newMedia = [...prev[type]]
      newMedia[index] = value
      return { ...prev, [type]: newMedia }
    })
  }

  const validateUserPart = (): boolean => {
    const newErrors: ValidationErrors = {}
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^[\d\s\-+()]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Invalid phone number"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    setErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const validateProfilePart = (): boolean => {
    return true
  }

  const validateTalentPart = (): boolean => {
    const newErrors: ValidationErrors = {}
    if (formData.categories.length === 0) newErrors.categories = "Select at least one category"
    if (formData.specializations.length === 0) newErrors.specializations = "Add at least one specialization"
    setErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const validateMediaPart = (): boolean => {
    const newErrors: ValidationErrors = {}
    formData.reels.forEach((reel, index) => {
      if (reel.trim() && !/^https?:\/\/.+/.test(reel)) newErrors[`reels[${index}]`] = "Invalid URL"
    })
    formData.videos.forEach((video, index) => {
      if (video.trim() && !/^https?:\/\/.+/.test(video)) newErrors[`videos[${index}]`] = "Invalid URL"
    })
    setErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitAll = async () => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitProgress(0)

    try {
      // Step 1: User
      if (!validateUserPart()) {
        setIsSubmitting(false)
        return
      }
      setPartStatus((prev) => ({ ...prev, user: "loading" }))
      setSubmitProgress(25)
      const pay = { email: formData.email, password: formData.password, phone: formData.phone, user_type: "user" }
      const newUser = await create(pay)
      localStorage.setItem("newUser", JSON.stringify(newUser.payload))
      setPartStatus((prev) => ({ ...prev, user: "success" }))

      // Step 2: Profile
      if (!validateProfilePart()) {
        setIsSubmitting(false)
        return
      }
      setPartStatus((prev) => ({ ...prev, profile: "loading" }))
      setSubmitProgress(50)
      const storedUser = JSON.parse(localStorage.getItem("newUser") ?? "{}")
      const profilePay = {
        user_id: storedUser.id,
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
        website_url: "",
        languages: formData.languages,
        highest_education: formData.highest_education,
        cintaId: formData.cintaId,
        whatsapp: formData.whatsapp,
      }
      await createProfile(profilePay)
      setPartStatus((prev) => ({ ...prev, profile: "success" }))

      // Step 3: Talent
      if (!validateTalentPart()) {
        setIsSubmitting(false)
        return
      }
      setPartStatus((prev) => ({ ...prev, talent: "loading" }))
      setSubmitProgress(75)
      const talentPay = {
        user_id: storedUser.id,
        talent_type: formData.talent_type,
        categories: formData.categories,
        specializations: formData.specializations,
        experience_level: formData.experience_level,
        years_of_experience: Number(formData.years_of_experience),
        rate_per_video: formData.rate_per_video,
        rate_per_live: formData.rate_per_video,
        rate_per_post: formData.rate_per_video,
        availability_status: formData.availability_status,
        portfolio_description: formData.portfolio_description,
        achievements: formData.achievements,
        awards: formData.awards,
        certifications: formData.certifications,
        collaboration_preferences: formData.collaboration_preferences,
        verify_badge: false,
      }
      await createTalent(talentPay)
      setPartStatus((prev) => ({ ...prev, talent: "success" }))

      // Step 4: Media
      if (!validateMediaPart()) {
        setIsSubmitting(false)
        return
      }
      setPartStatus((prev) => ({ ...prev, media: "loading" }))
      setSubmitProgress(90)
      const mediaData = {
        reels: formData.reels.filter((r) => r.trim()),
        videos: formData.videos.filter((v) => v.trim()),
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPartStatus((prev) => ({ ...prev, media: "success" }))
      setSubmitProgress(100)

      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error during submission:", error)
      setPartStatus((prev) => ({ ...prev, [Object.keys(prev).find((k) => prev[k] === "loading") || "user"]: "error" }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setprofile_image_urlPreview(url)
    setFormData((prev) => ({
      ...prev,
      profile_image_url: url,
    }))
  }

  const handleImageRemove = () => {
    setprofile_image_urlPreview("")
    setFormData((prev) => ({
      ...prev,
      profile_image_url: "",
    }))
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900">Registration Complete!</h1>
          <p className="text-slate-600">Your artist profile has been successfully created.</p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Create Another Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Create Artist Profile</h1>
          <p className="text-slate-600">Complete all sections to register your artist account</p>
        </div>

        {/* Form Sections */}
        <FormSection title="Account Details" description="Create your login credentials" status={partStatus.user}>
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
        </FormSection>

        <FormSection title="Profile Information" description="Tell us about yourself" status={partStatus.profile}>
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
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
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
              label="CINTA ID"
              id="cintaId"
              name="cintaId"
              placeholder="CINTA ID"
              value={formData.cintaId}
              onChange={handleInputChange}
            />
            <FormInput
              label="WhatsApp"
              id="whatsapp"
              name="whatsapp"
              placeholder="+1 (555) 000-0000"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
          </div>
          <ImageUpload
            label="Profile Picture"
            preview={profile_image_urlPreview}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            loading={uploadingProfile}
          />
        </FormSection>

        <FormSection
          title="Talent Profile"
          description="Showcase your skills and experience"
          status={partStatus.talent}
        >
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
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleAddSpecialization} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec) => (
                <div
                  key={spec}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {spec}
                  <button
                    onClick={() => handleRemoveSpecialization(spec)}
                    className="hover:text-purple-600 transition-colors"
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
            label="Portfolio Description"
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
          <FormCheckboxGroup
            label="Collaboration Preferences"
            options={COLLABORATION_PREFS}
            selected={formData.collaboration_preferences}
            onChange={(pref) => handleArrayToggle("collaboration_preferences", pref)}
            columns={2}
          />
          <FormInput
            label="Manager Contact"
            id="manager_contact"
            name="manager_contact"
            placeholder="Manager contact"
            value={formData.manager_contact}
            onChange={handleInputChange}
          />
        </FormSection>

        <FormSection title="Media Links" description="Add your reels and videos" status={partStatus.media}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-3">Reels (Up to 6)</label>
              <div className="space-y-2">
                {formData.reels.map((reel, index) => (
                  <FormInput
                    key={`reel-${index}`}
                    label=""
                    id={`reel-${index}`}
                    name={`reel-${index}`}
                    placeholder={`Reel ${index + 1} URL`}
                    value={reel}
                    onChange={(e) => handleMediaChange("reels", index, e.target.value)}
                    error={errors[`reels[${index}]`]}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-3">Videos (Up to 6)</label>
              <div className="space-y-2">
                {formData.videos.map((video, index) => (
                  <FormInput
                    key={`video-${index}`}
                    label=""
                    id={`video-${index}`}
                    name={`video-${index}`}
                    placeholder={`Video ${index + 1} URL`}
                    value={video}
                    onChange={(e) => handleMediaChange("videos", index, e.target.value)}
                    error={errors[`videos[${index}]`]}
                  />
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {isSubmitting && (
          <div className="bg-white rounded-lg shadow p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Submitting your profile...</h3>
              <span className="text-sm text-slate-600">{submitProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${submitProgress}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div
                className={`text-center py-2 rounded ${partStatus.user === "success" ? "bg-green-100 text-green-700" : partStatus.user === "loading" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
              >
                Account
              </div>
              <div
                className={`text-center py-2 rounded ${partStatus.profile === "success" ? "bg-green-100 text-green-700" : partStatus.profile === "loading" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
              >
                Profile
              </div>
              <div
                className={`text-center py-2 rounded ${partStatus.talent === "success" ? "bg-green-100 text-green-700" : partStatus.talent === "loading" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
              >
                Talent
              </div>
              <div
                className={`text-center py-2 rounded ${partStatus.media === "success" ? "bg-green-100 text-green-700" : partStatus.media === "loading" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
              >
                Media
              </div>
            </div>
          </div>
        )}

        {/* Single Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSubmitAll}
            disabled={isSubmitting}
            size="lg"
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
