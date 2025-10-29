"use client"

import { X, Mail, Apple } from "lucide-react"
import GoogleAuth from "../auth/GoogleAuth"
import { useRouter } from "next/navigation"

interface GetStartedModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const router = useRouter()
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition z-10"
          aria-label="Close modal"
        >
          <X size={20} strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="p-8 pt-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4 tracking-tight">Get Started</h1>

          {/* Primary Buttons */}
          <div className="flex gap-2 mb-8">
            <button onClick={() => router.push('/register')} className="flex-1 bg-[var(--brand)] hover:bg-[var(--brand)]/80 text-white font-semibold py-3 px-3 rounded-lg transition duration-200 text-xs">
              Register as Artist
            </button>
            <button onClick={() => router.push('/register')} className="flex-1 border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-red-50 font-semibold py-3 px-3 rounded-lg transition duration-200 text-xs">
              Register as Brand
            </button>
          </div>

          {/* Social Login Options */}
          <div className="space-y-4 mb-4">
            {/* Google */}
            <GoogleAuth />

            {/* Email */}
            <button className="w-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-3 rounded-sm transition duration-200 flex items-center justify-center gap-2 text-sm">
              <Mail size={16} className="text-gray-600" />
              Continue with Email
            </button>

            {/* Apple */}
            <button className="w-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-3 rounded-sm transition duration-200 flex items-center justify-center gap-2 text-sm">
              <Apple size={16} className="text-gray-900" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-normal">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Mobile Number Input */}
          <div className="mb-6">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition">
              <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-300">
                <span className="text-base">🇮🇳</span>
                <span className="text-gray-700 font-medium text-sm">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Continue with mobile number"
                className="flex-1 px-3 py-3 outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>
            {" & "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
