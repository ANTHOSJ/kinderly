"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Calendar, SlidersHorizontal, X, ChevronDown } from "lucide-react"

// Available locations for filtering
export const availableLocations = [
  { id: "all", label: "All Locations", value: "" },
  { id: "brooklyn", label: "Brooklyn, NY", value: "Brooklyn" },
  { id: "manhattan", label: "Manhattan, NY", value: "Manhattan" },
  { id: "queens", label: "Queens, NY", value: "Queens" },
  { id: "bronx", label: "Bronx, NY", value: "Bronx" },
  { id: "upper-east-side", label: "Upper East Side, NY", value: "Upper East Side" },
  { id: "williamsburg", label: "Williamsburg, NY", value: "Williamsburg" },
  { id: "jersey-city", label: "Jersey City, NJ", value: "Jersey City" },
  { id: "hoboken", label: "Hoboken, NJ", value: "Hoboken" },
]

interface SearchBarProps {
  onFilterClick?: () => void
  showFilterButton?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
  location?: string
  onLocationChange?: (location: string) => void
}

export function SearchBar({ 
  onFilterClick, 
  showFilterButton = false,
  searchQuery = "",
  onSearchChange,
  location = "",
  onLocationChange,
}: SearchBarProps) {
  const [locationInput, setLocationInput] = useState(location)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("anytime")
  const locationRef = useRef<HTMLDivElement>(null)

  // Sync location input with prop
  useEffect(() => {
    setLocationInput(location)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    // In a real app, this would trigger a search with all parameters
    // For now, the search is handled via the props
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleLocationSelect = (loc: typeof availableLocations[0]) => {
    setLocationInput(loc.label === "All Locations" ? "" : loc.label)
    onLocationChange?.(loc.value)
    setShowLocationDropdown(false)
  }

  const filteredLocations = availableLocations.filter(loc => 
    loc.label.toLowerCase().includes(locationInput.toLowerCase()) ||
    loc.value.toLowerCase().includes(locationInput.toLowerCase())
  )

  const clearLocation = () => {
    setLocationInput("")
    onLocationChange?.("")
  }

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-lg shadow-foreground/5">
      {/* Main search row */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by name, skills, or specialty..."
            className="pl-12 pr-10 h-12 border-0 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-background transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Location input with dropdown */}
        <div className="relative lg:w-56" ref={locationRef}>
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
          <Input 
            placeholder="Location"
            className="pl-12 pr-10 h-12 border-0 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value)
              setShowLocationDropdown(true)
            }}
            onFocus={() => setShowLocationDropdown(true)}
          />
          {locationInput ? (
            <button
              onClick={clearLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-background transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : (
            <ChevronDown 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            />
          )}
          
          {/* Location dropdown */}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="max-h-64 overflow-y-auto py-2">
                {filteredLocations.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No locations found
                  </div>
                ) : (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationSelect(loc)}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3 ${
                        location === loc.value ? "bg-primary/5 text-primary" : "text-foreground"
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{loc.label}</span>
                      {location === loc.value && loc.value && (
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Date picker */}
        <div className="relative lg:w-44">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input 
            type="date"
            className="pl-12 h-12 border-0 bg-secondary/50 rounded-xl text-foreground focus-visible:ring-1 focus-visible:ring-primary"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time select */}
        <div className="lg:w-36">
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="h-12 border-0 bg-secondary/50 rounded-xl">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anytime">Any time</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search button */}
        <Button 
          size="lg"
          className="h-12 px-8 rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search</span>
        </Button>

        {/* Mobile filter button */}
        {showFilterButton && (
          <Button 
            variant="outline"
            size="lg"
            className="h-12 px-4 rounded-xl lg:hidden"
            onClick={onFilterClick}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Active location indicator */}
      {location && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtering by location:</span>
          <button
            onClick={clearLocation}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <MapPin className="h-3 w-3" />
            {location}
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Search suggestions when typing */}
      {searchQuery && searchQuery.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground mb-2">Searching for: <span className="font-medium text-foreground">{searchQuery}</span></p>
          <div className="flex flex-wrap gap-2">
            <button 
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onSearchChange?.("CPR Certified")}
            >
              CPR Certified
            </button>
            <button 
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onSearchChange?.("Newborn Care")}
            >
              Newborn Care
            </button>
            <button 
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onSearchChange?.("Special Needs")}
            >
              Special Needs
            </button>
            <button 
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onSearchChange?.("Homework Help")}
            >
              Homework Help
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
