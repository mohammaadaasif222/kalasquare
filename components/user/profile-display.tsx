// "use client"

// import type { UserProfile } from "@/types/profile"
// import { Phone, MapPin, Globe, Award, Briefcase, Verified, Mail } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useSelector } from "react-redux"
// import { useEffect, useState } from "react"
// import { PhoneVerification } from "./phone-verification"
// import { EmailVerification } from "./email-verification"
// import { useCurrentUser } from "@/hooks/use-user"
// import { RootState } from "@/lib/redux/store"

// interface ProfileDisplayProps {
//   profile: UserProfile | null
//   onEdit: () => void
//   onCompleteProfile: () => void
// }

// export function ProfileDisplay({ profile, onEdit, onCompleteProfile }: ProfileDisplayProps) {
//   const { currentUser: user, fetchUser } = useCurrentUser()
//   const [showPhoneVerification, setShowPhoneVerification] = useState(false)
//   const [showEmailVerification, setShowEmailVerification] = useState(false)
//   const auth = useSelector((state: RootState) => state.auth.user);
//   useEffect(() => {
//     fetchUser(auth?.id ?? "", { profile: true, talent: true })
//   }, [])
//   const handlePhoneVerified = (phone: string) => {
//     setShowPhoneVerification(false)
//     // Optionally refresh profile or update Redux state
//     console.log("Phone verified:", phone)
//   }

//   const handleEmailVerified = (email: string) => {
//     setShowEmailVerification(false)
//     // Optionally refresh profile or update Redux state
//     console.log("Email verified:", email)
//   }

//   if (!profile) {
//     return (
//       <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
//         <Card className="border-0 shadow-lg">
//           <CardContent className="pt-12 pb-12 text-center">
//             <div className="mb-6">
//               <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center">
//                 <Briefcase className="w-10 h-10 text-primary" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
//             <p className="text-muted-foreground mb-6">
//               Get started by filling in your professional information to unlock opportunities
//             </p>
//             <Button onClick={onCompleteProfile} size="lg" className="gap-2">
//               <Briefcase size={18} />
//               Complete Profile
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
//       {/* Banner */}
//       {profile.banner_image_url && (
//         <div className="mb-6 rounded-lg overflow-hidden h-48 md:h-64">
//           <img
//             src={profile.banner_image_url || "/placeholder.svg"}
//             alt="Banner"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       <Card className="border-0 shadow-lg">
//         <CardContent className="pt-8">
//           {/* Profile Header */}
//           <div className="flex flex-col md:flex-row gap-6 mb-8">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               {profile.profile_image_url ? (
//                 <img
//                   src={profile.profile_image_url || "/placeholder.svg"}
//                   alt={profile.display_name || `${profile.first_name} ${profile.last_name}`}
//                   className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
//                 />
//               ) : (
//                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20">
//                   <span className="text-4xl font-bold text-primary/40">
//                     {profile.first_name?.[0]}
//                     {profile.last_name?.[0]}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Profile Info */}
//             <div className="flex-1">
//               <div className="mb-4">
//                 <h1 className="text-3xl font-bold mb-1">
//                   {profile.display_name || `${profile.first_name} ${profile.last_name}`}
//                 </h1>
//                 {profile.talent_type && <p className="text-lg text-primary font-semibold">{profile.talent_type}</p>}
//               </div>

//               {profile.bio && <p className="text-muted-foreground mb-4 line-clamp-3">{profile.bio}</p>}

