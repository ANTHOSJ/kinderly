"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  BadgeCheck, 
  Heart,
  MessageCircle,
  Calendar,
  ArrowLeft,
  Globe,
  Award,
  ThumbsUp,
  CheckCircle,
  Languages
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSitterById, getReviewsBySitterId } from "@/lib/data"

export default function SitterProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const sitter = getSitterById(id)
  const reviews = getReviewsBySitterId(id)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!sitter) {
    notFound()
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return "bg-green-100 text-green-700"
    if (score >= 85) return "bg-primary/10 text-primary"
    return "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href="/discover"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile header */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary" />
                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="flex flex-col sm:flex-row gap-6 -mt-16">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="h-32 w-32 rounded-2xl bg-card border-4 border-background shadow-xl flex items-center justify-center">
                        <span className="text-6xl">{sitter.avatar}</span>
                      </div>
                      {sitter.available && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                          <Badge className="bg-green-500 text-white border-0 rounded-full shadow-lg">
                            Available
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 sm:pt-16">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h1 className="text-2xl font-semibold text-foreground">{sitter.name}</h1>
                        {sitter.verified && (
                          <BadgeCheck className="h-6 w-6 text-primary" />
                        )}
                        <Badge className={`${getTrustScoreColor(sitter.trustScore)} border-0 rounded-full`}>
                          <Shield className="h-3 w-3 mr-1" />
                          {sitter.trustScore}% Trust
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{sitter.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Responds {sitter.responseTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{sitter.rating}</span>
                          <span className="text-muted-foreground">({sitter.reviews} reviews)</span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-muted-foreground">{sitter.experience} experience</span>
                      </div>
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all shadow-lg"
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start rounded-xl bg-secondary/50 p-1">
                  <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
                  <TabsTrigger value="availability" className="rounded-lg">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  {/* Bio */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{sitter.bio}</p>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sitter.certifications.map((cert, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuer} | {cert.year}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills & Specialties */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sitter.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="rounded-full px-3 py-1">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Languages className="h-5 w-5 text-primary" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sitter.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="rounded-full px-3 py-1">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{sitter.education}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Reviews</CardTitle>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{sitter.rating}</span>
                          <span className="text-muted-foreground">({sitter.reviews} reviews)</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {reviews.length > 0 ? reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
                              <span className="text-lg">{review.parentAvatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-medium text-foreground">{review.parentName}</p>
                                  <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">{review.content}</p>
                              <button className="flex items-center gap-1 text-sm text-muted-foreground mt-3 hover:text-foreground">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-muted-foreground text-center py-8">No reviews yet</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weekly Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${sitter.availability.weekdays ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
                          <p className="font-medium text-foreground">Weekdays</p>
                          <p className="text-sm text-muted-foreground">
                            {sitter.availability.weekdays ? "Available" : "Not available"}
                          </p>
                        </div>
                        <div className={`p-4 rounded-xl ${sitter.availability.weekends ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
                          <p className="font-medium text-foreground">Weekends</p>
                          <p className="text-sm text-muted-foreground">
                            {sitter.availability.weekends ? "Available" : "Not available"}
                          </p>
                        </div>
                        <div className={`p-4 rounded-xl ${sitter.availability.evenings ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
                          <p className="font-medium text-foreground">Evenings</p>
                          <p className="text-sm text-muted-foreground">
                            {sitter.availability.evenings ? "Available" : "Not available"}
                          </p>
                        </div>
                        <div className={`p-4 rounded-xl ${sitter.availability.overnight ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
                          <p className="font-medium text-foreground">Overnight</p>
                          <p className="text-sm text-muted-foreground">
                            {sitter.availability.overnight ? "Available" : "Not available"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-semibold text-foreground">${sitter.hourlyRate}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button 
                        className="w-full h-12 rounded-xl text-base"
                        asChild
                      >
                        <Link href={`/booking/${sitter.id}`}>
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Now
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 rounded-xl text-base"
                        asChild
                      >
                        <Link href={`/messages?sitter=${sitter.id}`}>
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Message
                        </Link>
                      </Button>
                    </div>

                    <div className="border-t border-border pt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-muted-foreground">Background checked</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-muted-foreground">Identity verified</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-muted-foreground">References checked</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick stats */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-semibold text-foreground">{sitter.reviews}</p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-foreground">{sitter.experienceYears}</p>
                        <p className="text-xs text-muted-foreground">Years Exp.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
