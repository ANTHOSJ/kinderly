import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { testimonials, sitters, reviews } from "@/lib/data"
import {
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  Users,
  Heart,
  ThumbsUp,
  MessageCircle,
  MapPin
} from "lucide-react"

export const metadata: Metadata = {
  title: "Reviews & Testimonials | Kinderly",
  description: "Read real reviews from families and babysitters who trust Kinderly. See why thousands choose us for their childcare needs.",
}

// Calculate overall stats
const totalReviews = sitters.reduce((acc, s) => acc + s.reviews, 0)
const avgRating = (sitters.reduce((acc, s) => acc + s.rating, 0) / sitters.length).toFixed(1)
const fiveStarPercentage = Math.round(
  (reviews.filter(r => r.rating === 5).length / reviews.length) * 100
)

const stats = [
  { value: `${totalReviews.toLocaleString()}+`, label: "Verified Reviews", icon: MessageCircle },
  { value: avgRating, label: "Average Rating", icon: Star },
  { value: `${fiveStarPercentage}%`, label: "5-Star Reviews", icon: ThumbsUp },
  { value: "50K+", label: "Happy Families", icon: Heart },
]

const ratingBreakdown = [
  { stars: 5, percentage: 78, count: 8450 },
  { stars: 4, percentage: 15, count: 1623 },
  { stars: 3, percentage: 5, count: 540 },
  { stars: 2, percentage: 1, count: 108 },
  { stars: 1, percentage: 1, count: 108 },
]

function FeaturedTestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <CardContent className="p-6 sm:p-8 h-full flex flex-col">
        <Quote className="h-10 w-10 text-primary/20 mb-4" />
        
        <p className="text-foreground leading-relaxed mb-6 flex-1 text-balance">
          &quot;{testimonial.content}&quot;
        </p>
        
        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center">
            <span className="text-xl">{testimonial.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{testimonial.role}</span>
              {testimonial.isSitter && (
                <Badge variant="secondary" className="rounded-full text-xs px-2 py-0.5">
                  Sitter
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{testimonial.location}</span>
          <span className="mx-1">•</span>
          <span>{testimonial.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const sitter = sitters.find(s => s.id === review.sitterId)
  
  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
              <span className="text-lg">{review.parentAvatar}</span>
            </div>
            <div>
              <p className="font-medium text-foreground">{review.parentName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
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
        
        <p className="text-muted-foreground leading-relaxed mb-4">
          {review.content}
        </p>
        
        {sitter && (
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Review for</span>
              <Link 
                href={`/sitters/${sitter.id}`}
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {sitter.name}
              </Link>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{review.helpful} found helpful</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function StarRatingBar({ stars, percentage, count }: { stars: number; percentage: number; count: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-20">
        <span className="text-sm font-medium text-foreground">{stars}</span>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      </div>
      <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-16 text-right">
        {count.toLocaleString()}
      </span>
    </div>
  )
}

export default function ReviewsPage() {
  const featuredTestimonials = testimonials.filter(t => t.featured)
  const allTestimonials = testimonials
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-6 rounded-full px-4 py-1.5 bg-yellow-100 text-yellow-700 border-0">
                Real Stories, Real Families
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6 text-balance">
                Thousands of families trust Kinderly
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Read authentic reviews and testimonials from the families and babysitters 
                who make Kinderly special. Every review is from a verified booking.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="border-border/50 text-center">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Rating breakdown */}
            <Card className="border-border/50 max-w-2xl mx-auto">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  {/* Overall rating */}
                  <div className="text-center">
                    <p className="text-6xl font-bold text-foreground mb-2">{avgRating}</p>
                    <div className="flex items-center justify-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {totalReviews.toLocaleString()} reviews
                    </p>
                  </div>
                  
                  {/* Rating bars */}
                  <div className="flex-1 w-full space-y-2">
                    {ratingBreakdown.map((item) => (
                      <StarRatingBar 
                        key={item.stars}
                        stars={item.stars}
                        percentage={item.percentage}
                        count={item.count}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-primary/10 text-primary border-0">
                Featured Stories
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                Hear from our community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real experiences from parents and sitters who use Kinderly every day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial) => (
                <FeaturedTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* All Testimonials */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 bg-secondary text-secondary-foreground border-0">
                All Reviews
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                More from our community
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {allTestimonials.filter(t => !t.featured).map((testimonial) => (
                <FeaturedTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* Recent sitter reviews */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                Recent Sitter Reviews
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.slice(0, 6).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Reviews Matter */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 rounded-full px-4 py-1.5 bg-green-100 text-green-700 border-0">
                  Trust & Transparency
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                  Reviews you can trust
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At Kinderly, we believe in complete transparency. Every review on our platform 
                  comes from a verified booking, ensuring you get honest, authentic feedback 
                  from real families.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Verified Bookings Only",
                      description: "Reviews can only be left after a completed booking, ensuring authentic experiences."
                    },
                    {
                      title: "No Fake Reviews",
                      description: "Our team actively monitors and removes any suspicious or fake reviews."
                    },
                    {
                      title: "Balanced Perspective",
                      description: "We show all reviews, both positive and constructive, so you can make informed decisions."
                    },
                    {
                      title: "Response Opportunity",
                      description: "Sitters can respond to reviews, promoting fair and open communication."
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Review Verification Process
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        How we ensure review authenticity
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        "Booking completion verified",
                        "Reviewer identity confirmed",
                        "Review content moderated",
                        "Sitter notified and can respond",
                        "Published to sitter profile"
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-primary">{i + 1}</span>
                          </div>
                          <span className="text-sm text-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/20 to-secondary border-0 overflow-hidden">
              <CardContent className="p-8 sm:p-12 lg:p-16">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
                    Join thousands of happy families
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Experience the peace of mind that comes with finding trusted childcare. 
                    Start your search today and see why families love Kinderly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
                      <Link href="/discover">
                        Find Your Sitter
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                      <Link href="/signup">Create Account</Link>
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
