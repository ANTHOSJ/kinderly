"use client"

import { use, useState } from "react"
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
  Calendar as CalendarIcon,
  CreditCard
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSitterById } from "@/lib/data"

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
]

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
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would create a booking and redirect to confirmation
    router.push("/dashboard/parent?booking=success")
  }

  const canProceedToStep2 = date && startTime && endTime && hours > 0
  const canProceedToStep3 = children.every(c => c.name && c.age) && address

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
              {/* Progress steps */}
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= s 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                    </div>
                    <span className={`text-sm hidden sm:inline ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                      {s === 1 ? "Date & Time" : s === 2 ? "Details" : "Confirm"}
                    </span>
                    {s < 3 && <div className="hidden sm:block w-12 h-px bg-border" />}
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
                                {time}
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
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {hours > 0 && (
                      <div className="bg-secondary/50 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">
                          Duration: <span className="font-semibold text-foreground">{hours} hours</span>
                        </p>
                      </div>
                    )}

                    <Button
                      className="w-full h-12 rounded-xl"
                      onClick={() => setStep(2)}
                      disabled={!canProceedToStep2}
                    >
                      Continue
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
                      <Input
                        placeholder="Enter your address"
                        className="h-12 rounded-xl"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
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
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Confirm Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{date?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{startTime} - {endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{hours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Children</span>
                        <span className="font-medium">{children.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium text-right max-w-[200px] truncate">{address}</span>
                      </div>
                    </div>

                    {/* Payment info */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Payment Method</h3>
                      <div className="flex items-center gap-3 p-4 border border-border rounded-xl">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">**** **** **** 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Change
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 h-12 rounded-xl"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? "Booking..." : `Confirm & Pay $${total}`}
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
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${sitter.hourlyRate} x {hours || 0} hours
                        </span>
                        <span>${subtotal || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service fee</span>
                        <span>${serviceFee || 0}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-6 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-lg">${total || 0}</span>
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
