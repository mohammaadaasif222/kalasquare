"use client"

import type { UserProfile } from "@/types/profile.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

interface ProfileHeaderProps {
  profile: UserProfile | null
  isLoading: boolean
  onEditClick: () => void
  onCompleteClick: () => void
}

export function ProfileHeader({ profile, isLoading, onEditClick, onCompleteClick }: ProfileHeaderProps) {
  if (isLoading) {
    return <div className="w-full bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse h-64 rounded-lg" />
  }
  console.log(profile)
  const hasProfile = profile && profile.id
  const initials = profile ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}` : "U"

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6" />

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6 -mt-16 relative z-10 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={profile?.profile_image_url || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback className="bg-blue-500 text-white text-lg font-bold">{initials}</AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile?.display_name || `${profile?.first_name || ""} ${profile?.last_name || ""}`}
            </h1>
            {profile?.bio && <p className="text-gray-600 mt-1">{profile.bio}</p>}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              {profile?.user?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{profile.user.email}</span>
                </div>
              )}
              {profile?.user?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{profile.user.phone}</span>
                </div>
              )}
              {profile?.location_city && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {profile.location_city}
                    {profile.location_state && `, ${profile.location_state}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button onClick={hasProfile ? onEditClick : onCompleteClick} className="w-full sm:w-auto" size="lg">
            {hasProfile ? "Edit Profile" : "Complete Profile"}
          </Button>
        </div>
      </div>
    </div>
  )
}
