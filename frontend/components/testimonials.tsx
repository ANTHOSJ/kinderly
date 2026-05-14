"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jennifer & Mark",
    role: "Parents of 2",
    avatar: "👨‍👩‍👧‍👦",
    rating: 5,
    content: "Kinderly has been a game-changer for our family. We found Sarah through the app and she's been our go-to sitter for over a year now. The verification process gave us such peace of mind.",
    highlight: "Peace of mind",
  },
  {
    id: 2,
    name: "Amanda L.",
    role: "Single mom",
    avatar: "👩‍👧",
    rating: 5,
    content: "As a single working mom, finding reliable childcare was always stressful. Kinderly made it so easy - I can book a verified sitter in minutes, even for last-minute needs!",
    highlight: "So easy to use",
  },
  {
    id: 3,
    name: "David & Lisa",
    role: "New parents",
    avatar: "👨‍👩‍👦",
    rating: 5,
    content: "We were nervous about leaving our newborn for the first time. The detailed profiles and reviews helped us find a sitter with infant experience. She was absolutely wonderful!",
    highlight: "Detailed profiles",
  },
  {
    id: 4,
    name: "Rachel T.",
    role: "Mom of 3",
    avatar: "👩‍👧‍👦",
    rating: 5,
    content: "The background check feature is what sold us. Every sitter we've booked through Kinderly has been professional, punctual, and great with our kids. Highly recommend!",
    highlight: "Background verified",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Loved by families everywhere
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join thousands of happy parents who trust Kinderly for their childcare needs.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`relative bg-card border-border/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 ${
                index === 0 || index === 3 ? 'lg:translate-y-4' : ''
              }`}
            >
              <CardContent className="p-8">
                {/* Quote highlight */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  {'"'}{testimonial.highlight}{'"'}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  {'"'}{testimonial.content}{'"'}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-accent/50 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {[
            { value: "50K+", label: "Happy families" },
            { value: "10K+", label: "Verified sitters" },
            { value: "4.9", label: "Average rating" },
            { value: "500K+", label: "Hours booked" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-serif text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
