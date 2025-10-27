// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { ChevronRight, ChevronLeft, Upload, X, Plus, ImageIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useProfileApi } from "@/hooks/use-profile-api"
// import { SuccessModal } from "@/components/models/success-modal"
// import { ErrorModal } from "@/components/models/error-modal"
// import { useCloudinaryUpload } from "@/hooks/use-cloudnary-upload"
// import { useProfile } from "@/hooks/use-profile"

// export interface ProfileFormData {
//   // Personal Info
//   first_name: string
//   last_name: string
//   display_name: string
//   gender: string
//   dob: string
//   bio: string
//   profile_image_url: string
//   banner_image_url: string
//   education: string
//   cinta_id: string
//   whatsapp_number: string

//   // Location & Contact
//   location_city: string
//   location_state: string
//   location_country: string
//   website_url: string
//   languages: string

//   // Professional
//   talent_type: string
//   categories: string[]
//   specializations: string[]
//   experience_level: string
//   years_of_experience: string
//   manager_id: string

//   // Rates & Availability
//   rate_per_hour: string
//   rate_per_project: string
//   rate_per_post: string
//   currency: string
//   availability_status: string
//   portfolio_description: string
//   achievements: string
//   awards: Array<{ url: string; name: string }>
//   certifications: Array<{ url: string; name: string }>
//   collaboration_preferences: string
// }

// export default function ProfileUpdateForm() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [newCategory, setNewCategory] = useState("")
//   const [newSpecialization, setNewSpecialization] = useState("")
//   const [profileImagePreview, setProfileImagePreview] = useState<string>("")
//   const [bannerImagePreview, setBannerImagePreview] = useState<string>("")
//   const [uploadingProfile, setUploadingProfile] = useState(false)
//   const [uploadingBanner, setUploadingBanner] = useState(false)
//   const [uploadingAward, setUploadingAward] = useState(false)
//   const [uploadingCert, setUploadingCert] = useState(false)
//   const [newAwardName, setNewAwardName] = useState("")
//   const [newCertName, setNewCertName] = useState("")

//   const profileInputRef = useRef<HTMLInputElement>(null)
//   const bannerInputRef = useRef<HTMLInputElement>(null)
//   const awardInputRef = useRef<HTMLInputElement>(null)
//   const certInputRef = useRef<HTMLInputElement>(null)

//   const { profile, loading: profileLoading } = useProfile()

//   const [formData, setFormData] = useState<ProfileFormData>({
//     first_name: "",
//     last_name: "",
//     display_name: "",
//     gender: "",
//     dob: "",
//     bio: "",
//     profile_image_url: "",
//     banner_image_url: "",
//     education: "",
//     cinta_id: "",
//     whatsapp_number: "",
//     location_city: "",
//     location_state: "",
//     location_country: "",
//     website_url: "",
//     languages: "",
//     talent_type: "Designer",
//     categories: [],
//     specializations: [],
//     experience_level: "Intermediate",
//     years_of_experience: "0",
//     manager_id: "",
//     rate_per_hour: "",
//     rate_per_project: "",
//     rate_per_post: "",
//     currency: "USD",
//     availability_status: "Available",
//     portfolio_description: "",
//     achievements: "",
//     awards: [],
//     certifications: [],
//     collaboration_preferences: "",
//   })

//   useEffect(() => {
//     if (profile) {
//       setFormData((prev) => ({
//         ...prev,
//         first_name: profile.first_name || "",
//         last_name: profile.last_name || "",
//         display_name: profile.display_name || "",
//         gender: profile.gender || "",
//         dob: profile.dob || "",
//         bio: profile.bio || "",
//         profile_image_url: profile.profile_image_url || "",
//         banner_image_url: profile.banner_image_url || "",
//         location_city: profile.location_city || "",
//         location_state: profile.location_state || "",
//         location_country: profile.location_country || "",
//         website_url: profile.website_url || "",
//         languages: profile.languages || "",
//       }))
//       if (profile.profile_image_url) {
//         setProfileImagePreview(profile.profile_image_url)
//       }
//       if (profile.banner_image_url) {
//         setBannerImagePreview(profile.banner_image_url)
//       }
//     }
//   }, [profile])

