

"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { MapPin, Menu } from "lucide-react"
import { SignupDialog } from "./signup-dialog"
import Image from "next/image"

const menus = ["Hire Talent", "Top Creators", "Events & Shows", "Exclusive"] // add more if needed

export default function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [authOpen, setAuthOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background">

      <div className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="KalaSquare Home">
            <Image src="https://kalasquare.com/public/frontend/images/KalaSquaremainlogo.png" alt="KalaSquare" width={150} height={100} className="rounded-sm" />
          </Link>

          <div className="hidden w-full sm:flex items-center justify-end gap-1 text-base">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-muted"
              aria-label="Change location"
            >
              <span>Delhi-NCR</span>
              <span aria-hidden="true">▾</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={authOpen} onOpenChange={setAuthOpen}>
              <DialogTrigger asChild>
                <Button
                  className="h-7 rounded-sm px-4 text-xs font-medium text-[var(--brand-foreground)] transition transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                  style={{ background: "var(--brand)" }}
                >
                  Sign In
                </Button>

              </DialogTrigger>
              <SignupDialog open={authOpen} onOpenChange={setAuthOpen} />
            </Dialog>

            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="inline-flex h-8 w-12 items-center justify-center rounded-md hover:bg-muted"
                >
                  <img src={'/menu-svgrepo-com.svg'}/>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 grid gap-1">
                  {menus.map((m) => (
                    <Link key={m} href="#" className="rounded px-2 py-2 hover:bg-muted">
                      {m}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden border-b bg-[var(--subtle)] sm:block">
        <nav className="mx-auto flex h-10 max-w-5xl items-center justify-end gap-6 px-3 sm:px-4">
          {menus.map((m) => (
            <Link key={m} className="text-base hover:underline" href="#">
              {m}
            </Link>
          ))}
        </nav>
      </div>

      <MobileBottomDrawer menus={menus} />
    </header>
  )
}

function MobileBottomDrawer({ menus }: { menus: string[] }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* The bottom “bar that holds menus” and acts as the drawer trigger */}
        <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[60] flex justify-center">
          <SheetTrigger asChild>
            <button
              className={cn(
                "pointer-events-auto flex items-center gap-2 rounded-full border bg-background px-5 py-2 shadow-md",
                "hover:bg-muted",
              )}
              aria-label="Open mobile menu"
            >
              <Menu className="size-5" />
              <span className="text-sm font-medium">Menu</span>
            </button>
          </SheetTrigger>
        </div>

        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" aria-hidden="true" />
          <nav className="mt-4 grid gap-2">
            {menus.map((m) => (
              <Link key={m} href="#" className="rounded px-2 py-3 text-base hover:bg-muted">
                {m}
              </Link>
            ))}
          </nav>
          <Separator className="my-4" />
          <div className="grid gap-2">
            <Button className="h-10 rounded-md text-[var(--brand-foreground)]" style={{ background: "var(--brand)" }}>
              Get Started
            </Button>
            <Button variant="outline" className="h-10 bg-transparent">
              Browse All
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
