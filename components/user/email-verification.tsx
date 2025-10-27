"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

interface EmailVerificationProps {
  onVerified: (email: string) => void
  initialEmail?: string
}

export function EmailVerification({ onVerified, initialEmail = "" }: EmailVerificationProps) {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail size={20} />
          Email Verification
        </CardTitle>
        <CardDescription>Verify your email address to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "input" ? (
          <>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleSendOtp} disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground mt-2">OTP sent to {email}</p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("input")} disabled={loading} className="flex-1">
                Back
              </Button>
              <Button onClick={handleVerifyOtp} disabled={loading} className="flex-1">
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
