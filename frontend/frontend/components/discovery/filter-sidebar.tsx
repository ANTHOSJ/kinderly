"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw } from "lucide-react"

export interface FilterState {
  priceRange: [number, number]
  experienceRange: [number, number]
  trustScoreMin: number
  certifications: string[]
  availability: string[]
  languages: string[]
}

interface FilterSidebarProps {
  onClose?: () => void
  isMobile?: boolean
  filters?: FilterState
  onFilterChange?: (filters: FilterState) => void
}

const defaultFilters: FilterState = {
  priceRange: [10, 60],
  experienceRange: [0, 20],
  trustScoreMin: 50,
  certifications: [],
  availability: [],
  languages: [],
}

const certifications = [
  { id: "cpr", label: "CPR Certified" },
  { id: "first-aid", label: "First Aid" },
  { id: "early-childhood", label: "Early Childhood Ed" },
  { id: "newborn-care", label: "Newborn Care" },
  { id: "special-needs", label: "Special Needs" },
  { id: "tutoring", label: "Tutoring" },
]

const availability = [
  { id: "available-now", label: "Available Now" },
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "evenings", label: "Evenings" },
  { id: "overnight", label: "Overnight" },
]

const languages = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "mandarin", label: "Mandarin" },
  { id: "french", label: "French" },
  { id: "hindi", label: "Hindi" },
  { id: "korean", label: "Korean" },
]

export function FilterSidebar({ 
  onClose, 
  isMobile = false,
  filters = defaultFilters,
  onFilterChange,
}: FilterSidebarProps) {
  
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value })
    }
  }, [filters, onFilterChange])

  const activeFiltersCount = 
    filters.certifications.length + 
    filters.availability.length + 
    filters.languages.length +
    (filters.priceRange[0] !== 10 || filters.priceRange[1] !== 60 ? 1 : 0) +
    (filters.experienceRange[0] !== 0 || filters.experienceRange[1] !== 20 ? 1 : 0) +
    (filters.trustScoreMin !== 50 ? 1 : 0)

  const resetFilters = useCallback(() => {
    if (onFilterChange) {
      onFilterChange(defaultFilters)
    }
  }, [onFilterChange])

  const toggleFilter = useCallback((
    key: "certifications" | "availability" | "languages",
    value: string
  ) => {
    const currentValues = filters[key]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    updateFilter(key, newValues)
  }, [filters, updateFilter])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto space-y-8 pr-2 -mr-2">
        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Hourly Rate</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            min={10}
            max={60}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}/hr</span>
            <span>${filters.priceRange[1]}/hr</span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Experience */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Years of Experience</Label>
          <Slider
            value={filters.experienceRange}
            onValueChange={(value) => updateFilter("experienceRange", value as [number, number])}
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.experienceRange[0]} years</span>
            <span>{filters.experienceRange[1] >= 20 ? "20+" : filters.experienceRange[1]} years</span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Trust Score */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Minimum Trust Score</Label>
          <Slider
            value={[filters.trustScoreMin]}
            onValueChange={(value) => updateFilter("trustScoreMin", value[0])}
            min={50}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{filters.trustScoreMin}%+</span>
            <Badge 
              variant="secondary" 
              className={`rounded-full ${filters.trustScoreMin >= 90 ? 'bg-green-100 text-green-700' : 'bg-secondary text-secondary-foreground'}`}
            >
              {filters.trustScoreMin >= 95 ? 'Top Rated' : filters.trustScoreMin >= 90 ? 'Excellent' : 'All Sitters'}
            </Badge>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Certifications */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Certifications</Label>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => toggleFilter("certifications", cert.id)}
              >
                <Checkbox
                  id={cert.id}
                  checked={filters.certifications.includes(cert.id)}
                  onCheckedChange={() => toggleFilter("certifications", cert.id)}
                />
                <Label 
                  htmlFor={cert.id} 
                  className="text-sm text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors flex-1"
                >
                  {cert.label}
                </Label>
                {filters.certifications.includes(cert.id) && (
                  <span className="text-xs text-primary">Active</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Availability */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Availability</Label>
          <div className="space-y-3">
            {availability.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => toggleFilter("availability", item.id)}
              >
                <Checkbox
                  id={item.id}
                  checked={filters.availability.includes(item.id)}
                  onCheckedChange={() => toggleFilter("availability", item.id)}
                />
                <Label 
                  htmlFor={item.id} 
                  className="text-sm text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors flex-1"
                >
                  {item.label}
                </Label>
                {item.id === "available-now" && filters.availability.includes(item.id) && (
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Languages */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Languages</Label>
          <div className="space-y-3">
            {languages.map((lang) => (
              <div 
                key={lang.id} 
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => toggleFilter("languages", lang.id)}
              >
                <Checkbox
                  id={lang.id}
                  checked={filters.languages.includes(lang.id)}
                  onCheckedChange={() => toggleFilter("languages", lang.id)}
                />
                <Label 
                  htmlFor={lang.id} 
                  className="text-sm text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors"
                >
                  {lang.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button for mobile */}
      {isMobile && (
        <div className="pt-6 border-t border-border/50 mt-6 space-y-3">
          <Button 
            className="w-full rounded-xl" 
            size="lg"
            onClick={onClose}
          >
            Show {activeFiltersCount > 0 ? "Filtered " : ""}Results
          </Button>
          {activeFiltersCount > 0 && (
            <Button 
              variant="outline"
              className="w-full rounded-xl" 
              size="lg"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
