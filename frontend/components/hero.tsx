"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Clock, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-accent/20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-32 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            <Badge 
              variant="secondary" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border-0 hover:bg-primary/15 transition-colors"
            >
              <Shield className="h-4 w-4" />
              Trusted by 50,000+ families
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight text-foreground">
              <span className="block">Find the perfect</span>
              <span className="block mt-2 text-primary">babysitter</span>
              <span className="block mt-2">for your family</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect with verified, background-checked babysitters in your neighborhood. 
              Book with confidence, knowing your little ones are in caring hands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105"
                asChild
              >
                <Link href="/discover">Find a Babysitter</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-base border-2 hover:bg-secondary transition-all hover:scale-105"
                asChild
              >
                <Link href="/become-a-sitter">Become a Sitter</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">4.9/5 rating</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Book in minutes</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero illustration/cards */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main card */}
            <Link 
              href="/sitters/1"
              className="relative z-20 bg-card rounded-3xl p-6 shadow-2xl shadow-foreground/5 border border-border/50 max-w-sm w-full transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 block"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-accent/50 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl">👩‍🦱</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Sarah M.</h3>
                    <Badge className="bg-primary/10 text-primary border-0 text-xs">Verified</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(127)</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>0.8 miles away</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full text-xs">CPR Certified</Badge>
                <Badge variant="secondary" className="rounded-full text-xs">First Aid</Badge>
                <Badge variant="secondary" className="rounded-full text-xs">5+ years exp</Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                {'"'}I love working with children and making learning fun! Available evenings and weekends.{'"'}
              </p>
              <Button className="w-full mt-4 rounded-xl">Book Now - $22/hr</Button>
            </Link>

            {/* Floating cards */}
            <div className="absolute top-0 left-0 z-10 bg-card rounded-2xl p-4 shadow-xl border border-border/50 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Background Checked</p>
                  <p className="text-xs text-muted-foreground">100% verified sitters</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 right-0 z-30 bg-card rounded-2xl p-4 shadow-xl border border-border/50 transform rotate-3 hover:rotate-0 transition-transform duration-500 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Instant Booking</p>
                  <p className="text-xs text-muted-foreground">Book in under 2 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
