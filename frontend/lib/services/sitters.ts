// Service layer for sitter-related data operations
// This abstracts the data source and can be easily swapped for Supabase/API calls

import { sitters, reviews } from "./data"
import type { Sitter, Review } from "./types"

// Re-export types for convenience
export type { Sitter, Review } from "./types"

/**
 * Get all sitters
 * Future: Replace with Supabase query
 * await supabase.from('sitters').select('*')
 */
export async function getAllSitters(): Promise<Sitter[]> {
  // Simulate network delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  return sitters
}

/**
 * Get sitter by ID
 * Future: Replace with Supabase query
 * await supabase.from('sitters').select('*').eq('id', id).single()
 */
export function getSitterById(id: string): Sitter | undefined {
  return sitters.find((s) => s.id === id)
}

/**
 * Get sitter by ID (async version for future API use)
 */
export async function getSitterByIdAsync(id: string): Promise<Sitter | null> {
  if (process.env.NODE_ENV === "development") {
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  return sitters.find((s) => s.id === id) || null
}

/**
 * Get sitters by location
 * Future: Replace with Supabase query with location filter
 */
export function getSittersByLocation(location: string): Sitter[] {
  if (!location) return sitters
  return sitters.filter((s) => 
    s.location.toLowerCase().includes(location.toLowerCase())
  )
}

/**
 * Get available sitters
 */
export function getAvailableSitters(): Sitter[] {
  return sitters.filter((s) => s.available)
}

/**
 * Search sitters by query
 */
export function searchSitters(query: string): Sitter[] {
  if (!query) return sitters
  const lowerQuery = query.toLowerCase()
  return sitters.filter((s) =>
    s.name.toLowerCase().includes(lowerQuery) ||
    s.bio.toLowerCase().includes(lowerQuery) ||
    s.badges.some((b) => b.toLowerCase().includes(lowerQuery)) ||
    s.languages.some((l) => l.toLowerCase().includes(lowerQuery)) ||
    s.specialties.some((sp) => sp.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get reviews for a sitter
 * Future: Replace with Supabase query
 * await supabase.from('reviews').select('*').eq('sitter_id', sitterId)
 */
export function getReviewsBySitterId(sitterId: string): Review[] {
  return reviews.filter((r) => r.sitterId === sitterId)
}

/**
 * Get all reviews
 */
export function getAllReviews(): Review[] {
  return reviews
}

/**
 * Calculate sitter statistics
 */
export function getSitterStats() {
  const totalSitters = sitters.length
  const availableCount = sitters.filter((s) => s.available).length
  const avgRating = sitters.reduce((acc, s) => acc + s.rating, 0) / totalSitters
  const totalReviews = sitters.reduce((acc, s) => acc + s.reviews, 0)
  
  return {
    totalSitters,
    availableCount,
    avgRating: Number(avgRating.toFixed(1)),
    totalReviews,
  }
}

/**
 * Get unique locations from all sitters
 */
export function getUniqueLocations(): string[] {
  const locations = new Set(sitters.map((s) => s.location))
  return Array.from(locations).sort()
}
