"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal, Grid3X3, LayoutList, ArrowLeft } from "lucide-react"
import { FilterSidebar } from "./filter-sidebar"
import { SearchBar } from "./search-bar"
import { BabysitterCard, type BabysitterData } from "./babysitter-card"

const babysitters: BabysitterData[] = [
  {
    id: "1",
    name: "Emma Thompson",
    avatar: "👩‍🦰",
    rating: 4.9,
    reviews: 156,
    distance: "0.5 miles",
    hourlyRate: 24,
    experience: "8 years",
    experienceYears: 8,
    badges: ["CPR Certified", "First Aid", "Early Childhood Ed", "Background Checked"],
    bio: "Former preschool teacher with a passion for creative learning. I bring educational activities and lots of patience to every session!",
    available: true,
    verified: true,
    trustScore: 98,
    languages: ["English"],
    responseTime: "within 1 hour",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "👨‍🦱",
    rating: 5.0,
    reviews: 89,
    distance: "1.2 miles",
    hourlyRate: 20,
    experience: "4 years",
    experienceYears: 4,
    badges: ["CPR Certified", "Background Checked", "Pet Friendly"],
    bio: "College student studying child psychology. Great with homework help and outdoor activities!",
    available: true,
    verified: true,
    trustScore: 95,
    languages: ["English", "Mandarin"],
    responseTime: "within 30 min",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    avatar: "👩",
    rating: 4.8,
    reviews: 203,
    distance: "0.8 miles",
    hourlyRate: 26,
    experience: "10 years",
    experienceYears: 10,
    badges: ["Newborn Care", "First Aid", "Multilingual", "Sleep Training"],
    bio: "Experienced nanny specializing in infants and toddlers. Fluent in English and Spanish. Expert in establishing healthy routines.",
    available: true,
    verified: true,
    trustScore: 99,
    languages: ["English", "Spanish"],
    responseTime: "within 2 hours",
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "👨",
    rating: 4.9,
    reviews: 67,
    distance: "1.5 miles",
    hourlyRate: 22,
    experience: "5 years",
    experienceYears: 5,
    badges: ["Special Needs", "CPR Certified", "Tutoring"],
    bio: "Trained in special needs care. Patient, understanding, and dedicated to every child's wellbeing and development.",
    available: false,
    verified: true,
    trustScore: 94,
    languages: ["English"],
    responseTime: "within 1 hour",
  },
  {
    id: "5",
    name: "Aisha Patel",
    avatar: "👩🏽",
    rating: 4.7,
    reviews: 112,
    distance: "2.1 miles",
    hourlyRate: 23,
    experience: "6 years",
    experienceYears: 6,
    badges: ["CPR Certified", "Music & Arts", "Homework Help"],
    bio: "Creative babysitter who loves incorporating music and arts into playtime. Former music teacher with a gentle approach.",
    available: true,
    verified: true,
    trustScore: 92,
    languages: ["English", "Hindi"],
    responseTime: "within 1 hour",
  },
  {
    id: "6",
    name: "David Park",
    avatar: "👨🏻",
    rating: 4.9,
    reviews: 78,
    distance: "0.9 miles",
    hourlyRate: 25,
    experience: "7 years",
    experienceYears: 7,
    badges: ["Sports & Fitness", "First Aid", "CPR Certified", "Tutoring"],
    bio: "Active and energetic! I love taking kids to the park, playing sports, and keeping them engaged with fun outdoor activities.",
    available: true,
    verified: true,
    trustScore: 96,
    languages: ["English", "Korean"],
    responseTime: "within 45 min",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    avatar: "👩🏼",
    rating: 5.0,
    reviews: 234,
    distance: "1.8 miles",
    hourlyRate: 30,
    experience: "12 years",
    experienceYears: 12,
    badges: ["Newborn Care", "Sleep Training", "Meal Prep", "CPR Certified"],
    bio: "Professional nanny with over a decade of experience. Specializing in newborns and establishing healthy sleep routines.",
    available: true,
    verified: true,
    trustScore: 100,
    languages: ["English", "French"],
    responseTime: "within 30 min",
  },
  {
    id: "8",
    name: "Marcus Johnson",
    avatar: "👨🏾",
    rating: 4.8,
    reviews: 91,
    distance: "1.3 miles",
    hourlyRate: 21,
    experience: "3 years",
    experienceYears: 3,
    badges: ["CPR Certified", "Homework Help", "STEM Activities"],
    bio: "Engineering student who makes learning fun! Great at helping with math, science projects, and building cool things together.",
    available: true,
    verified: true,
    trustScore: 90,
    languages: ["English"],
    responseTime: "within 2 hours",
  },
]

export function DiscoveryPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <span className="text-xl font-semibold text-foreground font-serif">Kinderly</span>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="hidden sm:flex rounded-full px-4 py-1.5">
                {babysitters.length} sitters nearby
              </Badge>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar 
            onFilterClick={() => setMobileFiltersOpen(true)}
            showFilterButton
          />
        </div>

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Trusted Babysitters Near You</h1>
            <p className="text-muted-foreground mt-1">
              {babysitters.filter(s => s.available).length} available now | {babysitters.length} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="trust">Trust Score</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
              </SelectContent>
            </Select>

            {/* View toggle */}
            <div className="hidden sm:flex items-center border border-border rounded-xl p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>

            {/* Desktop filter toggle */}
            <Button 
              variant="outline" 
              className="hidden lg:flex items-center gap-2 rounded-xl"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main content with sidebar */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6">
              <FilterSidebar />
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {babysitters.map((sitter) => (
                <BabysitterCard key={sitter.id} sitter={sitter} />
              ))}
            </div>

            {/* Load more */}
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 border-2 hover:bg-secondary transition-all hover:scale-105"
              >
                Load More Sitters
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filters sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-full sm:max-w-md p-6">
          <SheetHeader className="sr-only">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FilterSidebar 
            onClose={() => setMobileFiltersOpen(false)} 
            isMobile 
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