//   const { loading, error, success, submitProfile, resetState } = useProfileApi()
//   const { uploadImage, loading: cloudinaryLoading, error: cloudinaryError } = useCloudinaryUpload()

//   const handleInputChange = (field: keyof ProfileFormData, value: string | string[]) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isProfile: boolean) => {
//     const file = e.target.files?.[0]
//     if (file && file.type.startsWith("image/")) {
//       const isProfileImage = isProfile
//       isProfileImage ? setUploadingProfile(true) : setUploadingBanner(true)

//       try {
//         const reader = new FileReader()
//         reader.onload = (event) => {
//           const result = event.target?.result as string
//           if (isProfileImage) {
//             setProfileImagePreview(result)
//           } else {
//             setBannerImagePreview(result)
//           }
//         }
//         reader.readAsDataURL(file)

//         const downloadURL = await uploadImage(file)

//         if (downloadURL) {
//           setFormData((prev) => ({
//             ...prev,
//             [isProfileImage ? "profile_image_url" : "banner_image_url"]: downloadURL,
//           }))
//         }
//       } finally {
//         isProfileImage ? setUploadingProfile(false) : setUploadingBanner(false)
//       }
//     }
//   }

//   const handleCertificationUpload = async (e: React.ChangeEvent<HTMLInputElement>, isAward: boolean) => {
//     const file = e.target.files?.[0]
//     if (file && file.type.startsWith("image/")) {
//       isAward ? setUploadingAward(true) : setUploadingCert(true)

//       try {
//         const downloadURL = await uploadImage(file)

//         if (downloadURL) {
//           if (isAward) {
//             setFormData((prev) => ({
//               ...prev,
//               awards: [...prev.awards, { url: downloadURL, name: newAwardName || "Award" }],
//             }))
//             setNewAwardName("")
//           } else {
//             setFormData((prev) => ({
//               ...prev,
//               certifications: [...prev.certifications, { url: downloadURL, name: newCertName || "Certification" }],
//             }))
//             setNewCertName("")
//           }
//         }
//       } finally {
//         isAward ? setUploadingAward(false) : setUploadingCert(false)
//         if (isAward && awardInputRef.current) awardInputRef.current.value = ""
//         if (!isAward && certInputRef.current) certInputRef.current.value = ""
//       }
//     }
//   }

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     e.stopPropagation()
//   }

//   const handleDrop = async (e: React.DragEvent<HTMLDivElement>, isProfile: boolean) => {
//     e.preventDefault()
//     e.stopPropagation()
//     const file = e.dataTransfer.files?.[0]
//     if (file && file.type.startsWith("image/")) {
//       const isProfileImage = isProfile
//       isProfileImage ? setUploadingProfile(true) : setUploadingBanner(true)

//       try {
//         const reader = new FileReader()
//         reader.onload = (event) => {
//           const result = event.target?.result as string
//           if (isProfileImage) {
//             setProfileImagePreview(result)
//           } else {
//             setBannerImagePreview(result)
//           }
//         }
//         reader.readAsDataURL(file)

//         const downloadURL = await uploadImage(file)

//         if (downloadURL) {
//           setFormData((prev) => ({
//             ...prev,
//             [isProfileImage ? "profile_image_url" : "banner_image_url"]: downloadURL,
//           }))
//         }
//       } finally {
//         isProfileImage ? setUploadingProfile(false) : setUploadingBanner(false)
//       }
//     }
//   }

