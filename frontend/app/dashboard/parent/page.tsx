"use client"
export const dynamic = "force-dynamic"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MessageCircle,
  Heart,
  Clock,
  Star,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  BadgeCheck,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  AlertCircle,
  User,
  Plus,
  MapPin,
  X
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoBookings, demoConversations, sitters, type Booking } from "@/lib/data"

// Booking success banner
function SuccessBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-4">
      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-5 w-5 text-green-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-green-800">Booking Confirmed!</h3>
        <p className="text-sm text-green-700 mt-1">
          Your booking has been successfully created. You&apos;ll receive a confirmation email shortly.
        </p>
      </div>
      <button onClick={onDismiss} className="text-green-600 hover:text-green-800">
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

// Notification item component
function NotificationItem({
  icon: Icon,
  title,
  description,
  time,
  isNew
}: {
  icon: React.ElementType
  title: string
  description: string
  time: string
  isNew?: boolean
}) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${isNew ? "bg-primary/5" : "hover:bg-secondary/50"}`}>
      <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${isNew ? "bg-primary/10" : "bg-secondary"}`}>
        <Icon className={`h-4 w-4 ${isNew ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm ${isNew ? "font-medium text-foreground" : "text-foreground"}`}>{title}</p>
          {isNew && <span className="h-2 w-2 rounded-full bg-primary" />}
        </div>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
    </div>
  )
}

// Activity timeline item
function ActivityItem({
  type,
  content,
  time
}: {
  type: "booking" | "message" | "review" | "payment"
  content: string
  time: string
}) {
  const getIcon = () => {
    switch (type) {
      case "booking": return Calendar
      case "message": return MessageCircle
      case "review": return Star
      case "payment": return DollarSign
      default: return CheckCircle
    }
  }

  const getColor = () => {
    switch (type) {
      case "booking": return "bg-green-100 text-green-600"
      case "message": return "bg-blue-100 text-blue-600"
      case "review": return "bg-yellow-100 text-yellow-600"
      case "payment": return "bg-purple-100 text-purple-600"
      default: return "bg-secondary text-muted-foreground"
    }
  }

  const Icon = getIcon()

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getColor()}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="w-px h-full bg-border flex-1 mt-2" />
      </div>
      <div className="pb-6">
        <p className="text-sm text-foreground">{content}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

