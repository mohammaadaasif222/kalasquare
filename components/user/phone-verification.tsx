"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

interface PhoneVerificationProps {
  onVerified: (phone: string) => void
  initialPhone?: string
}

export function PhoneVerification({ onVerified, initialPhone = "" }: PhoneVerificationProps) {
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
          <Phone size={20} />
          Phone Verification
        </CardTitle>
        <CardDescription>Verify your phone number to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "input" ? (
          <>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
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
              <p className="text-xs text-muted-foreground mt-2">OTP sent to {phone}</p>
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
