"use client"
import { ProfileHeader } from "@/components/user/profile-header"
import StatsSection from "@/components/user/stats-section"
import PortfolioSection from "@/components/user/portfolio-section"
import BookingsSection from "@/components/user/bookings-section"
import InsightsSection from "@/components/user/insights-section"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useUserNav } from "@/context/UseNavContaxt"
import ProfileUpdateForm from "@/components/user/profile-update-form"
import { useProfile } from "@/hooks/use-profile"
import { useTalent } from "@/hooks/use-talent"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { EditableProfile } from "@/components/user/editable-profile"
import Loader from "@/components/shared/Loader"

export default function Dashboard() {
    const { activeNav, setActiveNav } = useUserNav()
    const showProfileUpdate = activeNav === "edit-profile"
    const { profile, loading: profileLoading, fetchProfile } = useProfile()
    const { talent, fetchTalentByUserId } = useTalent()
    const auth = useSelector((state: RootState) => state.auth.user)
    console.log(profile)
    useEffect(() => {
        if (auth?.id) {
            fetchTalentByUserId(auth.id)
            fetchProfile(auth?.id ?? "")
        }
    }, [auth?.id])

    if (!talent || !profile) {
        return <Loader/>
    }
    return (
        <div >
            {showProfileUpdate ? (
                <div className="p-4 md:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setActiveNav("dashboard")} className="gap-2">
                            <ArrowLeft size={18} />
                            Back
                        </Button>
                    </div>
                    <EditableProfile profile={profile} talent={talent} userId={auth?.id ?? ""} />
                </div>
            ) : (
                /* Dashboard Content */
                <div className="p-4 md:p-8 space-y-6">
                    {/* <ProfileHeader /> */}
                    <StatsSection />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PortfolioSection talentProfileId={talent?.id} />
                        </div>
                        <div>
                            <InsightsSection />
                        </div>
                    </div>
                    <BookingsSection />
                </div>
            )}
        </div>

    )
}
