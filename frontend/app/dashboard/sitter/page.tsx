"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  Edit
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoConversations, sitters } from "@/lib/data"

export default function SitterDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Demo sitter data (using Emma's profile)
  const currentSitter = sitters[0]
  
  const bookingRequests = [
    {
      id: "br1",
      parentName: "Jennifer Martinez",
      parentAvatar: "👩‍👧‍👦",
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
      parentAvatar: "👨‍👧",
      date: "Feb 22, 2024",
      time: "2:00 PM - 6:00 PM",
      hours: 4,
      children: [{ name: "Emily", age: 5 }],
      totalEarning: 96,
      status: "pending",
    },
  ]

  const confirmedBookings = [
    {
      id: "cb1",
      parentName: "Sarah Williams",
      parentAvatar: "👩‍💼",
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
  }

  const [availability, setAvailability] = useState({
    weekdays: true,
    weekends: true,
    evenings: true,
    overnight: false,
  })

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
                  <div className="bg-green-50 rounded-xl p-4 mb-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Trust Score</p>
                    <p className="text-3xl font-semibold text-green-600">{currentSitter.trustScore}%</p>
                  </div>

                  {/* Quick links */}
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/messages">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Messages
                        {demoConversations.reduce((acc, c) => acc + c.unread, 0) > 0 && (
                          <Badge className="ml-auto bg-primary text-primary-foreground">
                            {demoConversations.reduce((acc, c) => acc + c.unread, 0)}
                          </Badge>
                        )}
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-2" />
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
                      <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
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
                  <div className="grid sm:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold">{bookingRequests.length}</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold">{confirmedBookings.length}</p>
                            <p className="text-xs text-muted-foreground">Upcoming</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold">${earnings.thisWeek}</p>
                            <p className="text-xs text-muted-foreground">This Week</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-accent/50 flex items-center justify-center">
                            <Users className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold">{currentSitter.reviews}</p>
                            <p className="text-xs text-muted-foreground">Reviews</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Booking requests */}
                  {bookingRequests.length > 0 && (
                    <Card className="border-yellow-200 bg-yellow-50/30">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          New Booking Requests
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab("requests")}>
                          View all <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {bookingRequests.slice(0, 2).map((request) => (
                            <div key={request.id} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                              <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center">
                                <span className="text-xl">{request.parentAvatar}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">{request.parentName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {request.date} | {request.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {request.children.map(c => `${c.name} (${c.age})`).join(", ")}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${request.totalEarning}</p>
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" className="rounded-full">Accept</Button>
                                  <Button size="sm" variant="outline" className="rounded-full">Decline</Button>
                                </div>
                              </div>
                            </div>
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
                                <Button size="sm" variant="outline" className="mt-2 rounded-full">
                                  Message
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
                            <div key={request.id} className="p-6 border border-border rounded-xl">
                              <div className="flex items-start gap-4">
                                <div className="h-14 w-14 rounded-full bg-accent/50 flex items-center justify-center">
                                  <span className="text-2xl">{request.parentAvatar}</span>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg">{request.parentName}</h3>
                                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Date & Time</p>
                                      <p className="font-medium">{request.date}</p>
                                      <p>{request.time}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Children</p>
                                      {request.children.map((child, idx) => (
                                        <p key={idx}>{child.name} ({child.age} years old)</p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-semibold">${request.totalEarning}</p>
                                  <p className="text-sm text-muted-foreground">{request.hours} hours</p>
                                </div>
                              </div>
                              <div className="flex gap-3 mt-6 justify-end">
                                <Button variant="outline" className="rounded-full">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Decline
                                </Button>
                                <Button className="rounded-full">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Accept Booking
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No pending requests</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Earnings Tab */}
                <TabsContent value="earnings">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">This Week</p>
                        <p className="text-3xl font-semibold">${earnings.thisWeek}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">This Month</p>
                        <p className="text-3xl font-semibold">${earnings.thisMonth}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Pending</p>
                        <p className="text-3xl font-semibold text-yellow-600">${earnings.pending}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
                        <p className="text-3xl font-semibold text-primary">${earnings.total}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        Earnings Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                          <span className="text-muted-foreground">Average hourly rate</span>
                          <span className="font-semibold">${currentSitter.hourlyRate}/hr</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                          <span className="text-muted-foreground">Hours worked this month</span>
                          <span className="font-semibold">{Math.round(earnings.thisMonth / currentSitter.hourlyRate)} hrs</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                          <span className="text-muted-foreground">Repeat families</span>
                          <span className="font-semibold">12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Your Availability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                          <div>
                            <Label className="text-base font-medium">Weekdays</Label>
                            <p className="text-sm text-muted-foreground">Monday - Friday</p>
                          </div>
                          <Switch
                            checked={availability.weekdays}
                            onCheckedChange={(checked) => setAvailability({ ...availability, weekdays: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                          <div>
                            <Label className="text-base font-medium">Weekends</Label>
                            <p className="text-sm text-muted-foreground">Saturday - Sunday</p>
                          </div>
                          <Switch
                            checked={availability.weekends}
                            onCheckedChange={(checked) => setAvailability({ ...availability, weekends: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                          <div>
                            <Label className="text-base font-medium">Evenings</Label>
                            <p className="text-sm text-muted-foreground">After 6:00 PM</p>
                          </div>
                          <Switch
                            checked={availability.evenings}
                            onCheckedChange={(checked) => setAvailability({ ...availability, evenings: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                          <div>
                            <Label className="text-base font-medium">Overnight</Label>
                            <p className="text-sm text-muted-foreground">Extended stays</p>
                          </div>
                          <Switch
                            checked={availability.overnight}
                            onCheckedChange={(checked) => setAvailability({ ...availability, overnight: checked })}
                          />
                        </div>
                      </div>

                      <Button className="w-full rounded-xl">Save Changes</Button>
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
