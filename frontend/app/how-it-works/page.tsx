import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Search, 
  UserCheck, 
  MessageCircle, 
  Calendar, 
  Shield, 
  Star,
  CheckCircle,
  ArrowRight,
  Heart,
  Clock,
  Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | Kinderly",
  description: "Learn how Kinderly connects families with trusted, verified babysitters. Simple booking, thorough vetting, and peace of mind.",
}

const forParentsSteps = [
  {
    step: 1,
    title: "Create Your Family Profile",
    description: "Sign up and tell us about your family. Share details about your children, your childcare needs, and any special requirements. This helps us match you with the perfect sitter.",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    step: 2,
    title: "Browse Verified Sitters",
    description: "Explore our carefully vetted babysitters in your area. Filter by experience, certifications, availability, languages, and specialties. Every sitter has a detailed profile with trust scores and real reviews.",
    icon: Search,
    color: "bg-primary/10 text-primary",
  },
  {
    step: 3,
    title: "Connect & Message",
    description: "Found someone you like? Send them a message through our secure platform. Ask questions, discuss your needs, and get to know them before booking.",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    step: 4,
    title: "Book with Confidence",
    description: "Schedule your babysitting session with just a few clicks. Choose your date, time, and provide any special instructions. Payment is handled directly with your sitter after the session.",
    icon: Calendar,
    color: "bg-green-100 text-green-600",
  },
  {
    step: 5,
    title: "Enjoy Peace of Mind",
    description: "Relax knowing your children are in trusted hands. After each session, leave a review to help other families and build community trust.",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
]

const forSittersSteps = [
  {
    step: 1,
    title: "Apply to Join",
    description: "Fill out your application with your experience, qualifications, and availability. Tell us what makes you special and why you love working with children.",
    icon: UserCheck,
    color: "bg-primary/10 text-primary",
  },
  {
    step: 2,
    title: "Complete Verification",
    description: "Our thorough vetting process includes background checks, identity verification, and reference checks. This ensures families can trust you completely.",
    icon: Shield,
    color: "bg-green-100 text-green-600",
  },
  {
    step: 3,
    title: "Build Your Profile",
    description: "Create a compelling profile showcasing your skills, experience, certifications, and personality. Add photos and highlight what makes your care unique.",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
  },
  {
    step: 4,
    title: "Set Your Schedule & Rates",
    description: "You are in control. Set your own hourly rates and availability. Update anytime as your schedule changes.",
    icon: Clock,
    color: "bg-blue-100 text-blue-600",
  },
  {
    step: 5,
    title: "Connect with Families",
    description: "Receive booking requests from families in your area. Build lasting relationships and grow your childcare career with Kinderly.",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
]

const trustFeatures = [
  {
    title: "Comprehensive Background Checks",
    description: "Every sitter undergoes multi-state criminal background checks, sex offender registry searches, and identity verification before joining our platform.",
  },
  {
    title: "Verified References",
    description: "We contact and verify professional references for each sitter to ensure they have a proven track record of excellent care.",
  },
  {
    title: "Trust Score System",
    description: "Our proprietary trust score combines verification status, reviews, response rates, and reliability metrics into one easy-to-understand number.",
  },
  {
    title: "Real Reviews from Real Families",
    description: "All reviews come from verified bookings. We actively monitor for fake reviews and only publish authentic feedback.",
  },
  {
    title: "Secure Communication",
    description: "Message sitters through our platform without sharing personal contact information until you are ready.",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to help with any questions, concerns, or emergencies.",
  },
]

function StepCard({ step, isLast = false }: { step: typeof forParentsSteps[0]; isLast?: boolean }) {
  const Icon = step.icon
  
  return (
    <div className="relative">
      <div className="flex gap-6">
        {/* Step indicator */}
        <div className="flex flex-col items-center">
          <div className={`h-14 w-14 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6" />
          </div>
          {!isLast && (
            <div className="w-0.5 h-full min-h-16 bg-gradient-to-b from-border to-transparent mt-4" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="rounded-full text-xs">
              Step {step.step}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-6 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-0">
                Simple & Secure
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6 text-balance">
                Finding trusted childcare has never been easier
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Kinderly connects families with verified, experienced babysitters in your neighborhood. 
                Our thorough vetting process and transparent reviews ensure you can book with complete confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
                  <Link href="/discover">
                    Find a Babysitter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                  <Link href="/become-a-sitter">Become a Sitter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Parents Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Intro */}
              <div className="lg:sticky lg:top-32">
                <Badge className="mb-4 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-0">
                  For Parents
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                  Book trusted childcare in minutes
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Finding the right babysitter should be simple and stress-free. 
                  Our platform makes it easy to discover, connect with, and book verified sitters who match your family&apos;s needs.
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-2xl border border-border/50">
                    <p className="text-2xl font-bold text-primary">10K+</p>
                    <p className="text-xs text-muted-foreground">Verified Sitters</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-2xl border border-border/50">
                    <p className="text-2xl font-bold text-primary">50K+</p>
                    <p className="text-xs text-muted-foreground">Happy Families</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-2xl border border-border/50">
                    <p className="text-2xl font-bold text-primary">4.9</p>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </div>

              {/* Right: Steps */}
              <div>
                {forParentsSteps.map((step, i) => (
                  <StepCard 
                    key={step.step} 
                    step={step} 
                    isLast={i === forParentsSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For Sitters Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Steps */}
              <div className="order-2 lg:order-1">
                {forSittersSteps.map((step, i) => (
                  <StepCard 
                    key={step.step} 
                    step={step} 
                    isLast={i === forSittersSteps.length - 1}
                  />
                ))}
              </div>

              {/* Right: Intro */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-32">
                <Badge className="mb-4 rounded-full px-4 py-1.5 bg-green-100 text-green-700 border-0">
                  For Babysitters
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                  Grow your childcare career
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Join thousands of professional babysitters who trust Kinderly to connect them with wonderful families. 
                  Set your own rates, build your reputation, and enjoy the flexibility you deserve.
                </p>
                
                {/* Benefits */}
                <div className="space-y-3">
                  {[
                    "Set your own rates and schedule",
                    "Get discovered by families nearby",
                    "Build trust with verified reviews",
                    "Secure, reliable booking system",
                    "Dedicated sitter support team"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-8 rounded-full px-8" asChild>
                  <Link href="/become-a-sitter">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-green-100 text-green-700 border-0">
                Your Safety First
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Trust built into every booking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We take safety seriously. Our comprehensive verification process and ongoing monitoring 
                ensure that every sitter on our platform meets our high standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustFeatures.map((feature, i) => (
                <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full px-8" asChild>
                <Link href="/trust-safety">
                  Learn More About Safety
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/20 to-secondary border-0 overflow-hidden">
              <CardContent className="p-8 sm:p-12 lg:p-16">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                    Ready to get started?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Join thousands of families who trust Kinderly for their childcare needs. 
                    Finding the perfect babysitter is just a few clicks away.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
                      <Link href="/signup">
                        Create Free Account
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                      <Link href="/discover">Browse Babysitters</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
