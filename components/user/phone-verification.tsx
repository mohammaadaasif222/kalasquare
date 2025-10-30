"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone } from "lucide-react"

interface PhoneVerificationProps {
  onVerified: (phone: string) => void
  initialPhone?: string
  triggerButton?: React.ReactNode
}

export function PhoneVerification({
  onVerified,
  initialPhone = "",
  triggerButton
}: PhoneVerificationProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"input" | "otp">("input")
  const [phone, setPhone] = useState(initialPhone)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setError("Please enter a phone number")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify/phone/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      if (!response.ok) throw new Error("Failed to send OTP")
      setStep("otp")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify/phone/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      })

      if (!response.ok) throw new Error("Invalid OTP")
      onVerified(phone)
      setOpen(false)
      // Reset state
      setStep("input")
      setOtp("")
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep("input")
    setOtp("")
    setError("")
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset state when modal closes
      setStep("input")
      setOtp("")
      setError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerButton || (
          <p className="flex items-center">
            <Phone className="mr-2" size={16} />
            <span className="mr-2">{initialPhone}</span><span className="underline cursor-pointer text-xs text-yellow-500">Verify</span>
          </p>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone size={20} />
            Phone Verification
          </DialogTitle>
          <DialogDescription>
            {step === "input"
              ? "Enter your phone number to receive a verification code"
              : "Enter the OTP sent to your phone"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {step === "input" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  disabled={loading}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={handleSendOtp} disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                />
                <p className="text-xs text-muted-foreground">OTP sent to {phone}</p>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleVerifyOtp} disabled={loading} className="flex-1">
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}