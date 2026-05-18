import { Shield, CheckCircle, Eye, Clock, Phone, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const safetyFeatures = [
  {
    icon: Shield,
    title: "Background Checks",
    description: "Every sitter undergoes comprehensive background screening including criminal records, identity verification, and reference checks.",
  },
  {
    icon: CheckCircle,
    title: "ID Verification",
    description: "We verify the identity of all babysitters through government-issued ID and facial recognition technology.",
  },
  {
    icon: Eye,
    title: "Reviews & Ratings",
    description: "Transparent reviews from real families help you make informed decisions. Only verified bookings can leave reviews.",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Receive live updates during bookings including check-ins, photos, and activity logs from your sitter.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist with any questions or concerns.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "All payments are processed securely. You only pay after your booking is complete, with full protection.",
  },
]

const trustBadges = [
  "FBI Background Check",
  "Sex Offender Registry",
  "SSN Verification",
  "Reference Checks",
  "Driving Record",
  "Insurance Coverage",
]

export function TrustSafety() {
  return (
    <section id="safety" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Trust & Safety
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Your family&apos;s safety is our priority
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We&apos;ve built Kinderly with safety at its core. Every babysitter goes through 
              our rigorous verification process before they can accept their first booking.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustBadges.map((badge) => (
                <Badge 
                  key={badge}
                  variant="secondary"
                  className="px-4 py-2 rounded-full text-sm bg-card border border-border/50"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Certification badge */}
            <div className="inline-flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Trusted Care Certified</p>
                <p className="text-sm text-muted-foreground">
                  Meeting the highest standards in childcare safety
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className={`group p-6 bg-card rounded-2xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 ${
                  index === 0 || index === 5 ? 'sm:translate-y-4' : ''
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
