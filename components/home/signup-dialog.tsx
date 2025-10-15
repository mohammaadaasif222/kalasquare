"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Mail, Apple, X } from "lucide-react"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17.4 3 15 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c3.6 0 6-1.2 7.2-3.4.7-1.1 1-2.3 1-3.3 0-.3 0-.6-.1-.9H12z"
      />
      <path
        fill="#34A853"
        d="M3.9 7.4 6.8 9.5C7.6 7.5 9.6 6.2 12 6.2c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17.4 3 15 2 12 2 8 2 4.7 4.3 3.2 7.4z"
        opacity=".1"
      />
      <path
        fill="#FBBC05"
        d="M12 22c3.6 0 6-1.2 7.2-3.4l-3-2.5c-.8 1.4-2.3 2.2-4.2 2.2-2.5 0-4.6-1.7-5.3-4l-3 2.3C5.4 19.9 8.4 22 12 22z"
        opacity=".1"
      />
      <path
        fill="#4285F4"
        d="M22.1 10.7H12V14.6h5.4c-.3 1.6-1.8 3.3-5.4 3.3-3.2 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17.4 3 15 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c3.6 0 6-1.2 7.2-3.4.7-1.1 1-2.3 1-3.3 0-.3 0-.6-.1-.9z"
        opacity=".1"
      />
    </svg>
  )
}
export function SignupDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [role, setRole] = React.useState<"artist" | "brand">("artist")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-6 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-2xl font-semibold">Get Started</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-md p-1 hover:bg-muted" aria-label="Close">
            <X className="size-5" />
          </DialogClose>
        </DialogHeader>

        {/* Segmented role selector */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className={cn(
              "h-11 rounded-md border text-base shadow-sm",
              role === "artist"
                ? "bg-[var(--brand)] text-[var(--brand-foreground)] border-[color:var(--brand)]"
                : "bg-background text-foreground",
            )}
            onClick={() => setRole("artist")}
          >
            Register as Artist
          </Button>
          <Button
            variant="secondary"
            className={cn(
              "h-11 rounded-md border text-base shadow-sm",
              role === "brand"
                ? "bg-[var(--brand)] text-[var(--brand-foreground)] border-[color:var(--brand)]"
                : "bg-background text-foreground border-[color:var(--brand)]",
            )}
            onClick={() => setRole("brand")}
          >
            Register as Brand
          </Button>
        </div>

        <div className="mt-4 grid gap-3">
          <Button variant="outline" className="h-12 justify-start gap-3 text-base bg-transparent">
            <GoogleIcon className="size-5" />
            <span>Continue with Google</span>
          </Button>
          <Button variant="outline" className="h-12 justify-start gap-3 text-base bg-transparent">
            <Mail className="size-5" />
            <span>Continue with Email</span>
          </Button>
          <Button variant="outline" className="h-12 justify-start gap-3 text-base bg-transparent">
            <Apple className="size-5" />
            <span>Continue with Apple</span>
          </Button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        {/* Phone input with country prefix mock */}
        <label className="text-sm font-medium" htmlFor="phone">
          Mobile number
        </label>
        <div className="mt-1 flex h-12 items-center gap-2 rounded-md border bg-background px-3">
          <span className="flex items-center gap-2 text-sm">
            <span aria-hidden="true">🇮🇳</span>
            +91
          </span>
          <Separator orientation="vertical" />
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="Continue with mobile number"
            className="border-0 focus-visible:ring-0"
          />
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          I agree to the{" "}
          <a className="underline" href="#">
            Terms &amp; Conditions
          </a>{" "}
          &amp;{" "}
          <a className="underline" href="#">
            Privacy Policy
          </a>
        </p>
      </DialogContent>
    </Dialog>
  )
}
