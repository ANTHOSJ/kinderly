"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft,
  Star,
  Shield,
  Clock,
  CheckCircle,
  BadgeCheck,
  Plus,
  Minus,
  MapPin,
  Calendar as CalendarIcon,
  MessageCircle,
  Download,
  Share2,
  PartyPopper,
  Check,
  Banknote,
  Info
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSitterById } from "@/lib/data"
import confetti from "canvas-confetti"

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
]

function formatTime(time: string) {
  const [hours] = time.split(":")
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:00 ${ampm}`
}

// Success screen component
function BookingSuccess({ 
  sitter, 
  bookingDetails,
  onViewBookings,
  onMessageSitter
}: { 
  sitter: { id: string; name: string; avatar: string; rating: number }
  bookingDetails: {
    date: Date
    startTime: string
    endTime: string
    hours: number
    total: number
    address: string
    children: { name: string; age: string }[]
  }
  onViewBookings: () => void
  onMessageSitter: () => void
}) {
  const [showConfetti, setShowConfetti] = useState(true)
  
  useEffect(() => {
    if (showConfetti) {
      // Trigger confetti animation
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b']
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
      setShowConfetti(false)
    }
  }, [showConfetti])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Success animation */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute h-32 w-32 rounded-full bg-green-100 animate-ping opacity-25" />
              <div className="relative h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-serif text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your booking with {sitter.name} has been confirmed. You&apos;ll receive a confirmation email shortly.
            </p>
          </div>

          {/* Booking summary card */}
          <Card className="mb-6 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-green-600" />
            <CardContent className="p-6">
              {/* Sitter info */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="h-16 w-16 rounded-xl bg-accent/50 flex items-center justify-center">
                  <span className="text-3xl">{sitter.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{sitter.name}</h3>
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{sitter.rating} rating</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0 rounded-full">
                  Confirmed
                </Badge>
              </div>

              {/* Booking details */}
              <div className="py-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {bookingDetails.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(bookingDetails.startTime)} - {formatTime(bookingDetails.endTime)} ({bookingDetails.hours} hours)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">Children</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails.children.map(c => `${c.name} (${c.age} years)`).join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total - Changed to estimated */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-muted-foreground">Estimated total</span>
                  <span className="text-2xl font-semibold text-foreground">${bookingDetails.total}</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <Banknote className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Payment is completed directly with {sitter.name.split(" ")[0]} after your session.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Button 
              className="h-12 rounded-xl"
              onClick={onViewBookings}
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              View My Bookings
            </Button>
            <Button 
              variant="outline" 
              className="h-12 rounded-xl"
              onClick={onMessageSitter}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Message {sitter.name.split(" ")[0]}
            </Button>
          </div>

          {/* Additional actions */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>

          {/* Tips card */}
          <Card className="mt-8 bg-primary/5 border-primary/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <PartyPopper className="h-5 w-5 text-primary" />
                Tips for a great experience
              </h3>
              <ul className="space-y-3">
                {[
                  "Send a message to introduce yourself and share any important details",
                  "Prepare a list of emergency contacts and important information",
                  "Show the sitter around your home when they arrive",
                  "Discuss bedtime routines and any house rules",
                  "Have payment ready for the sitter at the end of your session"
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const sitter = getSitterById(id)
  const router = useRouter()
  
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [children, setChildren] = useState([{ name: "", age: "" }])
  const [notes, setNotes] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  if (!sitter) {
    notFound()
  }

  const addChild = () => {
    if (children.length < 5) {
      setChildren([...children, { name: "", age: "" }])
    }
  }

  const removeChild = (index: number) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index))
    }
  }

  const updateChild = (index: number, field: "name" | "age", value: string) => {
    const updated = [...children]
    updated[index][field] = value
    setChildren(updated)
  }

  const calculateHours = () => {
    if (!startTime || !endTime) return 0
    const start = parseInt(startTime.split(":")[0])
    const end = parseInt(endTime.split(":")[0])
    return end > start ? end - start : 0
  }

  const hours = calculateHours()
  const subtotal = hours * sitter.hourlyRate
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsLoading(false)
    setBookingComplete(true)
  }

  const canProceedToStep2 = date && startTime && endTime && hours > 0
  const canProceedToStep3 = children.every(c => c.name && c.age) && address

  // Show success screen after booking
  if (bookingComplete && date) {
    return (
      <BookingSuccess 
        sitter={{
          id: sitter.id,
          name: sitter.name,
          avatar: sitter.avatar,
          rating: sitter.rating
        }}
        bookingDetails={{
          date,
          startTime,
          endTime,
          hours,
          total,
          address,
          children
        }}
        onViewBookings={() => router.push("/dashboard/parent")}
        onMessageSitter={() => router.push(`/messages?sitter=${sitter.id}`)}
      />
    )
  }

  // Progress percentage
  const progressPercent = ((step - 1) / 2) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href={`/sitters/${sitter.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to profile
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Step {step} of 3</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}% complete</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-4 mb-8">
                {[
                  { num: 1, label: "Date & Time" },
                  { num: 2, label: "Details" },
                  { num: 3, label: "Confirm" }
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step > s.num 
                        ? "bg-green-500 text-white" 
                        : step === s.num
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-muted-foreground"
                    }`}>
                      {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                    </div>
                    <span className={`text-sm hidden sm:inline ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                    {i < 2 && <div className="hidden sm:block w-8 h-px bg-border" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Date and Time */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-xl border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Select value={startTime} onValueChange={setStartTime}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {formatTime(time)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Select value={endTime} onValueChange={setEndTime}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select end time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.filter(t => t > startTime).map((time) => (
                              <SelectItem key={time} value={time}>
                                {formatTime(time)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {hours > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">
                            {hours} hour{hours > 1 ? "s" : ""} selected
                          </p>
                          <p className="text-sm text-green-600">
                            {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} | {formatTime(startTime)} - {formatTime(endTime)}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full h-12 rounded-xl"
                      onClick={() => setStep(2)}
                      disabled={!canProceedToStep2}
                    >
                      Continue to Details
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Children */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Children</Label>
                        {children.length < 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={addChild}
                            className="text-primary"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add child
                          </Button>
                        )}
                      </div>
                      
                      {children.map((child, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Child's name"
                              className="h-12 rounded-xl"
                              value={child.name}
                              onChange={(e) => updateChild(index, "name", e.target.value)}
                            />
                          </div>
                          <div className="w-24 space-y-2">
                            <Input
                              placeholder="Age"
                              type="number"
                              min="0"
                              max="17"
                              className="h-12 rounded-xl"
                              value={child.age}
                              onChange={(e) => updateChild(index, "age", e.target.value)}
                            />
                          </div>
                          {children.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeChild(index)}
                              className="h-12 w-12"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="Enter your address"
                          className="h-12 rounded-xl pl-10"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label>Special Instructions (Optional)</Label>
                      <Textarea
                        placeholder="Any allergies, routines, or special needs we should know about?"
                        className="min-h-24 rounded-xl resize-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => setStep(3)}
                        disabled={!canProceedToStep3}
                      >
                        Review Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review & Confirm</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">
                            {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(startTime)} - {formatTime(endTime)} ({hours} hours)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                          <p className="font-medium">{children.length} Child{children.length > 1 ? "ren" : ""}</p>
                          <p className="text-sm text-muted-foreground">
                            {children.map(c => `${c.name} (${c.age} years)`).join(", ")}
                          </p>
                        </div>
                      </div>

                      {notes && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-medium mb-1">Special Instructions</p>
                          <p className="text-sm text-muted-foreground">{notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Payment info - Direct Payment */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Payment Information</h3>
                      <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Banknote className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">Direct Payment to Sitter</p>
                            <p className="text-sm text-amber-700 mt-1">
                              Payment is completed directly with {sitter.name.split(" ")[0]} after your babysitting session. 
                              Cash, Venmo, or other payment methods can be arranged directly with your sitter.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>The estimated total is ${total} based on ${sitter.hourlyRate}/hr for {hours} hours.</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => setStep(2)}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 h-12 rounded-xl gap-2"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <LoadingSpinner />
                            Confirming...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    {/* Sitter info */}
                    <div className="flex items-center gap-4 pb-6 border-b border-border">
                      <div className="h-16 w-16 rounded-xl bg-accent/50 flex items-center justify-center">
                        <span className="text-3xl">{sitter.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{sitter.name}</h3>
                          {sitter.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{sitter.rating}</span>
                          <span>({sitter.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing breakdown */}
                    <div className="py-6 space-y-3 border-b border-border">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Estimated Cost</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${sitter.hourlyRate} x {hours || 0} hours
                        </span>
                        <span>${subtotal || 0}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-6">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Estimated Total</span>
                        <span className="font-semibold text-lg">${subtotal || 0}</span>
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <Banknote className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800">
                            Pay directly to your sitter after the session
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-6 pt-6 border-t border-border space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>$1M liability coverage</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>Free cancellation 24h before</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Verified background check</span>
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
