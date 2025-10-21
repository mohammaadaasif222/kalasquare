"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileFormData {
  // Personal Info
  firstName: string
  lastName: string
  displayName: string
  gender: string
  dob: string
  bio: string
  profileImageUrl: string
  bannerImageUrl: string

  // Location & Contact
  locationCity: string
  locationState: string
  locationCountry: string
  websiteUrl: string
  languages: string
  timeZone: string

  // Professional
  talentType: string
  categories: string[]
  specializations: string[]
  experienceLevel: string
  yearsOfExperience: string

  // Rates & Availability
  ratePerHour: string
  ratePerProject: string
  ratePerPost: string
  currency: string
  availabilityStatus: string
  portfolioDescription: string
  achievements: string
  awards: string
  certifications: string
  equipmentOwned: string
  collaborationPreferences: string
}

export default function ProfileUpdateForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [newCategory, setNewCategory] = useState("")
  const [newSpecialization, setNewSpecialization] = useState("")
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "John",
    lastName: "Doe",
    displayName: "John Doe",
    gender: "male",
    dob: "1990-01-15",
    bio: "Creative professional with 5+ years of experience",
    profileImageUrl: "",
    bannerImageUrl: "",
    locationCity: "New York",
    locationState: "NY",
    locationCountry: "USA",
    websiteUrl: "https://johndoe.com",
    languages: "English, Spanish",
    timeZone: "EST",
    talentType: "Designer",
    categories: ["UI/UX Design", "Web Design"],
    specializations: ["Mobile Apps", "Responsive Design", "Prototyping"],
    experienceLevel: "Senior",
    yearsOfExperience: "5",
    ratePerHour: "75",
    ratePerProject: "2500",
    ratePerPost: "500",
    currency: "USD",
    availabilityStatus: "Available",
    portfolioDescription: "Specialized in creating beautiful and functional digital experiences",
    achievements: "Award-winning designer with multiple industry recognitions",
    awards: "Best UI Design 2023, Innovation Award 2022",
    certifications: "Adobe Certified, UX Design Certification",
    equipmentOwned: "MacBook Pro, iPad Pro, Wacom Tablet",
    collaborationPreferences: "Open to long-term projects and collaborations",
  })

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
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
    if (newSpecialization.trim() && !formData.specializations.includes(newSpecialization.trim())) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()],
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Profile updated:", formData)
    // Here you would typically send the data to your backend
  }

  const progressPercentage = (currentStep / 4) * 100

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
          <CardDescription>Complete all sections to enhance your profile</CardDescription>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of 4</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-6 gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step < currentStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange("displayName", e.target.value)}
                      placeholder="How you want to be displayed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Profile Images */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Profile Images</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profileImage">Profile Picture</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition">
                      <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <Input id="profileImage" type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bannerImage">Banner Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition">
                      <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <Input id="bannerImage" type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Location & Contact</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.locationCity}
                        onChange={(e) => handleInputChange("locationCity", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={formData.locationState}
                        onChange={(e) => handleInputChange("locationState", e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.locationCountry}
                        onChange={(e) => handleInputChange("locationCountry", e.target.value)}
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="languages">Languages</Label>
                      <Input
                        id="languages"
                        value={formData.languages}
                        onChange={(e) => handleInputChange("languages", e.target.value)}
                        placeholder="e.g., English, Spanish, French"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select value={formData.timeZone} onValueChange={(value) => handleInputChange("timeZone", value)}>
                        <SelectTrigger id="timezone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PST">PST (UTC-8)</SelectItem>
                          <SelectItem value="MST">MST (UTC-7)</SelectItem>
                          <SelectItem value="CST">CST (UTC-6)</SelectItem>
                          <SelectItem value="EST">EST (UTC-5)</SelectItem>
                          <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                          <SelectItem value="CET">CET (UTC+1)</SelectItem>
                          <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                          <SelectItem value="SGT">SGT (UTC+8)</SelectItem>
                          <SelectItem value="AEST">AEST (UTC+10)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="talentType">Talent Type</Label>
                      <Select
                        value={formData.talentType}
                        onValueChange={(value) => handleInputChange("talentType", value)}
                      >
                        <SelectTrigger id="talentType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Designer">Designer</SelectItem>
                          <SelectItem value="Developer">Developer</SelectItem>
                          <SelectItem value="Photographer">Photographer</SelectItem>
                          <SelectItem value="Videographer">Videographer</SelectItem>
                          <SelectItem value="Writer">Writer</SelectItem>
                          <SelectItem value="Marketer">Marketer</SelectItem>
                          <SelectItem value="Influencer">Influencer</SelectItem>
                          <SelectItem value="Content Creator">Content Creator</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select
                        value={formData.experienceLevel}
                        onValueChange={(value) => handleInputChange("experienceLevel", value)}
                      >
                        <SelectTrigger id="experienceLevel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="categories">Categories</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          id="categories"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                          placeholder="e.g., Influencer, Content Creator"
                        />
                        <Button type="button" onClick={addCategory} size="icon" variant="outline">
                          <Plus size={18} />
                        </Button>
                      </div>
                      {formData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.categories.map((category, index) => (
                            <div
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/20 transition-colors"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => removeCategory(index)}
                                className="hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specializations">Specializations</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          id="specializations"
                          value={newSpecialization}
                          onChange={(e) => setNewSpecialization(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
                          placeholder="e.g., Fashion, Travel, Lifestyle"
                        />
                        <Button type="button" onClick={addSpecialization} size="icon" variant="outline">
                          <Plus size={18} />
                        </Button>
                      </div>
                      {formData.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.specializations.map((specialization, index) => (
                            <div
                              key={index}
                              className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary/80 transition-colors"
                            >
                              {specialization}
                              <button
                                type="button"
                                onClick={() => removeSpecialization(index)}
                                className="hover:bg-muted rounded-full p-0.5 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Rates & Availability */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Rates & Availability</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ratePerHour">Rate Per Hour</Label>
                      <Input
                        id="ratePerHour"
                        type="number"
                        value={formData.ratePerHour}
                        onChange={(e) => handleInputChange("ratePerHour", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ratePerProject">Rate Per Project</Label>
                      <Input
                        id="ratePerProject"
                        type="number"
                        value={formData.ratePerProject}
                        onChange={(e) => handleInputChange("ratePerProject", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ratePerPost">Rate Per Post</Label>
                      <Input
                        id="ratePerPost"
                        type="number"
                        value={formData.ratePerPost}
                        onChange={(e) => handleInputChange("ratePerPost", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="AUD">AUD (A$)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability Status</Label>
                    <Select
                      value={formData.availabilityStatus}
                      onValueChange={(value) => handleInputChange("availabilityStatus", value)}
                    >
                      <SelectTrigger id="availability">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Partially Available">Partially Available</SelectItem>
                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="portfolioDescription">Portfolio Description</Label>
                    <Textarea
                      id="portfolioDescription"
                      value={formData.portfolioDescription}
                      onChange={(e) => handleInputChange("portfolioDescription", e.target.value)}
                      placeholder="Describe your portfolio and work style"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="achievements">Achievements</Label>
                    <Textarea
                      id="achievements"
                      value={formData.achievements}
                      onChange={(e) => handleInputChange("achievements", e.target.value)}
                      placeholder="List your key achievements"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="awards">Awards</Label>
                      <Input
                        id="awards"
                        value={formData.awards}
                        onChange={(e) => handleInputChange("awards", e.target.value)}
                        placeholder="e.g., Best Design 2023"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certifications">Certifications</Label>
                      <Input
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) => handleInputChange("certifications", e.target.value)}
                        placeholder="e.g., Adobe Certified"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="equipment">Equipment Owned</Label>
                    <Input
                      id="equipment"
                      value={formData.equipmentOwned}
                      onChange={(e) => handleInputChange("equipmentOwned", e.target.value)}
                      placeholder="e.g., MacBook Pro, iPad Pro"
                    />
                  </div>

                  <div>
                    <Label htmlFor="collaboration">Collaboration Preferences</Label>
                    <Textarea
                      id="collaboration"
                      value={formData.collaborationPreferences}
                      onChange={(e) => handleInputChange("collaborationPreferences", e.target.value)}
                      placeholder="Describe your collaboration preferences"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft size={18} />
              Previous
            </Button>

            {currentStep === 4 ? (
              <Button onClick={handleSubmit} className="gap-2">
                Complete Profile
              </Button>
            ) : (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}