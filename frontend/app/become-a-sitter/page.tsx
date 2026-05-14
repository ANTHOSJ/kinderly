"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
  DollarSign,
  Clock,
  Award,
  User,
  Shield,
  Calendar
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const certificationOptions = [
  { id: "cpr", label: "CPR Certified" },
  { id: "first_aid", label: "First Aid" },
  { id: "early_childhood", label: "Early Childhood Education" },
  { id: "newborn_care", label: "Newborn Care" },
  { id: "special_needs", label: "Special Needs Training" },
  { id: "sleep_training", label: "Sleep Training" },
]

const specialtyOptions = [
  { id: "infants", label: "Infants (0-1 year)" },
  { id: "toddlers", label: "Toddlers (1-3 years)" },
  { id: "preschool", label: "Preschool (3-5 years)" },
  { id: "school_age", label: "School Age (6-12 years)" },
  { id: "homework", label: "Homework Help" },
  { id: "arts", label: "Arts & Crafts" },
  { id: "music", label: "Music" },
  { id: "sports", label: "Sports & Outdoor Activities" },
  { id: "cooking", label: "Meal Prep & Cooking" },
  { id: "languages", label: "Multilingual Care" },
]

export default function BecomeSitterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    // Step 1: Personal info
    bio: "",
    experience: "",
    education: "",
    
    // Step 2: Certifications
    certifications: [] as string[],
    specialties: [] as string[],
    languages: ["English"],
    
    // Step 3: Availability
    weekdays: false,
    weekends: false,
    evenings: false,
    overnight: false,
    
    // Step 4: Pricing
    hourlyRate: 22,
  })

  const totalSteps = 5

  const handleCertificationToggle = (certId: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certId)
        ? prev.certifications.filter(c => c !== certId)
        : [...prev.certifications, certId]
    }))
  }

  const handleSpecialtyToggle = (specId: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specId)
        ? prev.specialties.filter(s => s !== specId)
        : [...prev.specialties, specId]
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push("/dashboard/sitter?welcome=true")
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.bio.length >= 50 && formData.experience
      case 2: return formData.certifications.length > 0 && formData.specialties.length > 0
      case 3: return formData.weekdays || formData.weekends || formData.evenings || formData.overnight
      case 4: return formData.hourlyRate >= 10
      default: return true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1">
              Join our community
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">
              Become a Kinderly Sitter
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Share your skills, set your own rates, and connect with amazing families in your area.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: About You */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Tell us about yourself</h2>
                      <p className="text-sm text-muted-foreground">Help families get to know you</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell families about yourself, your experience with children, and what makes you a great sitter..."
                      className="min-h-32 rounded-xl resize-none"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 50 characters ({formData.bio.length}/50)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education (Optional)</Label>
                    <Input
                      id="education"
                      placeholder="e.g., Bachelor's in Early Childhood Education"
                      className="h-12 rounded-xl"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Certifications & Skills */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Certifications & Skills</h2>
                      <p className="text-sm text-muted-foreground">Highlight your qualifications</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Certifications (select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {certificationOptions.map((cert) => (
                        <div
                          key={cert.id}
                          onClick={() => handleCertificationToggle(cert.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.certifications.includes(cert.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={formData.certifications.includes(cert.id)}
                            onCheckedChange={() => handleCertificationToggle(cert.id)}
                          />
                          <span className="text-sm">{cert.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Specialties (select all that apply)</Label>
                    <div className="flex flex-wrap gap-2">
                      {specialtyOptions.map((spec) => (
                        <Badge
                          key={spec.id}
                          variant={formData.specialties.includes(spec.id) ? "default" : "outline"}
                          className="cursor-pointer rounded-full px-4 py-2 transition-all hover:scale-105"
                          onClick={() => handleSpecialtyToggle(spec.id)}
                        >
                          {spec.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Availability */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Set Your Availability</h2>
                      <p className="text-sm text-muted-foreground">When are you available to work?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "weekdays", label: "Weekdays", description: "Monday through Friday" },
                      { key: "weekends", label: "Weekends", description: "Saturday and Sunday" },
                      { key: "evenings", label: "Evenings", description: "After 6:00 PM" },
                      { key: "overnight", label: "Overnight", description: "Extended stays" },
                    ].map((option) => (
                      <div
                        key={option.key}
                        onClick={() => setFormData({ 
                          ...formData, 
                          [option.key]: !formData[option.key as keyof typeof formData] 
                        })}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          formData[option.key as keyof typeof formData]
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <Checkbox
                          checked={formData[option.key as keyof typeof formData] as boolean}
                          onCheckedChange={() => setFormData({ 
                            ...formData, 
                            [option.key]: !formData[option.key as keyof typeof formData] 
                          })}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    You can always update your availability later from your dashboard.
                  </p>
                </div>
              )}

              {/* Step 4: Pricing */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Set Your Rate</h2>
                      <p className="text-sm text-muted-foreground">Choose your hourly rate</p>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <div className="text-6xl font-semibold text-foreground mb-2">
                      ${formData.hourlyRate}
                    </div>
                    <p className="text-muted-foreground">per hour</p>
                  </div>

                  <div className="px-4">
                    <Slider
                      value={[formData.hourlyRate]}
                      onValueChange={(value) => setFormData({ ...formData, hourlyRate: value[0] })}
                      min={10}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>$10/hr</span>
                      <span>$50/hr</span>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-4 mt-6">
                    <h3 className="font-medium mb-2">Rate recommendation</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your experience and certifications, we recommend a rate between 
                      <span className="font-semibold text-foreground"> $20 - $28 per hour</span>. 
                      The average rate in your area is $24/hr.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Review Your Profile</h2>
                      <p className="text-sm text-muted-foreground">Almost there! Review your information</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Bio</p>
                      <p className="text-foreground">{formData.bio || "Not provided"}</p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Experience</p>
                      <p className="text-foreground">{formData.experience || "Not provided"} years</p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.certifications.map((certId) => {
                          const cert = certificationOptions.find(c => c.id === certId)
                          return (
                            <Badge key={certId} variant="secondary" className="rounded-full">
                              {cert?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.specialties.map((specId) => {
                          const spec = specialtyOptions.find(s => s.id === specId)
                          return (
                            <Badge key={specId} variant="outline" className="rounded-full">
                              {spec?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/30 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                        <p className="text-2xl font-semibold">${formData.hourlyRate}/hr</p>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Availability</p>
                        <p className="text-foreground">
                          {[
                            formData.weekdays && "Weekdays",
                            formData.weekends && "Weekends",
                            formData.evenings && "Evenings",
                            formData.overnight && "Overnight",
                          ].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Background Check Required</p>
                        <p className="text-sm text-muted-foreground">
                          After submitting, you&apos;ll be asked to complete a background check to verify your identity and ensure the safety of families.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button
                    className="flex-1 h-12 rounded-xl"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="flex-1 h-12 rounded-xl"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating profile..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: "Set your own rates", description: "You control how much you earn" },
              { icon: Clock, title: "Flexible schedule", description: "Work when it suits you" },
              { icon: Shield, title: "Safe & secure", description: "Vetted families on our platform" },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
