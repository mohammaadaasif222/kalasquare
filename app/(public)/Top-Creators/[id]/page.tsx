import Header from "@/components/talent-profile/header"
import ProfileHero from "@/components/talent-profile/profile-hero"
import About from "@/components/talent-profile/about"
import Services from "@/components/talent-profile/services"
import Videos from "@/components/talent-profile/videos"
import Reels from "@/components/talent-profile/reels"
import Portfolio from "@/components/talent-profile/portfolio"
import Reviews from "@/components/talent-profile/reviews"
import Campaigns from "@/components/talent-profile/campaigns"
import Awards from "@/components/talent-profile/awards"
import Footer from "@/components/talent-profile/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProfileHero />
      <About />
      <Services />
      <Videos />
      <Reels />
      <Portfolio />
      <Reviews />
      <Campaigns />
      <Awards />
      <Footer />
    </main>
  )
}
