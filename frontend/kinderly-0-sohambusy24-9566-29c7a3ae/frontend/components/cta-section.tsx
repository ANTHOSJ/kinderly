"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"

export function CTASection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-border/50 shadow-2xl shadow-foreground/5 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-8">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Ready to find your perfect babysitter?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of families who trust Kinderly. Sign up today and get 
              your first booking at 50% off.
            </p>

            {/* Email signup form */}
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 rounded-full bg-background border-border/50 focus:border-primary text-base"
              />
              <Button 
                type="submit"
                size="lg"
                className="h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            {/* Trust note */}
            <p className="text-sm text-muted-foreground">
              No credit card required • Cancel anytime • 50% off first booking
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
