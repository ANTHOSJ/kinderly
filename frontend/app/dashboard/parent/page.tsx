"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MessageCircle,
  Heart,
  Clock,
  Star,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  BadgeCheck,
  CheckCircle,
  XCircle
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoBookings, demoConversations, sitters } from "@/lib/data"

export default function ParentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Demo user data
  const user = {
    name: "Sarah",
    avatar: "👩‍👧‍👦",
    email: "sarah@example.com",
    children: [
      { name: "Sophie", age: 5 },
      { name: "Max", age: 3 },
    ],
  }

  const savedSitters = sitters.slice(0, 3)
  const upcomingBookings = demoBookings.filter(b => b.status === "confirmed" || b.status === "pending")
  const pastBookings = demoBookings.filter(b => b.status === "completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700"
      case "pending": return "bg-yellow-100 text-yellow-700"
      case "completed": return "bg-secondary text-secondary-foreground"
      case "cancelled": return "bg-red-100 text-red-700"
      default: return "bg-secondary text-secondary-foreground"
    }
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
                Welcome back, {user.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your bookings and connect with sitters
              </p>
            </div>
            <Button className="rounded-full" asChild>
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
                      <span className="text-4xl">{user.avatar}</span>
                    </div>
                    <h2 className="font-semibold text-foreground">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>

                  {/* Children */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Children</h3>
                    <div className="space-y-2">
                      {user.children.map((child, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
                          <span className="text-sm">{child.name}</span>
                          <Badge variant="outline" className="text-xs">{child.age} years</Badge>
                        </div>
                      ))}
                    </div>
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
                  <TabsTrigger value="bookings" className="rounded-lg">Bookings</TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-lg">Saved Sitters</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
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
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-foreground" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{savedSitters.length}</p>
                            <p className="text-sm text-muted-foreground">Saved Sitters</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{pastBookings.length}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Upcoming bookings */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("bookings")}>
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                              <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center">
                                <span className="text-xl">{booking.sitterAvatar}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-foreground">{booking.sitterName}</p>
                                  <Badge className={`${getStatusColor(booking.status)} border-0 text-xs`}>
                                    {booking.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {booking.date} | {booking.startTime} - {booking.endTime}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${booking.totalCost}</p>
                                <p className="text-xs text-muted-foreground">{booking.hours} hours</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No upcoming bookings</p>
                          <Button className="mt-4 rounded-full" asChild>
                            <Link href="/discover">Find a Sitter</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

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
                      <div className="space-y-4">
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
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...upcomingBookings, ...pastBookings].map((booking) => (
                          <div key={booking.id} className="flex items-center gap-4 p-4 border border-border rounded-xl">
                            <div className="h-14 w-14 rounded-xl bg-accent/50 flex items-center justify-center">
                              <span className="text-2xl">{booking.sitterAvatar}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-foreground">{booking.sitterName}</p>
                                <Badge className={`${getStatusColor(booking.status)} border-0 text-xs`}>
                                  {booking.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {booking.date} | {booking.startTime} - {booking.endTime}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {booking.children.map(c => `${c.name} (${c.age})`).join(", ")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">${booking.totalCost}</p>
                              <p className="text-sm text-muted-foreground">{booking.hours} hours</p>
                              {booking.status === "confirmed" && (
                                <Button size="sm" variant="outline" className="mt-2 rounded-full">
                                  Message
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Saved Sitters Tab */}
                <TabsContent value="saved">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedSitters.map((sitter) => (
                      <Card key={sitter.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="h-24 bg-gradient-to-br from-accent/30 to-secondary flex items-center justify-center">
                            <span className="text-4xl">{sitter.avatar}</span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{sitter.name}</h3>
                              {sitter.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
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
                                <Link href={`/sitters/${sitter.id}`}>Profile</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
