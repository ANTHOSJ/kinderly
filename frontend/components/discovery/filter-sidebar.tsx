"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw } from "lucide-react"

interface FilterSidebarProps {
  onClose?: () => void
  isMobile?: boolean
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
]

export function FilterSidebar({ onClose, isMobile = false }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([15, 40])
  const [experienceRange, setExperienceRange] = useState([0, 15])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [trustScoreMin, setTrustScoreMin] = useState([80])

  const activeFiltersCount = 
    selectedCertifications.length + 
    selectedAvailability.length + 
    selectedLanguages.length +
    (priceRange[0] !== 15 || priceRange[1] !== 40 ? 1 : 0) +
    (experienceRange[0] !== 0 || experienceRange[1] !== 15 ? 1 : 0) +
    (trustScoreMin[0] !== 80 ? 1 : 0)

  const resetFilters = () => {
    setPriceRange([15, 40])
    setExperienceRange([0, 15])
    setSelectedCertifications([])
    setSelectedAvailability([])
    setSelectedLanguages([])
    setTrustScoreMin([80])
  }

  const toggleFilter = (
    value: string, 
    selected: string[], 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    )
  }

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
            value={priceRange}
            onValueChange={setPriceRange}
            min={10}
            max={60}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}/hr</span>
            <span>${priceRange[1]}/hr</span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Experience */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Years of Experience</Label>
          <Slider
            value={experienceRange}
            onValueChange={setExperienceRange}
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{experienceRange[0]} years</span>
            <span>{experienceRange[1]}+ years</span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Trust Score */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Minimum Trust Score</Label>
          <Slider
            value={trustScoreMin}
            onValueChange={setTrustScoreMin}
            min={50}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{trustScoreMin[0]}%+</span>
            <Badge 
              variant="secondary" 
              className={`rounded-full ${trustScoreMin[0] >= 90 ? 'bg-green-100 text-green-700' : 'bg-secondary text-secondary-foreground'}`}
            >
              {trustScoreMin[0] >= 90 ? 'Top Rated' : 'All Sitters'}
            </Badge>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Certifications */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Certifications</Label>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center gap-3">
                <Checkbox
                  id={cert.id}
                  checked={selectedCertifications.includes(cert.id)}
                  onCheckedChange={() => toggleFilter(cert.id, selectedCertifications, setSelectedCertifications)}
                />
                <Label 
                  htmlFor={cert.id} 
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {cert.label}
                </Label>
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
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  id={item.id}
                  checked={selectedAvailability.includes(item.id)}
                  onCheckedChange={() => toggleFilter(item.id, selectedAvailability, setSelectedAvailability)}
                />
                <Label 
                  htmlFor={item.id} 
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {item.label}
                </Label>
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
              <div key={lang.id} className="flex items-center gap-3">
                <Checkbox
                  id={lang.id}
                  checked={selectedLanguages.includes(lang.id)}
                  onCheckedChange={() => toggleFilter(lang.id, selectedLanguages, setSelectedLanguages)}
                />
                <Label 
                  htmlFor={lang.id} 
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
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
        <div className="pt-6 border-t border-border/50 mt-6">
          <Button 
            className="w-full rounded-xl" 
            size="lg"
            onClick={onClose}
          >
            Show Results
          </Button>
        </div>
      )}
    </div>
  )
}
