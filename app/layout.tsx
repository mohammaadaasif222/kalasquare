import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SiteHeader from "@/components/home/site-header"
import SiteFooter from "@/components/home/site-footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Book Your Artist For Events - Hire Artist, Singers, Comedians, Anchor, Influencers, Best Influencer Management Agency in Delhi",
  description: "Discover the power of influencer marketing to amplify your brand. Our expert strategies connect you with top influencers to drive engagement, increase visibility, and boost sales. Unlock your brand&#039;s potential today",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <div className="min-h-[calc(100dvh-56px)]">{children}</div>
          <SiteFooter />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