// Booking card component
function BookingCard({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700"
      case "pending": return "bg-yellow-100 text-yellow-700"
      case "completed": return "bg-secondary text-secondary-foreground"
      case "cancelled": return "bg-red-100 text-red-700"
      default: return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return CheckCircle
      case "pending": return Clock
      case "completed": return CheckCircle
      case "cancelled": return XCircle
      default: return AlertCircle
    }
  }

  const StatusIcon = getStatusIcon(booking.status)

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
        <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{booking.sitterAvatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground truncate">{booking.sitterName}</p>
            <Badge className={`${getStatusColor(booking.status)} border-0 text-xs`}>
              {booking.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} | {booking.startTime} - {booking.endTime}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-semibold">${booking.totalCost}</p>
          <p className="text-xs text-muted-foreground">{booking.hours}h</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 p-5 border border-border rounded-xl hover:shadow-md transition-shadow">
      <div className="h-14 w-14 rounded-xl bg-accent/50 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">{booking.sitterAvatar}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-foreground">{booking.sitterName}</p>
          <Badge className={`${getStatusColor(booking.status)} border-0 text-xs flex items-center gap-1`}>
            <StatusIcon className="h-3 w-3" />
            {booking.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <p className="text-sm text-muted-foreground">
          {booking.startTime} - {booking.endTime} ({booking.hours} hours)
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {booking.children.map(c => `${c.name} (${c.age})`).join(", ")}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-lg">${booking.totalCost}</p>
        <p className="text-sm text-muted-foreground">{booking.hours} hours</p>
        {booking.status === "confirmed" && (
          <Button size="sm" variant="outline" className="mt-2 rounded-full" asChild>
            <Link href="/messages">Message</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

function BookingSuccessHandler({
  setShowSuccessBanner,
}: {
  setShowSuccessBanner: (value: boolean) => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("booking") === "success") {
      setShowSuccessBanner(true)
    }
  }, [searchParams, setShowSuccessBanner])

  return null
}


export default function ParentDashboardPage() {

  const [activeTab, setActiveTab] = useState("overview")
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)



  // Demo user data
  const user = {
    name: "Sarah",
    avatar: "woman_with_children",
    email: "sarah@example.com",
    memberSince: "January 2024",
    children: [
      { name: "Sophie", age: 5 },
      { name: "Max", age: 3 },
    ],
  }

  const savedSitters = sitters.slice(0, 3)
  const upcomingBookings = demoBookings.filter(b => b.status === "confirmed" || b.status === "pending")
  const pastBookings = demoBookings.filter(b => b.status === "completed")

  // Demo notifications
  const notifications = [
    {
      icon: CheckCircle,
      title: "Booking Confirmed",
      description: "Emma Thompson accepted your booking request",
      time: "2h ago",
      isNew: true
    },
    {
      icon: MessageCircle,
      title: "New Message",
      description: "Michael Chen sent you a message",
      time: "5h ago",
      isNew: true
    },
    {
      icon: Star,
      title: "Leave a Review",
      description: "How was your experience with Sofia Rodriguez?",
      time: "1d ago",
      isNew: false
    },
  ]

  // Demo activity
  const recentActivity = [
    { type: "booking" as const, content: "Booked Emma Thompson for Feb 15", time: "Today at 2:30 PM" },
    { type: "message" as const, content: "Sent message to Michael Chen", time: "Today at 10:15 AM" },
    { type: "payment" as const, content: "Payment of $208 completed", time: "Yesterday at 6:00 PM" },
    { type: "review" as const, content: "Left a 5-star review for Sofia", time: "Jan 28 at 8:30 AM" },
  ]

  // Stats
  const stats = {
    totalBookings: 12,
    totalSpent: 1248,
    avgRating: 4.9,
    hoursBooked: 52
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <Suspense fallback={null}>
          <BookingSuccessHandler
            setShowSuccessBanner={setShowSuccessBanner}
          />
        </Suspense>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Success banner */}
          {showSuccessBanner && (
            <SuccessBanner onDismiss={() => setShowSuccessBanner(false)} />
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif text-foreground">
                Welcome back, {user.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your bookings and connect with sitters
              </p>
            </div>
            <Button className="rounded-full shadow-lg shadow-primary/20" asChild>
              <Link href="/discover">
                <Search className="h-4 w-4 mr-2" />
                Find a Sitter
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* Profile */}
                  <div className="text-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="font-semibold text-foreground">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Member since {user.memberSince}</p>
                  </div>

                  {/* Children */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-muted-foreground">Your Children</h3>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {user.children.map((child, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-accent/50 flex items-center justify-center">
                              <span className="text-sm">S</span>
                            </div>
                            <span className="text-sm font-medium">{child.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs rounded-full">{child.age} yrs</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start h-10" asChild>
                      <Link href="/messages">
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Messages
                        {demoConversations.reduce((acc, c) => acc + c.unread, 0) > 0 && (
                          <Badge className="ml-auto bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {demoConversations.reduce((acc, c) => acc + c.unread, 0)}
                          </Badge>
                        )}
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-10">
                      <Bell className="h-4 w-4 mr-3" />
                      Notifications
                      <Badge className="ml-auto bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">2</Badge>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-10">
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-3" />
                      Log out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start rounded-xl bg-secondary/50 p-1 mb-6">
                  <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                  <TabsTrigger value="bookings" className="rounded-lg">Bookings</TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-lg">Saved Sitters</TabsTrigger>
                  <TabsTrigger value="activity" className="rounded-lg">Activity</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{upcomingBookings.length}</p>
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-foreground" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{savedSitters.length}</p>
                            <p className="text-sm text-muted-foreground">Saved</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{stats.totalBookings}</p>
                            <p className="text-sm text-muted-foreground">Total Bookings</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{stats.hoursBooked}h</p>
                            <p className="text-sm text-muted-foreground">Hours Booked</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Upcoming bookings */}
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
                          <Button variant="ghost" size="sm" onClick={() => setActiveTab("bookings")}>
                            View all <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          {upcomingBookings.length > 0 ? (
                            <div className="space-y-3">
                              {upcomingBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} compact />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                              <Button className="rounded-full" asChild>
                                <Link href="/discover">Find a Sitter</Link>
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Notifications */}
                    <div className="lg:col-span-1">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg">Notifications</CardTitle>
                          <Badge variant="secondary" className="rounded-full">
                            {notifications.filter(n => n.isNew).length} new
                          </Badge>
                        </CardHeader>
                        <CardContent className="space-y-1">
                          {notifications.map((notif, i) => (
                            <NotificationItem key={i} {...notif} />
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Recent messages */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Recent Messages</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/messages">
                          View all <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {demoConversations.slice(0, 3).map((conv) => {
                          const other = conv.participants.find(p => p.id !== "parent1")
                          return (
                            <Link
                              key={conv.id}
                              href="/messages"
                              className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                            >
                              <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
                                <span className="text-lg">{other?.avatar}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">{other?.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                              </div>
                              {conv.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground">
                                  {conv.unread}
                                </Badge>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Bookings Tab */}
                <TabsContent value="bookings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...upcomingBookings, ...pastBookings].map((booking) => (
                          <BookingCard key={booking.id} booking={booking} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Saved Sitters Tab */}
                <TabsContent value="saved">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedSitters.map((sitter) => (
                      <Card key={sitter.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="h-24 bg-gradient-to-br from-accent/30 to-secondary flex items-center justify-center">
                            <span className="text-4xl">{sitter.avatar}</span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{sitter.name}</h3>
                              {sitter.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{sitter.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{sitter.rating}</span>
                              <span>|</span>
                              <span>${sitter.hourlyRate}/hr</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 rounded-full" asChild>
                                <Link href={`/booking/${sitter.id}`}>Book</Link>
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 rounded-full" asChild>
                                <Link href={`/sitters/${sitter.id}`}>View</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-0">
                        {recentActivity.map((activity, i) => (
                          <ActivityItem key={i} {...activity} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
