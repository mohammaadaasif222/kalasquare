"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import ArtistProfileStep from "./steps/artist-profile-step"
import SocialMediaStep from "./steps/social-media-step"
import WorkSamplesStep from "./steps/work-samples-step"
import CompletionStep from "./steps/completion-step"

type Step = "profile" | "social" | "works" | "complete"

interface OnboardingData {
  talentProfileId: string | null
  userId: string | null
  profileData: any
}

export default function ArtistOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("profile")
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    talentProfileId: null,
    userId: null,
    profileData: null,
  })

  const steps: { id: Step; label: string; description: string }[] = [
    { id: "profile", label: "Artist Profile", description: "Create your account" },
    { id: "social", label: "Social Media", description: "Link your accounts" },
    { id: "works", label: "Work Samples", description: "Upload your portfolio" },
    { id: "complete", label: "Complete", description: "All set!" },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const handleProfileComplete = (data: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      talentProfileId: data.talentProfileId,
      userId: data.userId,
      profileData: data,
    }))
    setCurrentStep("social")
  }

  const handleSocialComplete = () => {
    setCurrentStep("works")
  }

  const handleWorksComplete = () => {
    setCurrentStep("complete")
  }

  const handleRestart = () => {
    setCurrentStep("profile")
    setOnboardingData({
      talentProfileId: null,
      userId: null,
      profileData: null,
    })
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">Join Our Artist Community</h1>
          <p className="text-xl text-slate-300">Complete your profile in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      index < currentStepIndex
                        ? "bg-emerald-500 text-white"
                        : index === currentStepIndex
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white ring-4 ring-indigo-300"
                          : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {index < currentStepIndex ? <CheckCircle2 size={24} /> : index + 1}
                  </div>
                  <div className="mt-3 text-center">
                    <p
                      className={`font-semibold transition-colors ${
                        index <= currentStepIndex ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded-full transition-all duration-300 ${
                      index < currentStepIndex ? "bg-emerald-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {currentStep === "profile" && <ArtistProfileStep onComplete={handleProfileComplete} />}
          {currentStep === "social" && onboardingData.talentProfileId && (
            <SocialMediaStep
              talentProfileId={onboardingData.talentProfileId}
              onComplete={handleSocialComplete}
              onBack={() => setCurrentStep("profile")}
            />
          )}
          {currentStep === "works" && onboardingData.talentProfileId && (
            <WorkSamplesStep
              talentProfileId={onboardingData.talentProfileId}
              onComplete={handleWorksComplete}
              onBack={() => setCurrentStep("social")}
            />
          )}
          {currentStep === "complete" && (
            <CompletionStep profileData={onboardingData.profileData} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  )
}
