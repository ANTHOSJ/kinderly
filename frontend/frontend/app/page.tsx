import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBadges } from "@/components/trust-badges"
import { HowItWorks } from "@/components/how-it-works"
import { BabysitterCards } from "@/components/babysitter-cards"
import { TrustSafety } from "@/components/trust-safety"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <BabysitterCards />
      <TrustSafety />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
