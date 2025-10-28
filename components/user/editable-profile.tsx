

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Verified, Edit2, X } from "lucide-react"
import type { UserProfile } from "@/types/profile"

import { ProfileBasicForm } from "./profile-basic-form"
import { ProfileTalentForm } from "./profile-talent-form"
import { useProfile } from "@/hooks/use-profile"
import { useTalent } from "@/hooks/use-talent"
import type { UpdateProfileData } from "@/types/profile.types"
import type { TalentProfile } from "@/types/talent.types"
import UpdatePassword from "./upate-password"


interface EditableProfileProps {
  profile: UserProfile | null
  talent: TalentProfile | null
  userId: string
}

export function EditableProfile({ profile, talent, userId }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [editTab, setEditTab] = useState<"basic" | "talent">("basic")
  const { updateProfile, loading: profileLoading, error: profileError } = useProfile()
  const { updateTalent, loading: talentLoading, error: talentError } = useTalent()

  const isLoading = profileLoading || talentLoading

  const handleBasicProfileSubmit = async (data: UpdateProfileData) => {
    try {
      console.log(data)
      await updateProfile(userId, data)
      setIsEditing(false)
      setEditTab("basic")
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleTalentProfileSubmit = async (data: any) => {
    try {
      await updateTalent(userId, data)
      setIsEditing(false)
      setEditTab("talent")
    } catch (error) {
      console.error("Error updating talent profile:", error)
    }
  }

  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Card className="border rounded-lg shadow-sm">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-lg animate-pulse">
                  <span className="text-4xl font-bold text-primary/40">?</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="h-8 bg-muted rounded-lg w-48 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-muted rounded-lg w-32 mb-3 animate-pulse"></div>
                </div>
                <div className="h-4 bg-muted rounded-lg w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded-lg w-3/4 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
                </div>
                <div className="pt-4">
                  <div className="h-10 bg-muted rounded-lg w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const displayName = profile.display_name || `${profile.first_name} ${profile.last_name}` || "Your Name"

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* View Mode */}
        {/* {!isEditing && (
          <Card className="border rounded-lg shadow-sm">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-shrink-0">
                  {profile.profile_image_url ? (
                    <div className="relative">
                      <img
                        src={profile.profile_image_url || "/placeholder.svg"}
                        alt={displayName}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                      />
                      {talent?.verify_badge && (
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                          <Verified className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-lg">
                      <span className="text-4xl font-bold text-primary/40">
                        {profile.first_name?.[0] || "?"}
                        {profile.last_name?.[0] || ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                      {displayName}
                      {talent?.verify_badge && <Verified className="w-6 h-6 text-blue-500" />}
                    </h1>
                    {talent?.talent_type ? (
                      <Badge variant="default" className="text-base px-3 py-1 mb-3">
                        {talent.talent_type.charAt(0).toUpperCase() + talent.talent_type.slice(1)}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-base px-3 py-1 mb-3">
                        Add Talent Type
                      </Badge>
                    )}
                  </div>

                  {profile.bio ? (
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{profile.bio}</p>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed max-w-2xl italic">
                      Add a bio to tell people about yourself...
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {profile.location_city || profile.location_state || profile.location_country ? (
                      <div>
                        <span className="text-muted-foreground">Location: </span>
                        <span className="font-medium">
                          {profile.location_city || "City"}
                          {profile.location_state && `, ${profile.location_state}`}
                          {profile.location_country && `, ${profile.location_country}`}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">Location: </span>
                        <span className="font-medium text-muted-foreground italic">Not specified</span>
                      </div>
                    )}
                    {profile.website_url ? (
                      <div>
                        <span className="text-muted-foreground">Website: </span>
                        <a
                          href={
                            profile.website_url.startsWith("http")
                              ? profile.website_url
                              : `https://${profile.website_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {profile.website_url}
                        </a>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">Website: </span>
                        <span className="font-medium text-muted-foreground italic">Not specified</span>
                      </div>
                    )}
                    {profile.whatsapp ? (
                      <div>
                        <span className="text-muted-foreground">WhatsApp: </span>
                        <span className="font-medium">{profile.whatsapp}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">WhatsApp: </span>
                        <span className="font-medium text-muted-foreground italic">Not specified</span>
                      </div>
                    )}
                    {profile.languages ? (
                      <div>
                        <span className="text-muted-foreground">Languages: </span>
                        <span className="font-medium">{profile.languages}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">Languages: </span>
                        <span className="font-medium text-muted-foreground italic">Not specified</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button onClick={() => setIsEditing(true)} size="lg" className="gap-2">
                      <Edit2 size={18} />
                      Edit Profile
                    </Button>
                    <UpdatePassword userId={userId} />
                  </div>
                </div>
              </div>

              {talent ? (
                <div className="border-t pt-8 space-y-6">
                  <h2 className="text-2xl font-bold">Professional Details</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">Experience Level</p>
                      <p className="font-semibold capitalize">{talent.experience_level || "Not specified"}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">Years</p>
                      <p className="font-semibold">{talent.years_of_experience ?? 0}+</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">Availability</p>
                      <p className="font-semibold capitalize">{talent.availability_status || "Not specified"}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">Currency</p>
                      <p className="font-semibold">{talent.currency || "INR"}</p>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Rates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Video</p>
                        <p className="text-xl font-bold text-primary">
                          {talent.currency || "INR"} {talent.rate_per_video || "—"}
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Live</p>
                        <p className="text-xl font-bold text-primary">
                          {talent.currency || "INR"} {talent.rate_per_live || "—"}
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Post</p>
                        <p className="text-xl font-bold text-primary">
                          {talent.currency || "INR"} {talent.rate_per_post || "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Expertise</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {talent.categories && talent.categories.length > 0 ? (
                            talent.categories.map((cat: string, idx: number) => (
                              <Badge key={idx} variant="default">
                                {cat}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground italic text-sm">No categories added</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-2">
                          {talent.specializations && talent.specializations.length > 0 ? (
                            talent.specializations.map((spec: string, idx: number) => (
                              <Badge key={idx} variant="secondary">
                                {spec}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground italic text-sm">No specializations added</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {talent.portfolio_description || "No portfolio description added yet"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Achievements</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {talent.achievements || "No achievements added yet"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-8 space-y-6">
                  <h2 className="text-2xl font-bold">Professional Details</h2>
                  <p className="text-muted-foreground italic">
                    No talent profile created yet. Click "Edit Profile" to add your professional details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )} */}

      {isEditing && (
        <Card className="border rounded-lg shadow-sm">
          <CardContent className="pt-8">
            {/* Edit Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X size={20} />
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setEditTab("basic")}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${editTab === "basic"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setEditTab("talent")}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${editTab === "talent"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                Professional Details
              </button>
            </div>

            {/* Error Messages */}
            {(profileError || talentError) && (
              <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
                {profileError || talentError}
              </div>
            )}

            {/* Forms */}
            {editTab === "basic" && (
              <ProfileBasicForm
                profile={profile}
                onSubmit={handleBasicProfileSubmit}
                isLoading={profileLoading}
                onCancel={() => setIsEditing(true)}
              />
            )}

            {editTab === "talent" && (
              <ProfileTalentForm
                talent={talent}
                onSubmit={handleTalentProfileSubmit}
                isLoading={talentLoading}
                onCancel={() => setIsEditing(true)}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