//   const removeImage = (isProfile: boolean) => {
//     if (isProfile) {
//       setProfileImagePreview("")
//       setFormData((prev) => ({
//         ...prev,
//         profile_image_url: "",
//       }))
//       if (profileInputRef.current) profileInputRef.current.value = ""
//     } else {
//       setBannerImagePreview("")
//       setFormData((prev) => ({
//         ...prev,
//         banner_image_url: "",
//       }))
//       if (bannerInputRef.current) bannerInputRef.current.value = ""
//     }
//   }

//   const removeAward = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       awards: prev.awards.filter((_, i) => i !== index),
//     }))
//   }

//   const removeCertification = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       certifications: prev.certifications.filter((_, i) => i !== index),
//     }))
//   }

//   const addCategory = () => {
//     if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         categories: [...prev.categories, newCategory.trim()],
//       }))
//       setNewCategory("")
//     }
//   }

//   const removeCategory = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       categories: prev.categories.filter((_, i) => i !== index),
//     }))
//   }

//   const addSpecialization = () => {
//     if (newSpecialization.trim() && !formData.specializations.includes(newSpecialization.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         specializations: [...prev.specializations, newSpecialization.trim()],
//       }))
//       setNewSpecialization("")
//     }
//   }

//   const removeSpecialization = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       specializations: prev.specializations.filter((_, i) => i !== index),
//     }))
//   }

//   const handleNext = async () => {
//     if (currentStep < 2) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const handlePrev = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async () => {
//     await submitProfile(formData)
//   }

//   const handleSuccessClose = () => {
//     resetState()
//     setCurrentStep(1)
//   }

//   const handleErrorClose = () => {
//     resetState()
//   }

//   const progressPercentage = (currentStep / 2) * 100

//   if (profileLoading) {
//     return (
//       <div className="w-full max-w-4xl mx-auto p-4 md:p-6 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading profile...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-gradient-to-br from-background to-muted/30 min-h-screen">
//       <SuccessModal
//         isOpen={success}
//         onClose={handleSuccessClose}
//         title="Profile Updated Successfully!"
//         message="Your profile has been updated with all the information."
//       />

//       <ErrorModal
//         isOpen={!!error || !!cloudinaryError}
//         onClose={handleErrorClose}
//         title="Update Failed"
//         message={error || cloudinaryError || "Something went wrong while updating your profile. Please try again."}
//       />

//       <Card className="shadow-lg border-0">
//         <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//           <CardTitle className="text-2xl">Update Your Profile</CardTitle>
//           <CardDescription>Complete all sections to enhance your profile</CardDescription>

//           {/* Progress Bar */}
//           <div className="mt-6">
//             <div className="flex justify-between mb-2">
//               <span className="text-sm font-medium">Step {currentStep} of 2</span>
//               <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
//             </div>
//             <div className="w-full bg-muted rounded-full h-2.5">
//               <div
//                 className="bg-gradient-to-r from-primary to-primary/70 h-2.5 rounded-full transition-all duration-300"
//                 style={{ width: `${progressPercentage}%` }}
//               />
//             </div>
//           </div>

//           {/* Step Indicators */}
//           <div className="flex justify-between mt-6 gap-2">
//             {[1, 2].map((step) => (
//               <div
//                 key={step}
//                 className={`flex-1 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
//                   step === currentStep
//                     ? "bg-primary text-primary-foreground shadow-md"
//                     : step < currentStep
//                       ? "bg-primary/20 text-primary"
//                       : "bg-muted text-muted-foreground"
//                 }`}
//               >
//                 {step === 1 ? "Personal" : "Professional"}
//               </div>
//             ))}
//           </div>
//         </CardHeader>

