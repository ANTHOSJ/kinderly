"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Calendar, SlidersHorizontal, X } from "lucide-react"

interface SearchBarProps {
  onFilterClick?: () => void
  showFilterButton?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function SearchBar({ 
  onFilterClick, 
  showFilterButton = false,
  searchQuery = "",
  onSearchChange,
}: SearchBarProps) {
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("anytime")

  const handleSearch = () => {
    // In a real app, this would trigger a search with all parameters
    // For now, the search is handled via the searchQuery prop
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
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

        {/* Location input */}
        <div className="relative lg:w-52">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Location"
            className="pl-12 h-12 border-0 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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
