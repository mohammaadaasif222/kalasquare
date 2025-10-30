"use client"
import { Header } from "@/components/admin/header"
import AddArtistForm from "@/components/admin/add-artist-form"
import ArtistOnboardingFlow from "@/components/admin/artist/artist-onboarding-flow"

export default function NewArtistPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Add New Artist" description="Create a new artist profile" />
      <div className="flex-1 p-6 overflow-auto">
        <ArtistOnboardingFlow />
      </div>
    </div>
  )
}