//               {/* Contact Info */}
//               <div className="space-y-2 mb-6">
//                 {profile.whatsapp && (
//                   <div className="flex items-center gap-2 text-sm">
//                     <Phone size={16} className="text-primary" />
//                     <span>{profile.whatsapp}</span>
//                   </div>
//                 )}
//                 {profile.website_url && (
//                   <div className="flex items-center gap-2 text-sm">
//                     <Globe size={16} className="text-primary" />
//                     <a
//                       href={profile.website_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary hover:underline"
//                     >
//                       {profile.website_url}
//                     </a>
//                   </div>
//                 )}
//                 {profile.location_city && (
//                   <div className="flex items-center gap-2 text-sm">
//                     <MapPin size={16} className="text-primary" />
//                     <span>
//                       {profile.location_city}
//                       {profile.location_state && `, ${profile.location_state}`}
//                       {profile.location_country && `, ${profile.location_country}`}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-3">
//                 <Button onClick={onEdit} size="lg" className="gap-2 w-full md:w-auto">
//                   Edit Profile
//                 </Button>

//                 {/* Email Verification */}
//                 {profile?.user?.email && (
//                   <div className="flex items-center gap-2">
//                     {!user?.email_verified ? (
//                       <Button
//                         onClick={() => setShowEmailVerification(true)}
//                         variant="outline"
//                         size="sm"
//                         className="gap-2"
//                       >
//                         <Mail className="w-4 h-4" />
//                         {profile.user.email} - Verify Email
//                       </Button>
//                     ) : (
//                       <span className="text-xs flex items-center gap-1 text-green-600">
//                         <Mail className="w-4 h-4" />
//                         {profile.user.email}
//                         <Verified className="w-4 h-4" />
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Phone Verification/Update */}
//                 {profile?.user?.phone ? (
//                   <div className="flex items-center gap-2">
//                     {!user?.phone_verified ? (
//                       <Button
//                         onClick={() => setShowPhoneVerification(true)}
//                         variant="outline"
//                         size="sm"
//                         className="gap-2"
//                       >
//                         <Phone className="w-4 h-4" />
//                         {profile.user.phone} - Verify Phone
//                       </Button>
//                     ) : (
//                       <span className="text-xs flex items-center gap-1 text-green-600">
//                         <Phone className="w-4 h-4" />
//                         {profile.user.phone}
//                         <Verified className="w-4 h-4" />
//                       </span>
//                     )}
//                   </div>
//                 ) : (
//                   <Button
//                     onClick={() => setShowPhoneVerification(true)}
//                     variant="outline"
//                     size="sm"
//                     className="gap-2"
//                   >
//                     <Phone className="w-4 h-4" />
//                     Add Phone Number
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Verification Modals */}
//           {showPhoneVerification && (
//             <div className="mb-6">
//               <PhoneVerification
//                 onVerified={handlePhoneVerified}
//                 initialPhone={profile?.user?.phone || ""}
//               />
//             </div>
//           )}

//           {showEmailVerification && (
//             <div className="mb-6">
//               <EmailVerification
//                 onVerified={handleEmailVerified}
//                 initialEmail={profile?.user?.email || ""}
//               />
//             </div>
//           )}

//           {/* Professional Details */}
//           <div className="border-t pt-8 space-y-6">
//             {/* Experience & Rates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {profile.experience_level && (
//                 <div>
//                   <h3 className="font-semibold text-sm text-muted-foreground mb-2">Experience Level</h3>
//                   <p className="text-lg font-medium">{profile.experience_level}</p>
//                 </div>
//               )}
//               {profile.years_of_experience && (
//                 <div>
//                   <h3 className="font-semibold text-sm text-muted-foreground mb-2">Years of Experience</h3>
//                   <p className="text-lg font-medium">{profile.years_of_experience} years</p>
//                 </div>
//               )}
//               {profile.rate_per_video && (
//                 <div>
//                   <h3 className="font-semibold text-sm text-muted-foreground mb-2">Hourly Rate</h3>
//                   <p className="text-lg font-medium">
//                     {profile.currency || "USD"} {profile.rate_per_video}
//                   </p>
//                 </div>
//               )}
//               {profile.availability_status && (
//                 <div>
//                   <h3 className="font-semibold text-sm text-muted-foreground mb-2">Availability</h3>
//                   <p className="text-lg font-medium">{profile.availability_status}</p>
//                 </div>
//               )}
//             </div>

