"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, ArrowRight, Check } from "lucide-react"

type UserRole = "parent" | "sitter" | null

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect based on role
    if (role === "sitter") {
      router.push("/become-a-sitter")
    } else {
      router.push("/dashboard/parent")
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (role === "sitter") {
      router.push("/become-a-sitter")
    } else {
      router.push("/dashboard/parent")
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Back button */}
          {step === 1 ? (
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          ) : (
            <button 
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Change role
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">K</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Kinderly
            </span>
          </Link>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-serif text-foreground mb-2">Get started</h1>
                <p className="text-muted-foreground">
                  Join Kinderly and connect with your childcare community.
                </p>
              </div>

              <div className="space-y-4">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${
                    role === "parent" ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => handleRoleSelect("parent")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-accent/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">👨‍👩‍👧</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">I&apos;m a Parent</h3>
                        <p className="text-sm text-muted-foreground">
                          Find trusted babysitters for your family and book with confidence.
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${
                    role === "sitter" ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => handleRoleSelect("sitter")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🧑‍🏫</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">I&apos;m a Babysitter</h3>
                        <p className="text-sm text-muted-foreground">
                          Share your skills, set your rates, and connect with families.
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="mt-8 text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                  {role === "parent" ? "👨‍👩‍👧 Parent Account" : "🧑‍🏫 Sitter Account"}
                </div>
                <h1 className="text-3xl font-serif text-foreground mb-2">Create your account</h1>
                <p className="text-muted-foreground">
                  {role === "parent" 
                    ? "Join thousands of families finding trusted care."
                    : "Start your journey as a trusted babysitter."}
                </p>
              </div>

              {/* Google signup */}
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl mb-6 border-2"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-6">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                  or continue with email
                </span>
              </div>

              {/* Signup form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="pl-10 h-12 rounded-xl"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-12 rounded-xl"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-12 rounded-xl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 h-12 rounded-xl"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-base"
                  disabled={isLoading || !formData.agreeTerms}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <p className="mt-8 text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-serif text-foreground mb-8 text-center">
            Why families love Kinderly
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: "🔒",
                title: "100% Verified Sitters",
                description: "Every sitter undergoes thorough background checks",
              },
              {
                icon: "⭐",
                title: "Trusted Reviews",
                description: "Real feedback from families in your community",
              },
              {
                icon: "📱",
                title: "Easy Booking",
                description: "Find and book the perfect sitter in minutes",
              },
              {
                icon: "💬",
                title: "Secure Messaging",
                description: "Communicate safely through our platform",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 bg-card/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
