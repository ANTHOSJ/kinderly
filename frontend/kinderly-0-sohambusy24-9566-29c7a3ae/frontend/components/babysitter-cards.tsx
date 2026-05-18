"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart, Clock, BadgeCheck } from "lucide-react"
import { useState } from "react"

const babysitters = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "👩‍🦰",
    rating: 4.9,
    reviews: 156,
    distance: "0.5 miles",
    hourlyRate: 24,
    experience: "8 years",
    badges: ["CPR Certified", "First Aid", "Early Childhood Ed"],
    bio: "Former preschool teacher with a passion for creative learning. I bring educational activities and lots of patience!",
    available: true,
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "👨‍🦱",
    rating: 5.0,
    reviews: 89,
    distance: "1.2 miles",
    hourlyRate: 20,
    experience: "4 years",
    badges: ["CPR Certified", "Background Checked", "Pet Friendly"],
    bio: "College student studying child psychology. Great with homework help and outdoor activities!",
    available: true,
    verified: true,
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "👩",
    rating: 4.8,
    reviews: 203,
    distance: "0.8 miles",
    hourlyRate: 26,
    experience: "10 years",
    badges: ["Newborn Care", "First Aid", "Multilingual"],
    bio: "Experienced nanny specializing in infants and toddlers. Fluent in English and Spanish.",
    available: true,
    verified: true,
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "👨",
    rating: 4.9,
    reviews: 67,
    distance: "1.5 miles",
    hourlyRate: 22,
    experience: "5 years",
    badges: ["Special Needs", "CPR Certified", "Tutoring"],
    bio: "Trained in special needs care. Patient, understanding, and dedicated to every child's wellbeing.",
    available: false,
    verified: true,
  },
]

export function BabysitterCards() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    )
  }

  return (
    <section id="babysitters" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge 
            variant="secondary" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border-0 mb-6"
          >
            <BadgeCheck className="h-4 w-4" />
            Verified Sitters
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Meet our trusted babysitters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every sitter on Kinderly goes through a rigorous verification process. 
            Find someone who matches your family&apos;s needs perfectly.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {babysitters.map((sitter, index) => (
            <Card 
              key={sitter.id}
              className={`group relative bg-card border-border/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 hover:-translate-y-2 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <CardContent className="p-6">
                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(sitter.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      favorites.includes(sitter.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>

                {/* Avatar and basic info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-accent/50 flex items-center justify-center text-3xl">
                      {sitter.avatar}
                    </div>
                    {sitter.available && (
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{sitter.name}</h3>
                      {sitter.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{sitter.rating}</span>
                      <span className="text-sm text-muted-foreground">({sitter.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{sitter.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sitter.badges.slice(0, 2).map((badge) => (
                    <Badge 
                      key={badge} 
                      variant="secondary" 
                      className="rounded-full text-xs px-2.5 py-0.5"
                    >
                      {badge}
                    </Badge>
                  ))}
                  {sitter.badges.length > 2 && (
                    <Badge variant="secondary" className="rounded-full text-xs px-2.5 py-0.5">
                      +{sitter.badges.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {sitter.bio}
                </p>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{sitter.experience} experience</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <span className="text-xl font-semibold text-foreground">${sitter.hourlyRate}</span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>
                  <Button 
                    className="rounded-xl transition-all group-hover:shadow-lg group-hover:shadow-primary/20"
                    disabled={!sitter.available}
                  >
                    {sitter.available ? "Book Now" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-2 hover:bg-secondary transition-all hover:scale-105"
            asChild
          >
            <Link href="/discover">View All Babysitters</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
