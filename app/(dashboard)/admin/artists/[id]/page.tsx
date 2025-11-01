"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { useProfile } from "@/hooks/use-profile"
import { useTalent } from "@/hooks/use-talent"
import { useEffect, useState } from "react"
import { EditableProfile } from "@/components/user/editable-profile"
import Loader from "@/components/shared/Loader"
import WorkSampleManager from "@/components/works/work-sample"
import SocialAccountsManager from "@/components/social-accounts/social-accounts"
import { useParams } from "next/navigation"
// import { fetchProfileByUserId } from "@/lib/redux/features/profile/profileSlice"

export default function page() {
  const params = useParams() // Changed from useRouter
  const id = params?.id as string
  const { profile, loading: profileLoading,fetchUserById } = useProfile()
  const { talent, fetchTalentByUserId } = useTalent()
  const [activeNav, setActiveNav] = useState('edit-profile')

  useEffect(() => {
    if (id) {
      fetchTalentByUserId(id.toString())
      fetchUserById(id.toString())
    }
  }, [id])

  if (!talent || !profile) {
    return <Loader />
  }

  return (
    <div >
      {activeNav.trim() === "edit-profile" && (
        <div className="p-4 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setActiveNav("dashboard")} className="gap-2">
              <ArrowLeft size={18} />
              Back
            </Button>
          </div>
          <EditableProfile profile={profile} talent={talent} userId={id?.toString() ?? ""} />
        </div>
      )}
   
      <WorkSampleManager talentProfileId={talent?.id} />
     
      <SocialAccountsManager talentProfileId={talent?.id} />
    </div>

  )
}
