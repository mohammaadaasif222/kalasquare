"use client"

import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  profileData: any
  onRestart: () => void
}

export default function CompletionStep({ profileData, onRestart }: Props) {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-slate-900">Welcome to the Community!</h2>
          <p className="text-xl text-slate-600">
            Your artist profile has been successfully created and is ready to showcase your talent.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200 space-y-4">
          <h3 className="font-semibold text-slate-900 text-lg">What's Next?</h3>
          <ul className="text-left space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">✓</span>
              <span>Your profile is live and visible to potential collaborators</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">✓</span>
              <span>Social media accounts are linked to your profile</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">✓</span>
              <span>Work samples showcase your best talent</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">✓</span>
              <span>Start receiving collaboration opportunities</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-6">
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full px-8 py-4 text-lg font-semibold bg-transparent"
          >
            Create Another Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