//         <CardContent className="pt-8">
//           {/* Step 1: Personal Information */}
//           {currentStep === 1 && (
//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="first_name">First Name</Label>
//                       <Input
//                         id="first_name"
//                         value={formData.first_name}
//                         onChange={(e) => handleInputChange("first_name", e.target.value)}
//                         placeholder="Enter first name"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="last_name">Last Name</Label>
//                       <Input
//                         id="last_name"
//                         value={formData.last_name}
//                         onChange={(e) => handleInputChange("last_name", e.target.value)}
//                         placeholder="Enter last name"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="display_name">Display Name</Label>
//                     <Input
//                       id="display_name"
//                       value={formData.display_name}
//                       onChange={(e) => handleInputChange("display_name", e.target.value)}
//                       placeholder="How you want to be displayed"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="gender">Gender</Label>
//                       <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
//                         <SelectTrigger id="gender">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                           <SelectItem value="prefer-not">Prefer not to say</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label htmlFor="dob">Date of Birth</Label>
//                       <Input
//                         id="dob"
//                         type="date"
//                         value={formData.dob}
//                         onChange={(e) => handleInputChange("dob", e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="bio">Bio</Label>
//                     <Textarea
//                       id="bio"
//                       value={formData.bio}
//                       onChange={(e) => handleInputChange("bio", e.target.value)}
//                       placeholder="Tell us about yourself"
//                       rows={4}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="education">Education</Label>
//                     <Textarea
//                       id="education"
//                       value={formData.education}
//                       onChange={(e) => handleInputChange("education", e.target.value)}
//                       placeholder="e.g., Bachelor's in Computer Science from XYZ University"
//                       rows={2}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="cinta_id">CINTA ID</Label>
//                       <Input
//                         id="cinta_id"
//                         value={formData.cinta_id}
//                         onChange={(e) => handleInputChange("cinta_id", e.target.value)}
//                         placeholder="Enter your CINTA ID"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
//                       <Input
//                         id="whatsapp_number"
//                         value={formData.whatsapp_number}
//                         onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
//                         placeholder="Enter your WhatsApp number"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="city">City</Label>
//                       <Input
//                         id="city"
//                         value={formData.location_city}
//                         onChange={(e) => handleInputChange("location_city", e.target.value)}
//                         placeholder="City"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="state">State/Province</Label>
//                       <Input
//                         id="state"
//                         value={formData.location_state}
//                         onChange={(e) => handleInputChange("location_state", e.target.value)}
//                         placeholder="State"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="country">Country</Label>
//                       <Input
//                         id="country"
//                         value={formData.location_country}
//                         onChange={(e) => handleInputChange("location_country", e.target.value)}
//                         placeholder="Country"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="website">Website URL</Label>
//                     <Input
//                       id="website"
//                       type="url"
//                       value={formData.website_url}
//                       onChange={(e) => handleInputChange("website_url", e.target.value)}
//                       placeholder="https://yourwebsite.com"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="languages">Languages</Label>
//                     <Input
//                       id="languages"
//                       value={formData.languages}
//                       onChange={(e) => handleInputChange("languages", e.target.value)}
//                       placeholder="e.g., English, Spanish, French"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Images */}
//               <div className="border-t pt-8">
//                 <h3 className="text-lg font-semibold mb-6">Profile Images</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Profile Picture */}
//                   <div>
//                     <Label htmlFor="profileImage" className="mb-3 block">
//                       Profile Picture
//                     </Label>
//                     {profileImagePreview ? (
//                       <div className="relative group">
//                         <img
//                           src={profileImagePreview || "/placeholder.svg"}
//                           alt="Profile preview"
//                           className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(true)}
//                           className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={18} />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => profileInputRef.current?.click()}
//                           className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                         >
//                           <Upload className="text-white" size={24} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => profileInputRef.current?.click()}
//                         onDragOver={handleDragOver}
//                         onDrop={(e) => handleDrop(e, true)}
//                         className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
//                       >
//                         <div className="flex flex-col items-center gap-2">
//                           <div className="bg-primary/10 p-3 rounded-full">
//                             <ImageIcon className="text-primary" size={24} />
//                           </div>
//                           <p className="text-sm font-medium">Click to upload or drag and drop</p>
//                           <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
//                         </div>
//                       </div>
//                     )}
//                     <input
//                       ref={profileInputRef}
//                       id="profileImage"
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, true)}
//                     />
//                   </div>

