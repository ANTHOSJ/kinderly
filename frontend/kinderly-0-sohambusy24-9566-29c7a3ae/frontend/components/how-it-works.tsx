import { Search, Calendar, Star } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search",
    description: "Browse verified babysitters in your area. Filter by experience, certifications, and availability.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book",
    description: "Select your date and time. Receive instant confirmation and connect with your sitter.",
  },
  {
    icon: Star,
    step: "03",
    title: "Relax",
    description: "Enjoy peace of mind knowing your children are in safe, caring hands. Leave a review after!",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Finding care is easy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Book a trusted babysitter in three simple steps. It&apos;s that easy.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="relative bg-card rounded-3xl p-8 border border-border/50 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-2">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
