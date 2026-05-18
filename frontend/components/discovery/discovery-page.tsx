"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { SlidersHorizontal, Grid3X3, LayoutList, ArrowLeft, Search, Frown, RefreshCw, MapPin } from "lucide-react"
import { FilterSidebar, type FilterState } from "./filter-sidebar"
import { SearchBar, availableLocations } from "./search-bar"
import { BabysitterCard, type BabysitterData } from "./babysitter-card"
import { sitters } from "@/lib/data"

// Transform data from lib/data.ts to BabysitterData format
const transformSitters = (): BabysitterData[] => {
  return sitters.map((s) => ({
    id: s.id,
    name: s.name,
    avatar: s.avatar,
    rating: s.rating,
    reviews: s.reviews,
    distance: s.distance,
    hourlyRate: s.hourlyRate,
    experience: s.experience,
    experienceYears: s.experienceYears,
    badges: s.badges,
    bio: s.bio,
    available: s.available,
    verified: s.verified,
    trustScore: s.trustScore,
    languages: s.languages,
    responseTime: s.responseTime,
    availability: s.availability,
    location: s.location,
  }))
}

const allBabysitters = transformSitters()

type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "trust" | "distance" | "experience"

function sortSitters(sitters: BabysitterData[], sortBy: SortOption): BabysitterData[] {
  const sorted = [...sitters]
  
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate)
    case "price-high":
      return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "trust":
      return sorted.sort((a, b) => b.trustScore - a.trustScore)
    case "distance":
      return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    case "experience":
      return sorted.sort((a, b) => b.experienceYears - a.experienceYears)
    case "recommended":
    default:
      // Recommended: balance of rating, trust score, and availability
      return sorted.sort((a, b) => {
        const scoreA = (a.rating * 10) + a.trustScore + (a.available ? 20 : 0)
        const scoreB = (b.rating * 10) + b.trustScore + (b.available ? 20 : 0)
        return scoreB - scoreA
      })
  }
}

function filterSitters(sitters: BabysitterData[], filters: FilterState, searchQuery: string, locationFilter: string): BabysitterData[] {
  return sitters.filter((sitter) => {
    // Location filter
    if (locationFilter) {
      const sitterLocation = sitter.location?.toLowerCase() || ""
      const filterLocation = locationFilter.toLowerCase()
      if (!sitterLocation.includes(filterLocation)) {
        return false
      }
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = sitter.name.toLowerCase().includes(query)
      const matchesBio = sitter.bio.toLowerCase().includes(query)
      const matchesBadges = sitter.badges.some(b => b.toLowerCase().includes(query))
      const matchesLanguages = sitter.languages.some(l => l.toLowerCase().includes(query))
      if (!matchesName && !matchesBio && !matchesBadges && !matchesLanguages) {
        return false
      }
    }

    // Price range filter
    if (sitter.hourlyRate < filters.priceRange[0] || sitter.hourlyRate > filters.priceRange[1]) {
      return false
    }

    // Experience range filter
    if (sitter.experienceYears < filters.experienceRange[0]) {
      return false
    }
    if (filters.experienceRange[1] < 20 && sitter.experienceYears > filters.experienceRange[1]) {
      return false
    }

    // Trust score filter
    if (sitter.trustScore < filters.trustScoreMin) {
      return false
    }

    // Certification filters
    if (filters.certifications.length > 0) {
      const certMap: Record<string, string[]> = {
        "cpr": ["CPR Certified", "CPR"],
        "first-aid": ["First Aid"],
        "early-childhood": ["Early Childhood Ed", "Early Childhood Education"],
        "newborn-care": ["Newborn Care"],
        "special-needs": ["Special Needs"],
        "tutoring": ["Tutoring", "Homework Help"],
      }
      
      const hasAllCerts = filters.certifications.every(certId => {
        const certNames = certMap[certId] || []
        return certNames.some(name => sitter.badges.some(b => b.includes(name)))
      })
      
      if (!hasAllCerts) return false
    }

    // Availability filters
    if (filters.availability.length > 0) {
      const availabilityChecks: Record<string, boolean> = {
        "available-now": sitter.available,
        "weekdays": sitter.availability?.weekdays ?? true,
        "weekends": sitter.availability?.weekends ?? true,
        "evenings": sitter.availability?.evenings ?? true,
        "overnight": sitter.availability?.overnight ?? false,
      }
      
      const hasAvailability = filters.availability.some(avail => availabilityChecks[avail])
      if (!hasAvailability) return false
    }

    // Language filters
    if (filters.languages.length > 0) {
      const langMap: Record<string, string> = {
        "english": "English",
        "spanish": "Spanish",
        "mandarin": "Mandarin",
        "french": "French",
        "hindi": "Hindi",
        "korean": "Korean",
      }
      
      const hasLanguage = filters.languages.some(langId => {
        const langName = langMap[langId]
        return sitter.languages.includes(langName)
      })
      
      if (!hasLanguage) return false
    }

    return true
  })
}