//                   {/* Banner Image */}
//                   <div>
//                     <Label htmlFor="bannerImage" className="mb-3 block">
//                       Banner Image
//                     </Label>
//                     {bannerImagePreview ? (
//                       <div className="relative group">
//                         <img
//                           src={bannerImagePreview || "/placeholder.svg"}
//                           alt="Banner preview"
//                           className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(false)}
//                           className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={18} />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => bannerInputRef.current?.click()}
//                           className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                         >
//                           <Upload className="text-white" size={24} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => bannerInputRef.current?.click()}
//                         onDragOver={handleDragOver}
//                         onDrop={(e) => handleDrop(e, false)}
//                         className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
//                       >
//                         <div className="flex flex-col items-center gap-2">
//                           <div className="bg-primary/10 p-3 rounded-full">
//                             <ImageIcon className="text-primary" size={24} />
//                           </div>
//                           <p className="text-sm font-medium">Click to upload or drag and drop</p>
//                           <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
//                         </div>
//                       </div>
//                     )}
//                     <input
//                       ref={bannerInputRef}
//                       id="bannerImage"
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, false)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Professional Information */}
//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="talentType">Talent Type</Label>
//                       <Select
//                         value={formData.talent_type}
//                         onValueChange={(value) => handleInputChange("talent_type", value)}
//                       >
//                         <SelectTrigger id="talentType">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Designer">Designer</SelectItem>
//                           <SelectItem value="Developer">Developer</SelectItem>
//                           <SelectItem value="Photographer">Photographer</SelectItem>
//                           <SelectItem value="Videographer">Videographer</SelectItem>
//                           <SelectItem value="Writer">Writer</SelectItem>
//                           <SelectItem value="Marketer">Marketer</SelectItem>
//                           <SelectItem value="Influencer">Influencer</SelectItem>
//                           <SelectItem value="Content Creator">Content Creator</SelectItem>
//                           <SelectItem value="Other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label htmlFor="experienceLevel">Experience Level</Label>
//                       <Select
//                         value={formData.experience_level}
//                         onValueChange={(value) => handleInputChange("experience_level", value)}
//                       >
//                         <SelectTrigger id="experienceLevel">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Beginner">Beginner</SelectItem>
//                           <SelectItem value="Intermediate">Intermediate</SelectItem>
//                           <SelectItem value="Advanced">Advanced</SelectItem>
//                           <SelectItem value="Expert">Expert</SelectItem>
//                           <SelectItem value="Senior">Senior</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="categories">Categories</Label>
//                     <div className="space-y-3">
//                       <div className="flex gap-2">
//                         <Input
//                           id="categories"
//                           value={newCategory}
//                           onChange={(e) => setNewCategory(e.target.value)}
//                           onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
//                           placeholder="e.g., Influencer, Content Creator"
//                         />
//                         <Button type="button" onClick={addCategory} size="icon" variant="outline">
//                           <Plus size={18} />
//                         </Button>
//                       </div>
//                       {formData.categories.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {formData.categories.map((category, index) => (
//                             <div
//                               key={index}
//                               className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/20 transition-colors"
//                             >
//                               {category}
//                               <button
//                                 type="button"
//                                 onClick={() => removeCategory(index)}
//                                 className="hover:bg-primary/30 rounded-full p-0.5 transition-colors"
//                               >
//                                 <X size={14} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="specializations">Specializations</Label>
//                     <div className="space-y-3">
//                       <div className="flex gap-2">
//                         <Input
//                           id="specializations"
//                           value={newSpecialization}
//                           onChange={(e) => setNewSpecialization(e.target.value)}
//                           onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
//                           placeholder="e.g., Fashion, Travel, Lifestyle"
//                         />
//                         <Button type="button" onClick={addSpecialization} size="icon" variant="outline">
//                           <Plus size={18} />
//                         </Button>
//                       </div>
//                       {formData.specializations.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {formData.specializations.map((specialization, index) => (
//                             <div
//                               key={index}
//                               className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary/80 transition-colors"
//                             >
//                               {specialization}
//                               <button
//                                 type="button"
//                                 onClick={() => removeSpecialization(index)}
//                                 className="hover:bg-muted rounded-full p-0.5 transition-colors"
//                               >
//                                 <X size={14} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="yearsOfExperience">Years of Experience</Label>
//                       <Input
//                         id="yearsOfExperience"
//                         type="number"
//                         value={formData.years_of_experience}
//                         onChange={(e) => handleInputChange("years_of_experience", e.target.value)}
//                         placeholder="e.g., 5"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="manager_id">Manager ID</Label>
//                       <Input
//                         id="manager_id"
//                         value={formData.manager_id}
//                         onChange={(e) => handleInputChange("manager_id", e.target.value)}
//                         placeholder="Enter manager ID"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="ratePerHour">Rate Per Hour</Label>
//                       <Input
//                         id="ratePerHour"
//                         type="number"
//                         value={formData.rate_per_hour}
//                         onChange={(e) => handleInputChange("rate_per_hour", e.target.value)}
//                         placeholder="0"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="ratePerProject">Rate Per Project</Label>
//                       <Input
//                         id="ratePerProject"
//                         type="number"
//                         value={formData.rate_per_project}
//                         onChange={(e) => handleInputChange("rate_per_project", e.target.value)}
//                         placeholder="0"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="ratePerPost">Rate Per Post</Label>
//                       <Input
//                         id="ratePerPost"
//                         type="number"
//                         value={formData.rate_per_post}
//                         onChange={(e) => handleInputChange("rate_per_post", e.target.value)}
//                         placeholder="0"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="currency">Currency</Label>
//                       <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
//                         <SelectTrigger id="currency">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="USD">USD ($)</SelectItem>
//                           <SelectItem value="EUR">EUR (€)</SelectItem>
//                           <SelectItem value="GBP">GBP (£)</SelectItem>
//                           <SelectItem value="INR">INR (₹)</SelectItem>
//                           <SelectItem value="AUD">AUD (A$)</SelectItem>
//                           <SelectItem value="CAD">CAD (C$)</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="availability">Availability Status</Label>
//                     <Select
//                       value={formData.availability_status}
//                       onValueChange={(value) => handleInputChange("availability_status", value)}
//                     >
//                       <SelectTrigger id="availability">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Available">Available</SelectItem>
//                         <SelectItem value="Partially Available">Partially Available</SelectItem>
//                         <SelectItem value="Unavailable">Unavailable</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label htmlFor="portfolioDescription">Portfolio Description</Label>
//                     <Textarea
//                       id="portfolioDescription"
//                       value={formData.portfolio_description}
//                       onChange={(e) => handleInputChange("portfolio_description", e.target.value)}
//                       placeholder="Describe your portfolio and work style"
//                       rows={3}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="achievements">Achievements</Label>
//                     <Textarea
//                       id="achievements"
//                       value={formData.achievements}
//                       onChange={(e) => handleInputChange("achievements", e.target.value)}
//                       placeholder="List your key achievements"
//                       rows={2}
//                     />
//                   </div>

