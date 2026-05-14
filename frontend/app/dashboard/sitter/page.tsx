"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MessageCircle,
  DollarSign,
  Clock,
  Star,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BadgeCheck,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Edit,
  ArrowUp,
  ArrowDown,
  Zap,
  Target,
  Award,
  Eye
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoConversations, sitters } from "@/lib/data"

// Stat card with trend
function StatCardWithTrend({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendValue,
  color = "primary" 
}: { 
  icon: React.ElementType
  value: string | number
  label: string
  trend: "up" | "down" | "neutral"
  trendValue: string
  color?: "primary" | "green" | "yellow" | "purple"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600"
  }
  
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground"
  }
  
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={`h-10 w-10 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColors[trend]}`}>
            {trend === "up" && <ArrowUp className="h-3 w-3" />}
            {trend === "down" && <ArrowDown className="h-3 w-3" />}
            {trendValue}
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Insight card
function InsightCard({ 
  icon: Icon, 
  title, 
  description, 
  action,
  color = "primary" 
}: { 
  icon: React.ElementType
  title: string
  description: string
  action?: { label: string; href: string }
  color?: "primary" | "green" | "yellow"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200"
  }
  
  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-sm">{title}</p>
          <p className="text-sm opacity-80 mt-1">{description}</p>
          {action && (
            <Link 
              href={action.href}
              className="inline-flex items-center gap-1 text-sm font-medium mt-2 hover:underline"
            >
              {action.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// Booking request card
function BookingRequestCard({
  request,
  onAccept,
  onDecline
}: {
  request: {
    id: string
    parentName: string
    parentAvatar: string
    date: string
    time: string
    hours: number
    children: { name: string; age: number }[]
    totalEarning: number
    status: string
  }
  onAccept: () => void
  onDecline: () => void
}) {
  return (
    <div className="p-5 border border-border rounded-xl hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{request.parentAvatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg">{request.parentName}</h3>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Date & Time</p>
              <p className="font-medium mt-1">{request.date}</p>
              <p className="text-sm text-muted-foreground">{request.time}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Children</p>
              {request.children.map((child, idx) => (
                <p key={idx} className="text-sm mt-1">{child.name}, {child.age} years old</p>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-3xl font-semibold text-foreground">${request.totalEarning}</p>
          <p className="text-sm text-muted-foreground">{request.hours} hours</p>
        </div>
      </div>
      <div className="flex gap-3 mt-5 justify-end">
        <Button variant="outline" className="rounded-full" onClick={onDecline}>
          <XCircle className="h-4 w-4 mr-2" />
          Decline
        </Button>
        <Button className="rounded-full shadow-lg shadow-primary/20" onClick={onAccept}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Accept Booking
        </Button>
      </div>
    </div>
  )
}

// Performance metric
function PerformanceMetric({ label, value, max, color = "primary" }: {
  label: string
  value: number
  max: number
  color?: "primary" | "green" | "yellow"
}) {
  const percentage = (value / max) * 100
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/{max}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

export default function SitterDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Demo sitter data (using Emma's profile)
  const currentSitter = sitters[0]
  
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: "br1",
      parentName: "Jennifer Martinez",
      parentAvatar: "woman_with_baby",
      date: "Feb 20, 2024",
      time: "6:00 PM - 10:00 PM",
      hours: 4,
      children: [{ name: "Lily", age: 4 }, { name: "Jake", age: 7 }],
      totalEarning: 96,
      status: "pending",
    },
    {
      id: "br2",
      parentName: "Robert Chen",
      parentAvatar: "man_with_child",
      date: "Feb 22, 2024",
      time: "2:00 PM - 6:00 PM",
      hours: 4,
      children: [{ name: "Emily", age: 5 }],
      totalEarning: 96,
      status: "pending",
    },
  ])

  const confirmedBookings = [
    {
      id: "cb1",
      parentName: "Sarah Williams",
      parentAvatar: "woman_office",
      date: "Feb 18, 2024",
      time: "7:00 PM - 11:00 PM",
      hours: 4,
      children: [{ name: "Noah", age: 3 }],
      totalEarning: 96,
      address: "123 Main St, Brooklyn",
    },
  ]

  const earnings = {
    thisWeek: 288,
    thisMonth: 1152,
    pending: 192,
    total: 8640,
    weeklyChange: "+12%",
    monthlyChange: "+8%"
  }

  const [availability, setAvailability] = useState({
    weekdays: true,
    weekends: true,
    evenings: true,
    overnight: false,
  })

  const handleAccept = (id: string) => {
    setBookingRequests(prev => prev.filter(r => r.id !== id))
  }

  const handleDecline = (id: string) => {
    setBookingRequests(prev => prev.filter(r => r.id !== id))
  }

  // Performance data
  const performance = {
    responseRate: 95,
    acceptanceRate: 88,
    completionRate: 100,
    repeatClients: 12
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif text-foreground">
                Welcome back, {currentSitter.name.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your bookings and grow your profile
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href={`/sitters/${currentSitter.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
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
                    <div className="relative inline-block">
                      <div className="h-20 w-20 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-2">
                        <span className="text-4xl">{currentSitter.avatar}</span>
                      </div>
                      <BadgeCheck className="absolute bottom-2 right-0 h-6 w-6 text-primary bg-background rounded-full" />
                    </div>
                    <h2 className="font-semibold text-foreground">{currentSitter.name}</h2>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{currentSitter.rating} ({currentSitter.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Trust score */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-green-700">Trust Score</p>
                      <Badge className="bg-green-600 text-white border-0">Excellent</Badge>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{currentSitter.trustScore}%</p>
                    <Progress value={currentSitter.trustScore} className="h-2 mt-2" />
                  </div>

                  {/* Profile views */}
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-6">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Profile Views</p>
                      <p className="text-xs text-muted-foreground">127 this week (+23%)</p>
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
                  <TabsTrigger value="requests" className="rounded-lg">
                    Requests
                    {bookingRequests.length > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground text-xs h-5 w-5 p-0 flex items-center justify-center">
                        {bookingRequests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="rounded-lg">Earnings</TabsTrigger>
                  <TabsTrigger value="availability" className="rounded-lg">Availability</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCardWithTrend 
                      icon={Clock} 
                      value={bookingRequests.length} 
                      label="Pending Requests" 
                      trend="up" 
                      trendValue="+2"
                      color="yellow"
                    />
                    <StatCardWithTrend 
                      icon={Calendar} 
                      value={confirmedBookings.length} 
                      label="Upcoming Bookings" 
                      trend="neutral" 
                      trendValue="Same"
                      color="green"
                    />
                    <StatCardWithTrend 
                      icon={DollarSign} 
                      value={`$${earnings.thisWeek}`} 
                      label="This Week" 
                      trend="up" 
                      trendValue={earnings.weeklyChange}
                      color="primary"
                    />
                    <StatCardWithTrend 
                      icon={Users} 
                      value={currentSitter.reviews} 
                      label="Total Reviews" 
                      trend="up" 
                      trendValue="+3"
                      color="purple"
                    />
                  </div>

                  {/* Insights */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InsightCard
                      icon={Zap}
                      title="Quick Response Bonus"
                      description="Respond within 30 minutes to earn bonus visibility in search results."
                      action={{ label: "View messages", href: "/messages" }}
                      color="yellow"
                    />
                    <InsightCard
                      icon={Target}
                      title="Profile Completeness"
                      description="Add more photos and certifications to increase your booking rate by 40%."
                      action={{ label: "Edit profile", href: `/sitters/${currentSitter.id}` }}
                      color="primary"
                    />
                  </div>

                  {/* Booking requests */}
                  {bookingRequests.length > 0 && (
                    <Card className="border-yellow-200 bg-yellow-50/30">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          New Booking Requests
                        </CardTitle>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
                          {bookingRequests.length} pending
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {bookingRequests.slice(0, 2).map((request) => (
                            <BookingRequestCard
                              key={request.id}
                              request={request}
                              onAccept={() => handleAccept(request.id)}
                              onDecline={() => handleDecline(request.id)}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Upcoming bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {confirmedBookings.length > 0 ? (
                        <div className="space-y-4">
                          {confirmedBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                              <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center">
                                <span className="text-xl">{booking.parentAvatar}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">{booking.parentName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.date} | {booking.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.address}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${booking.totalEarning}</p>
                                <Button size="sm" variant="outline" className="mt-2 rounded-full" asChild>
                                  <Link href="/messages">Message</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No upcoming bookings</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Requests Tab */}
                <TabsContent value="requests">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {bookingRequests.length > 0 ? (
                        <div className="space-y-4">
                          {bookingRequests.map((request) => (
                            <BookingRequestCard
                              key={request.id}
                              request={request}
                              onAccept={() => handleAccept(request.id)}
                              onDecline={() => handleDecline(request.id)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No pending requests</p>
                          <p className="text-sm text-muted-foreground mt-1">New requests will appear here</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Earnings Tab */}
                <TabsContent value="earnings" className="space-y-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-sm text-muted-foreground mb-2">This Week</p>
                        <p className="text-3xl font-semibold">${earnings.thisWeek}</p>
                        <p className="text-sm text-green-600 mt-1">{earnings.weeklyChange}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-sm text-muted-foreground mb-2">This Month</p>
                        <p className="text-3xl font-semibold">${earnings.thisMonth}</p>
                        <p className="text-sm text-green-600 mt-1">{earnings.monthlyChange}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Pending</p>
                        <p className="text-3xl font-semibold text-yellow-600">${earnings.pending}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                      <CardContent className="p-5 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
                        <p className="text-3xl font-semibold text-primary">${earnings.total}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <PerformanceMetric label="Response Rate" value={performance.responseRate} max={100} />
                      <PerformanceMetric label="Acceptance Rate" value={performance.acceptanceRate} max={100} />
                      <PerformanceMetric label="Completion Rate" value={performance.completionRate} max={100} />
                      
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Repeat Clients</p>
                            <p className="text-sm text-muted-foreground">Families who&apos;ve booked you multiple times</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold">{performance.repeatClients}</p>
                            <p className="text-sm text-green-600">+3 this month</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Earnings insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        Earnings Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <InsightCard
                        icon={Zap}
                        title="Peak Hours"
                        description="Your most profitable hours are Friday and Saturday evenings. Consider opening more weekend slots."
                        color="green"
                      />
                      <InsightCard
                        icon={Target}
                        title="Rate Recommendation"
                        description="Based on your experience and reviews, you could increase your rate by $2-3/hour and remain competitive."
                        color="primary"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability">
                  <Card>
                    <CardHeader>
                      <CardTitle>Set Your Availability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground">
                        Toggle your availability to let families know when you&apos;re available to work.
                      </p>

                      <div className="space-y-4">
                        {[
                          { key: "weekdays", label: "Weekdays", description: "Monday through Friday" },
                          { key: "weekends", label: "Weekends", description: "Saturday and Sunday" },
                          { key: "evenings", label: "Evenings", description: "After 6:00 PM" },
                          { key: "overnight", label: "Overnight", description: "Extended stays" },
                        ].map((option) => (
                          <div 
                            key={option.key}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                              availability[option.key as keyof typeof availability]
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <div>
                              <Label htmlFor={option.key} className="font-medium cursor-pointer">
                                {option.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                            <Switch
                              id={option.key}
                              checked={availability[option.key as keyof typeof availability]}
                              onCheckedChange={(checked) => 
                                setAvailability(prev => ({ ...prev, [option.key]: checked }))
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Tip: Sitters who are available on weekends and evenings tend to get 40% more bookings.
                        </p>
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
