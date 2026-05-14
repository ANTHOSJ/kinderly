"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Calendar, SlidersHorizontal } from "lucide-react"

interface SearchBarProps {
  onFilterClick?: () => void
  showFilterButton?: boolean
}

export function SearchBar({ onFilterClick, showFilterButton = false }: SearchBarProps) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-3 shadow-lg shadow-foreground/5">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Location input */}
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Enter your location"
            className="pl-12 h-12 border-0 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Date picker */}
        <div className="relative lg:w-48">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="date"
            className="pl-12 h-12 border-0 bg-secondary/50 rounded-xl text-foreground focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Time select */}
        <div className="lg:w-40">
          <Select defaultValue="anytime">
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
          className="h-12 px-8 rounded-xl gap-2"
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

      {/* Quick filters */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/30">
        <span className="text-sm text-muted-foreground mr-1">Popular:</span>
        <Badge 
          variant="secondary" 
          className="rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          CPR Certified
        </Badge>
        <Badge 
          variant="secondary" 
          className="rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          Available Now
        </Badge>
        <Badge 
          variant="secondary" 
          className="rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          5+ Years Exp
        </Badge>
        <Badge 
          variant="secondary" 
          className="rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          Top Rated
        </Badge>
      </div>
    </div>
  )
}
