"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data - replace with actual hook data
const mockTalentDetails = {
  id: "0b48c86a-851f-43ee-a374-26cef32f2955",
  display_name: "Devil",
  email: "aasifmohamamd@gmail.com",
  first_name: "Mohammad",
  last_name: "Aasif",
  talent_type: "actor",
  categories: ["Drama", "Comedy", "Fantasy"],
  status: "busy",
  followers: 0,
  is_premium: false,
  verify_badge: false,
  location: "amorha, Uttar Pradesh",
  created_at: "2025-10-24T10:19:00.992Z",
  email_verified: false,
  phone_verified: false,
}

export default function TalentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const talentId = params.id as string

  const [talent, setTalent] = useState(mockTalentDetails)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success toast
  }

  const handleToggleVerifyBadge = () => {
    setTalent((prev) => ({
      ...prev,
      verify_badge: !prev.verify_badge,
    }))
  }

  const handleTogglePremium = () => {
    setTalent((prev) => ({
      ...prev,
      is_premium: !prev.is_premium,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{talent.display_name}</h1>
              <p className="text-muted-foreground">{talent.email}</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <Input
                      value={talent.first_name}
                      onChange={(e) => setTalent({ ...talent, first_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <Input
                      value={talent.last_name}
                      onChange={(e) => setTalent({ ...talent, last_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                  <Input
                    value={talent.display_name}
                    onChange={(e) => setTalent({ ...talent, display_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input value={talent.email} disabled className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <Input
                    value={talent.location}
                    onChange={(e) => setTalent({ ...talent, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Professional Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Talent Type</label>
                  <Input value={talent.talent_type} disabled className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categories</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {talent.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Input value={talent.status} disabled className="mt-1" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Admin Actions */}
          <div className="space-y-6">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Admin Actions</h2>
              <div className="space-y-3">
                <Button
                  onClick={handleToggleVerifyBadge}
                  variant={talent.verify_badge ? "default" : "outline"}
                  className="w-full justify-start gap-2"
                >
                  <Star className="w-4 h-4" />
                  {talent.verify_badge ? "✓ Verified" : "Verify Badge"}
                </Button>
                <Button
                  onClick={handleTogglePremium}
                  variant={talent.is_premium ? "default" : "outline"}
                  className="w-full justify-start gap-2"
                >
                  <Star className="w-4 h-4" />
                  {talent.is_premium ? "✓ Platinum User" : "Make Platinum"}
                </Button>
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Account Info</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Email Verified</p>
                  <p className="font-medium text-foreground">{talent.email_verified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Verified</p>
                  <p className="font-medium text-foreground">{talent.phone_verified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Followers</p>
                  <p className="font-medium text-foreground">{talent.followers}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium text-foreground">{new Date(talent.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
