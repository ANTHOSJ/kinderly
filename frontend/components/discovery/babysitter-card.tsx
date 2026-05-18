"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart, Clock, BadgeCheck, Shield, MessageCircle } from "lucide-react"
import { useState } from "react"

export interface BabysitterData {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  distance: string
  hourlyRate: number
  experience: string
  experienceYears: number
  badges: string[]
  bio: string
  available: boolean
  verified: boolean
  trustScore: number
  languages: string[]
  responseTime: string
  location?: string
  availability?: {
    weekdays: boolean
    weekends: boolean
    evenings: boolean
    overnight: boolean
  }
}

interface BabysitterCardProps {
  sitter: BabysitterData
  viewMode?: "grid" | "list"
}

export function BabysitterCard({ sitter, viewMode = "grid" }: BabysitterCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return "bg-green-100 text-green-700"
    if (score >= 85) return "bg-primary/10 text-primary"
    return "bg-secondary text-secondary-foreground"
  }

  // List view layout
  if (viewMode === "list") {
    return (
      <Card className="group relative bg-card border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-foreground/5">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Avatar section */}
            <div className="relative w-full sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-accent/30 to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-6xl">{sitter.avatar}</span>
              
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsFavorite(!isFavorite)
                }}
                className="absolute top-3 right-3 sm:right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all hover:scale-110 shadow-sm"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>

              {/* Availability badge */}
              {sitter.available && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-500 text-white border-0 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                    Available
                  </Badge>
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
              {/* Main info */}
              <div className="flex-1 min-w-0">
                {/* Name and verification */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-lg truncate">{sitter.name}</h3>
                  {sitter.verified && (
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                  <Badge className={`${getTrustScoreColor(sitter.trustScore)} border-0 rounded-full px-2 py-0.5 text-xs font-semibold ml-auto sm:ml-2`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {sitter.trustScore}%
                  </Badge>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{sitter.rating}</span>
                    <span className="text-muted-foreground">({sitter.reviews})</span>
                  </div>
                  <span className="text-muted-foreground/50">|</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{sitter.distance}</span>
                  </div>
                  <span className="text-muted-foreground/50">|</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{sitter.experience}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {sitter.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {sitter.badges.slice(0, 4).map((badge) => (
                    <Badge 
                      key={badge} 
                      variant="secondary" 
                      className="rounded-full text-xs px-2 py-0.5 bg-secondary/80"
                    >
                      {badge}
                    </Badge>
                  ))}
                  {sitter.badges.length > 4 && (
                    <Badge variant="secondary" className="rounded-full text-xs px-2 py-0.5 bg-secondary/80">
                      +{sitter.badges.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price and CTAs */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-border/50">
                <div className="text-right">
                  <span className="text-2xl font-semibold text-foreground">${sitter.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">/hr</span>
                </div>
                <div className="flex sm:flex-col gap-2">
                  <Button 
                    className="rounded-xl px-4 transition-all hover:shadow-lg hover:shadow-primary/20"
                    disabled={!sitter.available}
                    asChild={sitter.available}
                  >
                    {sitter.available ? (
                      <Link href={`/sitters/${sitter.id}`}>View Profile</Link>
                    ) : (
                      "Unavailable"
                    )}
                  </Button>
                  {sitter.available && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-xl"
                      asChild
                    >
                      <Link href={`/messages?sitter=${sitter.id}`}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view layout (default)
  return (
    <Card className="group relative bg-card border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Image/Avatar area */}
        <div className="relative h-48 bg-gradient-to-br from-accent/30 to-secondary flex items-center justify-center">
          <span className="text-6xl transition-transform group-hover:scale-110 duration-300">{sitter.avatar}</span>
          
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all hover:scale-110 shadow-sm"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }`}
            />
          </button>

          {/* Availability badge */}
          {sitter.available ? (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-500 text-white border-0 rounded-full px-3 py-1 text-xs font-medium shadow-sm flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Available Now
              </Badge>
            </div>
          ) : (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                Unavailable
              </Badge>
            </div>
          )}

          {/* Trust score badge */}
          <div className="absolute bottom-3 right-3">
            <Badge className={`${getTrustScoreColor(sitter.trustScore)} border-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm`}>
              <Shield className="h-3 w-3 mr-1" />
              {sitter.trustScore}% Trust
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name and verification */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-semibold text-foreground text-lg truncate">{sitter.name}</h3>
              {sitter.verified && (
                <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
              )}
            </div>
          </div>

          {/* Rating and distance */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-foreground">{sitter.rating}</span>
              <span className="text-sm text-muted-foreground">({sitter.reviews})</span>
            </div>
            <span className="text-muted-foreground/50">|</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{sitter.distance}</span>
            </div>
          </div>

          {/* Experience and response time */}
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{sitter.experience}</span>
            </div>
            <span className="text-muted-foreground/50">|</span>
            <span className="truncate">Responds {sitter.responseTime}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {sitter.badges.slice(0, 3).map((badge) => (
              <Badge 
                key={badge} 
                variant="secondary" 
                className="rounded-full text-xs px-2.5 py-0.5 bg-secondary/80"
              >
                {badge}
              </Badge>
            ))}
            {sitter.badges.length > 3 && (
              <Badge variant="secondary" className="rounded-full text-xs px-2.5 py-0.5 bg-secondary/80">
                +{sitter.badges.length - 3}
              </Badge>
            )}
          </div>

          {/* Bio preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-5">
            {sitter.bio}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <span className="text-2xl font-semibold text-foreground">${sitter.hourlyRate}</span>
              <span className="text-sm text-muted-foreground">/hr</span>
            </div>
            <Button 
              className="rounded-xl px-5 transition-all hover:shadow-lg hover:shadow-primary/20"
              disabled={!sitter.available}
              asChild={sitter.available}
            >
              {sitter.available ? (
                <Link href={`/sitters/${sitter.id}`}>View Profile</Link>
              ) : (
                "Unavailable"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
