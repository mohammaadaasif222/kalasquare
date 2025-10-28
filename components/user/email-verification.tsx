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
import { Mail } from "lucide-react"

interface EmailVerificationProps {
  onVerified: (email: string) => void
  initialEmail?: string
  triggerButton?: React.ReactNode
}

export function EmailVerification({
  onVerified,
  initialEmail = "",
  triggerButton
}: EmailVerificationProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"input" | "otp">("input")
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Please enter an email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify/email/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      const response = await fetch("/api/verify/email/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      if (!response.ok) throw new Error("Invalid OTP")
      onVerified(email)
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
          <Button>
            <Mail className="mr-2" size={16} />
            Verify Email
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail size={20} />
            Email Verification
          </DialogTitle>
          <DialogDescription>
            {step === "input"
              ? "Enter your email address to receive a verification code"
              : "Enter the OTP sent to your email"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {step === "input" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                <p className="text-xs text-muted-foreground">OTP sent to {email}</p>
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