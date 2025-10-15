"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Apple, Phone } from "lucide-react"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.2 14.7 2.3 12 2.3 6.8 2.3 2.6 6.6 2.6 11.9S6.8 21.5 12 21.5c7 0 9.6-4.9 9.6-7.5 0-.5-.1-.8-.1-1.1H12z"
      />
    </svg>
  )
}

export function SignupButton() {
  const [open, setOpen] = React.useState(false)
  const [showPhone, setShowPhone] = React.useState(false)
  const [phone, setPhone] = React.useState("")

  function handlePhoneContinue() {
    // You can wire this to your auth provider later.
    // console.log("[v0] Phone submitted:", phone)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>Choose a sign-in method to continue.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <GoogleIcon className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button variant="outline" className="justify-start gap-2 bg-transparent">
            <Apple className="h-5 w-5" />
            Continue with Apple
          </Button>
          {!showPhone ? (
            <Button variant="outline" className="justify-start gap-2 bg-transparent" onClick={() => setShowPhone(true)}>
              <Phone className="h-5 w-5" />
              Continue with phone
            </Button>
          ) : (
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-xs font-medium">
                Phone number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={handlePhoneContinue}>Continue</Button>
            </div>
          )}
        </div>

        <p className="mt-1 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  )
}
