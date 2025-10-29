

"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { MapPin, Menu, User, User2 } from "lucide-react"
import { SignupDialog } from "./signup-dialog"
import Image from "next/image"
import GetStartedModal from "../models/get-started-modal"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { useRouter } from "next/navigation"

interface MenuType {
  lable: string,
  url: string
}
const menus = [{ lable: "Hire Talent", url: 'hire-talent' }, { lable: "Top Creators", url: 'top-creators' }, { lable: "Events & Shows", url: 'events-shows' }, { lable: "Exclusive", url: 'exclusive' }] // add more if needed
const menuMobile = [{ lable: 'login', url: 'login' }, { lable: "Hire Talent", url: 'hire-talent' }, { lable: "Top Creators", url: 'top-creators' }, { lable: "Events & Shows", url: 'events-shows' }, { lable: "Exclusive", url: 'exclusive' }] // add more if needed

export default function SiteHeader() {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [authOpen, setAuthOpen] = React.useState(false)
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth)

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
              className="inline-flex text-muted-foreground text-xs items-center gap-1 rounded px-2 py-1 cursor-pointer hover:text-black"
              aria-label="Change location"
            >
              <span>Delhi-NCR</span>
              <span aria-hidden="true">▾</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ?
              <button
                className="rounded-sm  text-gray-600 cursor-pointer transition transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                onClick={() => router.push("/user")}
              >
                <User2 className="h-6 w-6" />
              </button>
              :
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="h-7 rounded-sm px-4 text-xs font-medium text-[var(--brand-foreground)] transition transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                    style={{ background: "var(--brand)" }}
                  >
                    Sign In
                  </Button>

                </DialogTrigger>
                {/* <SignupDialog open={authOpen} onOpenChange={setAuthOpen} /> */}
                <GetStartedModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
              </Dialog>}

            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={cn(
                    "group relative inline-flex h-7 w-12 items-center justify-center overflow-hidden rounded-xs",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 hover:bg-muted/80 active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2",
                  )}
                >
                  {/* Animated menu icon */}
                  <div className="relative flex h-5 w-6 flex-col items-center justify-center gap-1.5">
                    <span
                      className="h-0.5 w-full rounded-full  bg-gray-600 transition-all duration-300 ease-out group-hover:w-5"
                      // style={{ backgroundColor: "var(--brand)" }}
                      // style={{ backgroundColor: "var(--brand)" }}
                    />
                    <span
                      className="h-0.5 w-full rounded-full bg-gray-600 transition-all duration-300 ease-out"
                      // style={{ backgroundColor: "var(--brand)" }}
                    />
                    <span
                      className="h-0.5 w-full rounded-full bg-gray-600 transition-all duration-300 ease-out group-hover:w-5"
                      // style={{ backgroundColor: "" }}
                    />
                  </div>
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "w-80 border-l-2 px-0",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
                  "data-[state=open]:duration-500 data-[state=closed]:duration-300",
                )}
                style={{
                  borderLeftColor: "var(--brand)",
                }}
              >
                <SheetHeader className="px-6 pb-4">
                  <SheetTitle className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand)]/70 bg-clip-text text-transparent">
                      Menu
                    </span>
                  </SheetTitle>
                  {/* Decorative accent line */}
                  <div
                    className="mt-2 h-1 w-12 rounded-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: "var(--brand)" }}
                  />
                </SheetHeader>

                <nav className="mt-4 grid gap-1 px-4">
                  {menus.map((m: MenuType, index: number) => (
                    <Link
                      key={m.lable}
                      href={`/${m.url}`}
                      className={cn(
                        "group relative overflow-hidden rounded-xs px-4 py-3.5 text-base font-medium",
                        "transition-all duration-300 ease-out",
                        "hover:bg-muted/80 hover:pl-6 hover:shadow-sm",
                        "animate-in fade-in slide-in-from-right-4",
                      )}
                      style={{
                        animationDelay: `${index * 60}ms`,
                        animationDuration: "400ms",
                        animationFillMode: "backwards",
                      }}
                      onClick={() => setDrawerOpen(false)}
                    >
                      {/* Hover accent bar */}
                      <div
                        className="absolute inset-y-0 left-0 w-1 rounded-r-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5"
                        style={{ backgroundColor: "var(--brand)" }}
                      />

                      {/* Menu text */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--brand)]">
                        {m.lable}
                      </span>

                      {/* Subtle background glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                        style={{ backgroundColor: "var(--brand)" }}
                      />
                    </Link>
                  ))}
                </nav>

                {/* Optional footer section with brand accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-20"
                  style={{
                    background: `linear-gradient(to right, transparent, var(--brand), transparent)`,
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden bg-[var(--subtle)] sm:block">
        <nav className="mx-auto flex h-10 max-w-6xl items-center justify-end gap-6 px-3 sm:px-4">
          {menus.map((m: MenuType) => (
            <Link key={m.lable} className="text-xs text-muted-foreground hover:underline " href={`/${m.url}`}>
              {m.lable}
            </Link>
          ))}
        </nav>
      </div>

      <MobileBottomDrawer menus={menuMobile} />
    </header>
  )
}

function MobileBottomDrawer({ menus }: { menus: MenuType[] }) {
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
            {menus.map((m: MenuType) => (
              <Link key={m.lable} href="#" className="rounded px-2 py-3 text-base hover:bg-muted">
                {m.lable}
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