// Loading skeleton component
function SitterCardSkeleton() {
  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Empty state component
function EmptyState({ 
  onReset, 
  hasFilters 
}: { 
  onReset: () => void
  hasFilters: boolean 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
        <Frown className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No sitters found</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {hasFilters 
          ? "We couldn't find any sitters matching your current filters. Try adjusting your search criteria."
          : "We couldn't find any sitters in your area. Try searching in a different location."}
      </p>
      {hasFilters && (
        <Button 
          variant="outline" 
          className="rounded-full gap-2"
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </Button>
      )}
    </div>
  )
}

// Quick filter badge component
function QuickFilterBadge({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string
  isActive: boolean
  onClick: () => void 
}) {
  return (
    <Badge 
      variant={isActive ? "default" : "secondary"}
      className={`rounded-full cursor-pointer transition-all hover:scale-105 ${
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-primary/10 hover:text-primary"
      }`}
      onClick={onClick}
    >
      {label}
    </Badge>
  )
}

export function DiscoveryPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [10, 60],
    experienceRange: [0, 20],
    trustScoreMin: 50,
    certifications: [],
    availability: [],
    languages: [],
  })

  // Quick filters state
  const [quickFilters, setQuickFilters] = useState({
    cprCertified: false,
    availableNow: false,
    fiveYearsExp: false,
    topRated: false,
  })

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Apply quick filters to main filters
  const handleQuickFilter = useCallback((filter: keyof typeof quickFilters) => {
    setQuickFilters(prev => {
      const newState = { ...prev, [filter]: !prev[filter] }
      
      // Update main filters based on quick filter changes
      setFilters(prevFilters => {
        const newFilters = { ...prevFilters }
        
        if (filter === "cprCertified") {
          if (newState.cprCertified) {
            newFilters.certifications = [...new Set([...newFilters.certifications, "cpr"])]
          } else {
            newFilters.certifications = newFilters.certifications.filter(c => c !== "cpr")
          }
        }
        
        if (filter === "availableNow") {
          if (newState.availableNow) {
            newFilters.availability = [...new Set([...newFilters.availability, "available-now"])]
          } else {
            newFilters.availability = newFilters.availability.filter(a => a !== "available-now")
          }
        }
        
        if (filter === "fiveYearsExp") {
          if (newState.fiveYearsExp) {
            newFilters.experienceRange = [5, 20]
          } else {
            newFilters.experienceRange = [0, 20]
          }
        }
        
        if (filter === "topRated") {
          if (newState.topRated) {
            newFilters.trustScoreMin = 95
          } else {
            newFilters.trustScoreMin = 50
          }
        }
        
        return newFilters
      })
      
      return newState
    })
  }, [])

  // Handle filter changes from sidebar
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    
    // Update quick filters to reflect sidebar changes
    setQuickFilters({
      cprCertified: newFilters.certifications.includes("cpr"),
      availableNow: newFilters.availability.includes("available-now"),
      fiveYearsExp: newFilters.experienceRange[0] >= 5,
      topRated: newFilters.trustScoreMin >= 95,
    })
  }, [])

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [10, 60],
      experienceRange: [0, 20],
      trustScoreMin: 50,
      certifications: [],
      availability: [],
      languages: [],
    })
    setQuickFilters({
      cprCertified: false,
      availableNow: false,
      fiveYearsExp: false,
      topRated: false,
    })
    setSearchQuery("")
    setLocationFilter("")
  }, [])

  // Memoized filtered and sorted results
  const filteredSitters = useMemo(() => {
    const filtered = filterSitters(allBabysitters, filters, searchQuery, locationFilter)
    return sortSitters(filtered, sortBy)
  }, [filters, searchQuery, sortBy, locationFilter])

  const availableCount = useMemo(() => 
    filteredSitters.filter(s => s.available).length, 
    [filteredSitters]
  )

  const hasActiveFilters = useMemo(() => {
    return (
      filters.priceRange[0] !== 10 ||
      filters.priceRange[1] !== 60 ||
      filters.experienceRange[0] !== 0 ||
      filters.experienceRange[1] !== 20 ||
      filters.trustScoreMin !== 50 ||
      filters.certifications.length > 0 ||
      filters.availability.length > 0 ||
      filters.languages.length > 0 ||
      searchQuery !== "" ||
      locationFilter !== ""
    )
  }, [filters, searchQuery, locationFilter])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.priceRange[0] !== 10 || filters.priceRange[1] !== 60) count++
    if (filters.experienceRange[0] !== 0 || filters.experienceRange[1] !== 20) count++
    if (filters.trustScoreMin !== 50) count++
    if (filters.certifications.length > 0) count += filters.certifications.length
    if (filters.availability.length > 0) count += filters.availability.length
    if (filters.languages.length > 0) count += filters.languages.length
    return count
  }, [filters])

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
                {filteredSitters.length} sitters found
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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            location={locationFilter}
            onLocationChange={setLocationFilter}
          />
          
          {/* Quick filters */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground mr-1">Quick filters:</span>
            <QuickFilterBadge 
              label="CPR Certified" 
              isActive={quickFilters.cprCertified}
              onClick={() => handleQuickFilter("cprCertified")}
            />
            <QuickFilterBadge 
              label="Available Now" 
              isActive={quickFilters.availableNow}
              onClick={() => handleQuickFilter("availableNow")}
            />
            <QuickFilterBadge 
              label="5+ Years Exp" 
              isActive={quickFilters.fiveYearsExp}
              onClick={() => handleQuickFilter("fiveYearsExp")}
            />
            <QuickFilterBadge 
              label="Top Rated" 
              isActive={quickFilters.topRated}
              onClick={() => handleQuickFilter("topRated")}
            />
          </div>
          
          {/* Location quick filters */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-sm text-muted-foreground mr-1">
              <MapPin className="h-3.5 w-3.5 inline mr-1" />
              Location:
            </span>
            {availableLocations.slice(1, 6).map((loc) => (
              <Badge 
                key={loc.id}
                variant={locationFilter === loc.value ? "default" : "secondary"}
                className={`rounded-full cursor-pointer transition-all hover:scale-105 ${
                  locationFilter === loc.value 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => setLocationFilter(locationFilter === loc.value ? "" : loc.value)}
              >
                {loc.value}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {locationFilter ? `Babysitters in ${locationFilter}` : "Trusted Babysitters Near You"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Searching...
                </span>
              ) : (
                <>
                  {availableCount} available now | {filteredSitters.length} total
                  {hasActiveFilters && (
                    <button 
                      onClick={resetFilters}
                      className="ml-2 text-primary hover:underline text-sm"
                    >
                      Clear filters
                    </button>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
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
                <SelectItem value="experience">Most Experienced</SelectItem>
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
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Main content with sidebar */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {isLoading ? (
              // Loading state
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {[...Array(6)].map((_, i) => (
                  <SitterCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredSitters.length === 0 ? (
              // Empty state
              <EmptyState onReset={resetFilters} hasFilters={hasActiveFilters} />
            ) : (
              // Results
              <>
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {filteredSitters.map((sitter) => (
                    <BabysitterCard key={sitter.id} sitter={sitter} viewMode={viewMode} />
                  ))}
                </div>

                {/* Results count footer */}
                <div className="text-center mt-12">
                  <p className="text-muted-foreground mb-4">
                    Showing all {filteredSitters.length} sitters
                  </p>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 border-2 hover:bg-secondary transition-all hover:scale-105"
                  >
                    Load More Sitters
                  </Button>
                </div>
              </>
            )}
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
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