//                   <div className="border-t pt-6">
//                     <h4 className="font-semibold mb-4">Awards</h4>
//                     <div className="space-y-3">
//                       <div className="flex gap-2">
//                         <Input
//                           value={newAwardName}
//                           onChange={(e) => setNewAwardName(e.target.value)}
//                           placeholder="Award name"
//                         />
//                         <Button
//                           type="button"
//                           onClick={() => awardInputRef.current?.click()}
//                           size="icon"
//                           variant="outline"
//                           disabled={uploadingAward}
//                         >
//                           {uploadingAward ? (
//                             <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//                           ) : (
//                             <Upload size={18} />
//                           )}
//                         </Button>
//                       </div>
//                       <input
//                         ref={awardInputRef}
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={(e) => handleCertificationUpload(e, true)}
//                       />
//                       {formData.awards.length > 0 && (
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                           {formData.awards.map((award, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={award.url || "/placeholder.svg"}
//                                 alt={award.name}
//                                 className="w-full h-24 object-cover rounded-lg border border-border"
//                               />
//                               <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                 <button
//                                   type="button"
//                                   onClick={() => removeAward(index)}
//                                   className="bg-destructive text-destructive-foreground p-2 rounded-full"
//                                 >
//                                   <X size={16} />
//                                 </button>
//                               </div>
//                               <p className="text-xs mt-1 truncate">{award.name}</p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="border-t pt-6">
//                     <h4 className="font-semibold mb-4">Certifications</h4>
//                     <div className="space-y-3">
//                       <div className="flex gap-2">
//                         <Input
//                           value={newCertName}
//                           onChange={(e) => setNewCertName(e.target.value)}
//                           placeholder="Certification name"
//                         />
//                         <Button
//                           type="button"
//                           onClick={() => certInputRef.current?.click()}
//                           size="icon"
//                           variant="outline"
//                           disabled={uploadingCert}
//                         >
//                           {uploadingCert ? (
//                             <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//                           ) : (
//                             <Upload size={18} />
//                           )}
//                         </Button>
//                       </div>
//                       <input
//                         ref={certInputRef}
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={(e) => handleCertificationUpload(e, false)}
//                       />
//                       {formData.certifications.length > 0 && (
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                           {formData.certifications.map((cert, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={cert.url || "/placeholder.svg"}
//                                 alt={cert.name}
//                                 className="w-full h-24 object-cover rounded-lg border border-border"
//                               />
//                               <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                 <button
//                                   type="button"
//                                   onClick={() => removeCertification(index)}
//                                   className="bg-destructive text-destructive-foreground p-2 rounded-full"
//                                 >
//                                   <X size={16} />
//                                 </button>
//                               </div>
//                               <p className="text-xs mt-1 truncate">{cert.name}</p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="collaboration">Collaboration Preferences</Label>
//                     <Textarea
//                       id="collaboration"
//                       value={formData.collaboration_preferences}
//                       onChange={(e) => handleInputChange("collaboration_preferences", e.target.value)}
//                       placeholder="Describe your collaboration preferences"
//                       rows={2}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border">
//             <Button
//               variant="outline"
//               onClick={handlePrev}
//               disabled={currentStep === 1 || loading}
//               className="gap-2 bg-transparent"
//             >
//               <ChevronLeft size={18} />
//               Previous
//             </Button>

//             {currentStep === 2 ? (
//               <Button onClick={handleSubmit} disabled={loading} className="gap-2">
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   "Complete Profile"
//                 )}
//               </Button>
//             ) : (
//               <Button onClick={handleNext} className="gap-2">
//                 Next
//                 <ChevronRight size={18} />
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import React, { useEffect } from 'react'
import { EditableProfile } from './editable-profile'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { useTalent } from '@/hooks/use-talent'
import { fetchProfile } from '@/lib/redux/features/profile/profileSlice'
import { useProfile } from '@/hooks/use-profile'

export default function ProfileUpdateForm() {
    const { profile, loading: profileLoading, updateProfile, fetchProfile } = useProfile()
    const { talent, updateTalent, fetchTalentByUserId } = useTalent()
    const auth = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (auth?.id) {
            fetchTalentByUserId(auth.id)
            fetchProfile(auth?.id ?? "")
        }
    }, [auth?.id])
    return (
        <div>
            <EditableProfile profile={profile} talent={talent} userId={auth?.id ?? ""} />
        </div>
    )
}