//             {/* Categories & Specializations */}
//             {(profile.categories?.length > 0 || profile.specializations?.length > 0) && (
//               <div>
//                 <h3 className="font-semibold mb-3">Expertise</h3>
//                 <div className="space-y-3">
//                   {profile.categories?.length > 0 && (
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-2">Categories</p>
//                       <div className="flex flex-wrap gap-2">
//                         {profile.categories.map((cat: string, idx: number) => (
//                           <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
//                             {cat}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {profile.specializations?.length > 0 && (
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-2">Specializations</p>
//                       <div className="flex flex-wrap gap-2">
//                         {profile.specializations.map((spec: string, idx: number) => (
//                           <span
//                             key={idx}
//                             className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
//                           >
//                             {spec}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Awards & Certifications */}
//             {(profile.awards?.length > 0 || profile.certifications?.length > 0) && (
//               <div>
//                 <h3 className="font-semibold mb-3 flex items-center gap-2">
//                   <Award size={18} />
//                   Achievements
//                 </h3>
//                 <div className="space-y-4">
//                   {profile.awards?.length > 0 && (
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-2">Awards</p>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {profile.awards.map((award: any, idx: number) => (
//                           <div key={idx} className="rounded-lg overflow-hidden border border-border">
//                             <img
//                               src={award.url || "/placeholder.svg"}
//                               alt={award.name}
//                               className="w-full h-24 object-cover"
//                             />
//                             <p className="text-xs p-2 text-center truncate">{award.name}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {profile.certifications?.length > 0 && (
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-2">Certifications</p>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {profile.certifications.map((cert: any, idx: number) => (
//                           <div key={idx} className="rounded-lg overflow-hidden border border-border">
//                             <img
//                               src={cert.url || "/placeholder.svg"}
//                               alt={cert.name}
//                               className="w-full h-24 object-cover"
//                             />
//                             <p className="text-xs p-2 text-center truncate">{cert.name}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import type { UserProfile } from "@/types/profile"
import { Phone, MapPin, Globe, Award, Briefcase, Verified, Mail, DollarSign, Clock, Languages, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { PhoneVerification } from "./phone-verification"
import { EmailVerification } from "./email-verification"
import { useCurrentUser } from "@/hooks/use-user"
import { RootState } from "@/lib/redux/store"
import UpdatePassword from "./upate-password"

interface ProfileDisplayProps {
  profile: UserProfile | null
  talent: UserProfile | null
  onEdit: () => void
  onCompleteProfile: () => void
}

export function ProfileDisplay({ profile, talent,  onEdit, onCompleteProfile }: ProfileDisplayProps) {
  const { currentUser: user, fetchUser } = useCurrentUser()
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const auth = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (auth?.id) {
      fetchUser(auth.id, { profile: true, talent: true })
    }
  }, [auth?.id])

  const handlePhoneVerified = async (phone: string) => {
    setIsVerifying(true)
    try {
      // Refresh user data after verification
      if (auth?.id) {
        await fetchUser(auth.id, { profile: true, talent: true })
      }
      setShowPhoneVerification(false)
      console.log("Phone verified:", phone)
    } catch (error) {
      console.error("Error refreshing after phone verification:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleEmailVerified = async (email: string) => {
    setIsVerifying(true)
    try {
      // Refresh user data after verification
      if (auth?.id) {
        await fetchUser(auth.id, { profile: true, talent: true })
      }
      setShowEmailVerification(false)
      console.log("Email verified:", email)
    } catch (error) {
      console.error("Error refreshing after email verification:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
            <p className="text-muted-foreground mb-6">
              Get started by filling in your professional information to unlock opportunities
            </p>
            <Button onClick={onCompleteProfile} size="lg" className="gap-2">
              <Briefcase size={18} />
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const displayName = profile.display_name || `${profile.first_name} ${profile.last_name}`
  const talentType = user?.talentProfile?.talent_type || profile.talent_type
  const userEmail = user?.email || auth?.email
  const userPhone = user?.phone || auth?.phone
  const isEmailVerified = user?.email_verified || auth?.email_verified
  const isPhoneVerified = user?.phone_verified || auth?.phone_verified

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-4">
      {/* Banner */}
      {/* {profile.banner_image_url && (
        <div className="mb-6 rounded-lg overflow-hidden h-48 md:h-64 shadow-md">
          <img
            src={profile.banner_image_url}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )} */}

      <Card className="border rounded-none">
        <CardContent className="pt-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {profile.profile_image_url ? (
                <div className="relative">
                  <img
                    src={profile.profile_image_url}
                    alt={displayName}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                  {user?.talentProfile?.verify_badge && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                      <Verified className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-lg">
                  <span className="text-4xl font-bold text-primary/40">
                    {profile.first_name?.[0]}
                    {profile.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  {displayName}
                  {user?.talentProfile?.verify_badge && (
                    <Verified className="w-6 h-6 text-blue-500" />
                  )}
                </h1>
                {talentType && (
                  <Badge variant="default" className="text-base px-3 py-1 mb-3">
                    {talentType.charAt(0).toUpperCase() + talentType.slice(1)}
                  </Badge>
                )}
              </div>

              {profile.bio && (
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              )}

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.whatsapp && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-primary flex-shrink-0" />
                    <span className="truncate">{profile.whatsapp}</span>
                  </div>
                )}
                {profile.website_url && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe size={16} className="text-primary flex-shrink-0" />
                    <a
                      href={profile.website_url.startsWith('http') ? profile.website_url : `https://${profile.website_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {profile.website_url}
                    </a>
                  </div>
                )}
                {profile.location_city && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    <span className="truncate">
                      {profile.location_city}
                      {profile.location_state && `, ${profile.location_state}`}
                      {profile.location_country && `, ${profile.location_country}`}
                    </span>
                  </div>
                )}
                {profile.languages && (
                  <div className="flex items-center gap-2 text-sm">
                    <Languages size={16} className="text-primary flex-shrink-0" />
                    <span className="truncate">{profile.languages}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button onClick={onEdit} size="lg" className="gap-2">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="border-t pt-6 pb-6 space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">Account Verification</h3>
            
            {/* Email Verification */}
            {userEmail && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{userEmail}</p>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                  </div>
                </div>
                {isEmailVerified ? (
                  <Badge variant="default" className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                    <Verified className="w-3 h-3" />
                    Verified
                  </Badge>
                ) : (
                  <Button
                    onClick={() => setShowEmailVerification(true)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    Verify Email
                  </Button>
                )}
              </div>

            )}

            {/* Phone Verification */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {userPhone || "No phone number added"}
                  </p>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                </div>
              </div>
              {userPhone ? (
                isPhoneVerified ? (
                  <Badge variant="default" className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                    <Verified className="w-3 h-3" />
                    Verified
                  </Badge>
                ) : (
                  <Button
                    onClick={() => setShowPhoneVerification(true)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    Verify Phone
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => setShowPhoneVerification(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  Add Phone
                </Button>
              )}
            </div>
          </div>
          <UpdatePassword userId={auth?.id??""}/>

          {/* Verification Modals */}
          {showPhoneVerification && (
            <div className="border-t pt-6 mb-6">
              <PhoneVerification
                onVerified={handlePhoneVerified}
                initialPhone={userPhone || ""}
              />
            </div>
          )}

          {showEmailVerification && (
            <div className="border-t pt-6 mb-6">
              <EmailVerification
                onVerified={handleEmailVerified}
                initialEmail={userEmail || ""}
              />
            </div>
          )}

          {/* Talent Profile Details */}
          {user?.talentProfile && (
            <div className="border-t pt-8 space-y-6">
              {/* Professional Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user?.talentProfile.experience_level && (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <p className="font-semibold capitalize">
                      {user?.talentProfile.experience_level}
                    </p>
                  </Card>
                )}
                {user?.talentProfile.years_of_experience && (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Years</p>
                    </div>
                    <p className="font-semibold">
                      {user?.talentProfile.years_of_experience}+
                    </p>
                  </Card>
                )}
                {user?.talentProfile.availability_status && (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Status</p>
                    </div>
                    <p className="font-semibold capitalize">
                      {user?.talentProfile.availability_status}
                    </p>
                  </Card>
                )}
                {/* {user?.talentProfile && (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Currency</p>
                    </div>
                    <p className="font-semibold">
                      {User?.talentProfile.currency}
                    </p>
                  </Card>
                )} */}
              </div>

              {/* Rates */}
              {(user?.talentProfile.rate_per_video || 
                user?.talentProfile.rate_per_live || 
                user.talentProfile.rate_per_post) && (
                <div>
                  <h3 className="font-semibold mb-3">Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {user?.talentProfile.rate_per_video && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Video</p>
                        <p className="text-xl font-bold text-primary">
                        INR {user?.talentProfile.rate_per_video}
                        </p>
                      </div>
                    )}
                    {user?.talentProfile.rate_per_live && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Live</p>
                        <p className="text-xl font-bold text-primary">
                        INR {user?.talentProfile.rate_per_live}
                        </p>
                      </div>
                    )}
                    {user?.talentProfile.rate_per_post && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Per Post</p>
                        <p className="text-xl font-bold text-primary">
                          INR {user?.talentProfile.rate_per_post}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Categories & Specializations */}
               {(user?.talentProfile.categories?.length > 0 || 
                user?.talentProfile?.categories?.length > 0) && (
                <div>
                  <h3 className="font-semibold mb-3">Expertise</h3>
                  <div className="space-y-3">
                    {user?.talentProfile.categories?.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {user?.talentProfile.categories.map((cat: string, idx: number) => (
                            <Badge key={idx} variant="default">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {user?.talentProfile?.specializations?.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-2">
                          {user?.talentProfile?.specializations.map((spec: string, idx: number) => (
                            <Badge key={idx} variant="secondary">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )} 

              {/* Portfolio & Achievements */}
              {(user?.talentProfile?.portfolio_description || 
                user?.talentProfile?.achievements) && (
                <div className="space-y-4">
                  {user?.talentProfile?.portfolio_description && (
                    <div>
                      <h3 className="font-semibold mb-2">Portfolio</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {user?.talentProfile?.portfolio_description}
                      </p>
                    </div>
                  )}
                  {user?.talentProfile?.achievements && (
                    <div>
                      <h3 className="font-semibold mb-2">Achievements</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {user?.talentProfile?.achievements}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Awards & Certifications */}
              {/* {(profile.talentProfile.awards?.length > 0 || 
                profile.talentProfile.certifications?.length > 0) && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award size={18} className="text-primary" />
                    Recognition
                  </h3>
                  <div className="space-y-4">
                    {profile.talentProfile.awards?.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Awards</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {profile.talentProfile.awards.map((award: any, idx: number) => (
                            <Card key={idx} className="overflow-hidden">
                              <img
                                src={award.url}
                                alt={award.name}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-2">
                                <p className="text-xs text-center truncate font-medium">
                                  {award.name}
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    {profile.talentProfile.certifications?.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Certifications</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {profile.talentProfile.certifications.map((cert: any, idx: number) => (
                            <Card key={idx} className="overflow-hidden">
                              <img
                                src={cert.url}
                                alt={cert.name}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-2">
                                <p className="text-xs text-center truncate font-medium">
                                  {cert.name}
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )} */}

              {/* Collaboration Preferences */}
              {/* {profile.talentProfile.collaboration_preferences && (
                <div>
                  <h3 className="font-semibold mb-2">Collaboration Preferences</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.talentProfile.collaboration_preferences}
                  </p>
                </div>
              )} */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}