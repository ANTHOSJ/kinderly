"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  Award,
  ThumbsUp,
  CheckCircle,
  Languages,
  Briefcase,
  GraduationCap,
  Users,
  Share2,
  Flag,
  ChevronRight,
  Quote
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSitterById, getReviewsBySitterId, type Review } from "@/lib/data"

// Review card component
function ReviewCard({ review, sitterName }: { review: Review; sitterName: string }) {
  const [isHelpful, setIsHelpful] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(review.helpful)
  
  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true)
      setHelpfulCount(prev => prev + 1)
    }
  }
  
  return (
    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{review.parentAvatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <p className="font-medium text-foreground">{review.parentName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{review.content}</p>
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={handleHelpful}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                isHelpful 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ThumbsUp className={`h-4 w-4 ${isHelpful ? "fill-primary" : ""}`} />
              Helpful ({helpfulCount})
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Flag className="h-4 w-4" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Trust metrics component
function TrustMetrics({ trustScore, verified }: { trustScore: number; verified: boolean }) {
  const metrics = [
    { label: "Background Check", verified: true },
    { label: "Identity Verified", verified: true },
    { label: "References Checked", verified: verified },
    { label: "Phone Verified", verified: true },
  ]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-500" />
          Trust & Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-4xl font-bold text-green-600 mb-1">{trustScore}%</p>
          <p className="text-sm text-green-700">Trust Score</p>
          <Progress value={trustScore} className="h-2 mt-3" />
        </div>
        
        <div className="space-y-3 pt-2">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-3">
              {metric.verified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
              )}
              <span className={`text-sm ${metric.verified ? "text-foreground" : "text-muted-foreground"}`}>
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Stats card component
function StatsCard({ icon: Icon, value, label, color = "primary" }: { 
  icon: React.ElementType
  value: string | number
  label: string
  color?: "primary" | "yellow" | "green"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600"
  }
  
  return (
    <div className="text-center p-4 rounded-xl bg-secondary/30">
      <div className={`h-10 w-10 rounded-xl ${colorClasses[color]} flex items-center justify-center mx-auto mb-2`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

// Availability calendar component
function AvailabilityCalendar({ availability }: { 
  availability: {
    weekdays: boolean
    weekends: boolean
    evenings: boolean
    overnight: boolean
  }
}) {
  const days = [
    { label: "Mon", available: availability.weekdays },
    { label: "Tue", available: availability.weekdays },
    { label: "Wed", available: availability.weekdays },
    { label: "Thu", available: availability.weekdays },
    { label: "Fri", available: availability.weekdays },
    { label: "Sat", available: availability.weekends },
    { label: "Sun", available: availability.weekends },
  ]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Week view */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((day, i) => (
            <div 
              key={i}
              className={`text-center p-3 rounded-xl transition-colors ${
                day.available 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-secondary/50"
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground mb-1">{day.label}</p>
              <div className={`h-2 w-2 rounded-full mx-auto ${
                day.available ? "bg-green-500" : "bg-muted-foreground/30"
              }`} />
            </div>
          ))}
        </div>
        
        {/* Time slots */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl ${availability.weekdays ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
            <p className="font-medium text-sm text-foreground">Weekdays</p>
            <p className="text-xs text-muted-foreground">
              {availability.weekdays ? "Available" : "Not available"}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${availability.weekends ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
            <p className="font-medium text-sm text-foreground">Weekends</p>
            <p className="text-xs text-muted-foreground">
              {availability.weekends ? "Available" : "Not available"}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${availability.evenings ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
            <p className="font-medium text-sm text-foreground">Evenings</p>
            <p className="text-xs text-muted-foreground">
              {availability.evenings ? "After 6 PM" : "Not available"}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${availability.overnight ? "bg-green-50 border border-green-200" : "bg-secondary"}`}>
            <p className="font-medium text-sm text-foreground">Overnight</p>
            <p className="text-xs text-muted-foreground">
              {availability.overnight ? "Available" : "Not available"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Featured testimonial component
function FeaturedTestimonial({ review }: { review: Review }) {
  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <p className="text-foreground leading-relaxed italic mb-4">
          &quot;{review.content}&quot;
        </p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
            <span className="text-lg">{review.parentAvatar}</span>
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{review.parentName}</p>
            <div className="flex items-center gap-0.5">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

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

  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? Math.round((reviews.filter(r => r.rating === rating).length / reviews.length) * 100)
      : 0
  }))

  const featuredReview = reviews.find(r => r.rating === 5) || reviews[0]

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
                          <Badge className="bg-green-500 text-white border-0 rounded-full shadow-lg px-3 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
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
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{sitter.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>Responds {sitter.responseTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-lg">{sitter.rating}</span>
                          <span className="text-muted-foreground">({sitter.reviews} reviews)</span>
                        </div>
                        <Separator orientation="vertical" className="h-5" />
                        <span className="text-muted-foreground">{sitter.experience} experience</span>
                      </div>
                    </div>

                    {/* Action buttons (top right) */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors ${
                            isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
                      >
                        <Share2 className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatsCard icon={Star} value={sitter.rating} label="Rating" color="yellow" />
                <StatsCard icon={Users} value={sitter.reviews} label="Reviews" />
                <StatsCard icon={Briefcase} value={`${sitter.experienceYears}+`} label="Years Exp" />
                <StatsCard icon={Clock} value={sitter.responseTime.replace("within ", "")} label="Response" color="green" />
              </div>

              {/* Featured testimonial */}
              {featuredReview && <FeaturedTestimonial review={featuredReview} />}

              {/* Tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start rounded-xl bg-secondary/50 p-1 h-auto flex-wrap">
                  <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg">
                    Reviews ({sitter.reviews})
                  </TabsTrigger>
                  <TabsTrigger value="credentials" className="rounded-lg">Credentials</TabsTrigger>
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

                  {/* Skills & Specialties */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sitter.specialties.map((specialty) => (
                          <Badge 
                            key={specialty} 
                            variant="secondary" 
                            className="rounded-full px-4 py-1.5 text-sm"
                          >
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
                          <Badge key={lang} variant="outline" className="rounded-full px-4 py-1.5">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{sitter.education}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-6">
                  {/* Rating summary */}
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg">Rating Summary</CardTitle>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold text-foreground">{sitter.rating}</span>
                          <div>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.round(sitter.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{sitter.reviews} reviews</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {ratingBreakdown.map((item) => (
                          <div key={item.rating} className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground w-4">{item.rating}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Progress value={item.percentage} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews list */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Parent Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {reviews.length > 0 ? reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} sitterName={sitter.name} />
                      )) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                        </div>
                      )}
                      
                      {reviews.length > 0 && (
                        <Button variant="outline" className="w-full rounded-xl">
                          Load More Reviews
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="credentials" className="mt-6 space-y-6">
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
                          <div key={idx} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
                            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuer} | Certified {cert.year}
                              </p>
                            </div>
                            <Badge variant="secondary" className="rounded-full">Verified</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trust metrics */}
                  <TrustMetrics trustScore={sitter.trustScore} verified={sitter.verified} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Booking card */}
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-semibold text-foreground">${sitter.hourlyRate}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Service fee applies
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button 
                        className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/20"
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
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-muted-foreground">$1M liability coverage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability calendar */}
                <AvailabilityCalendar availability={sitter.availability} />

                {/* Response time card */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">Response Time</p>
                        <p className="text-sm text-muted-foreground">Usually responds {sitter.responseTime}</p>
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
