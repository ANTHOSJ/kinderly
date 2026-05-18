import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { trustFeatures } from "@/lib/data"
import {
  Shield,
  CheckCircle,
  Lock,
  Eye,
  Phone,
  FileCheck,
  UserCheck,
  AlertTriangle,
  Heart,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Scale,
  Headphones
} from "lucide-react"

export const metadata: Metadata = {
  title: "Trust & Safety | Kinderly",
  description: "Learn about Kinderly's comprehensive safety measures, background checks, and verification processes that keep families safe.",
}

const verificationSteps = [
  {
    title: "Identity Verification",
    description: "We verify government-issued ID, address history, and social security number for every sitter before they can join our platform.",
    icon: UserCheck,
    details: [
      "Government ID verification",
      "Address history check",
      "SSN verification",
      "Photo matching technology"
    ]
  },
  {
    title: "Background Checks",
    description: "Comprehensive multi-state criminal background checks ensure you know who you're inviting into your home.",
    icon: FileCheck,
    details: [
      "Multi-state criminal records",
      "Sex offender registry",
      "Federal criminal database",
      "County court records"
    ]
  },
  {
    title: "Reference Verification",
    description: "We contact and verify professional childcare references to ensure each sitter has a proven track record.",
    icon: Phone,
    details: [
      "Professional references",
      "Employment verification",
      "Character references",
      "Childcare experience validation"
    ]
  },
  {
    title: "Ongoing Monitoring",
    description: "Safety doesn't stop at signup. We continuously monitor and re-verify sitters throughout their time on the platform.",
    icon: Eye,
    details: [
      "Annual background re-checks",
      "Review monitoring",
      "Incident reporting system",
      "Performance tracking"
    ]
  },
]

const safetyPolicies = [
  {
    title: "Zero Tolerance Policy",
    description: "We maintain strict policies against any form of misconduct. Violations result in immediate removal from the platform and reporting to authorities when required.",
    icon: AlertTriangle,
  },
  {
    title: "Secure Communication",
    description: "All messages between families and sitters happen through our encrypted platform. Personal contact info is only shared when you choose to share it.",
    icon: Lock,
  },
  {
    title: "Insurance Protection",
    description: "Every booking on Kinderly is backed by our $1M liability insurance policy, providing an extra layer of protection for your peace of mind.",
    icon: Shield,
  },
  {
    title: "24/7 Support Team",
    description: "Our dedicated trust and safety team is available around the clock to address any concerns, answer questions, or respond to emergencies.",
    icon: Headphones,
  },
]

const trustScoreFactors = [
  { factor: "Background Check Status", weight: "25%", description: "Verified clean background check" },
  { factor: "Identity Verification", weight: "20%", description: "Confirmed identity and credentials" },
  { factor: "Review Ratings", weight: "20%", description: "Average rating from families" },
  { factor: "Response Rate", weight: "15%", description: "Timely responses to messages" },
  { factor: "Booking Completion", weight: "10%", description: "Successfully completed bookings" },
  { factor: "Profile Completeness", weight: "10%", description: "Detailed and accurate profile" },
]

const faqItems = [
  {
    question: "What's included in the background check?",
    answer: "Our comprehensive background check includes multi-state criminal record searches, sex offender registry checks, federal criminal database searches, and county court record reviews. We also verify identity through government-issued ID and SSN verification."
  },
  {
    question: "How often are background checks updated?",
    answer: "All sitters undergo annual background check renewals. Additionally, we use continuous monitoring services that alert us to any new records between annual checks."
  },
  {
    question: "What happens if there's an issue during a booking?",
    answer: "Our 24/7 support team is always available. You can reach us immediately through the app, and we'll work to resolve any issues quickly. For emergencies, always contact local authorities first, then reach out to us."
  },
  {
    question: "How does the trust score work?",
    answer: "The trust score is a weighted average of several factors including verification status, review ratings, response rate, and booking completion rate. Scores range from 0-100, with higher scores indicating more trusted and reliable sitters."
  },
  {
    question: "Can I report concerns about a sitter?",
    answer: "Absolutely. We have multiple reporting channels including in-app reporting, email, and phone support. All reports are investigated promptly and confidentially."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes. We use bank-level encryption to protect all personal data. Your information is never shared without your explicit consent, and we comply with all relevant privacy regulations."
  },
]

function FeatureIcon({ feature }: { feature: typeof trustFeatures[0] }) {
  const iconMap: Record<string, typeof Shield> = {
    "Background Checks": FileCheck,
    "Identity Verification": UserCheck,
    "Trust Scores": BadgeCheck,
    "Secure Messaging": Lock,
    "Reviews & Ratings": Eye,
    "24/7 Support": Headphones,
    "Secure Payments": ShieldCheck,
    "Insurance Coverage": Shield,
  }
  
  const Icon = iconMap[feature.title] || Shield
  
  return (
    <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-green-600" />
    </div>
  )
}

export default function TrustSafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-green-50/50 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6 text-balance">
                Your family&apos;s safety is our top priority
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Every sitter on Kinderly goes through our rigorous verification process. 
                We combine thorough background checks, verified reviews, and continuous monitoring 
                to ensure you can book with complete confidence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="rounded-full px-4 py-2 bg-green-100 text-green-700 border-0 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  100% Verified Sitters
                </Badge>
                <Badge className="rounded-full px-4 py-2 bg-primary/10 text-primary border-0 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  $1M Insurance Coverage
                </Badge>
                <Badge className="rounded-full px-4 py-2 bg-blue-100 text-blue-700 border-0 text-sm">
                  <Headphones className="h-4 w-4 mr-2" />
                  24/7 Support
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-0">
                Our Process
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Rigorous verification, every step
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Before any sitter can accept bookings, they must pass our comprehensive 
                multi-step verification process. Here&apos;s what we check:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {verificationSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <Card key={i} className="border-border/50 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-secondary/30 rounded-xl p-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          What we verify
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {step.details.map((detail, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust Score Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 rounded-full px-4 py-1.5 bg-yellow-100 text-yellow-700 border-0">
                  Trust Score
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                  Transparent trust at a glance
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our proprietary Trust Score combines multiple factors into one easy-to-understand 
                  number, helping you quickly identify the most reliable sitters. Scores range from 
                  0-100, with verified sitters typically scoring above 85.
                </p>
                
                {/* Score example */}
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-20 w-20 rounded-2xl bg-green-100 flex items-center justify-center">
                        <span className="text-3xl font-bold text-green-600">98</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Excellent Trust Score</p>
                        <p className="text-sm text-muted-foreground">Top 5% of all sitters</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Verified background check</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">150+ positive reviews</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">99% response rate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>How Trust Scores are Calculated</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trustScoreFactors.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-14 text-right flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">{item.weight}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{item.factor}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Features Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-green-100 text-green-700 border-0">
                Safety Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Protection at every step
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From first message to completed booking, we have safeguards in place 
                to ensure your family&apos;s safety and peace of mind.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustFeatures.map((feature, i) => (
                <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <FeatureIcon feature={feature} />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Policies Section */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-0">
                Our Commitment
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Policies that protect you
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We maintain strict policies and provide comprehensive support to ensure 
                every interaction on Kinderly is safe and positive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {safetyPolicies.map((policy, i) => {
                const Icon = policy.icon
                return (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-6 flex gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{policy.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{policy.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-secondary text-secondary-foreground border-0">
                FAQ
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Common questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-green-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Questions or concerns?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our trust and safety team is here to help. Whether you have questions about 
                our verification process or need to report a concern, we&apos;re available 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
                  <Link href="/discover">
                    Find Trusted Sitters
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
