// Service layer for booking-related data operations
// This abstracts the data source and can be easily swapped for Supabase/API calls

import { demoBookings } from "../data"
import type { Booking } from "../types"

// Re-export types for convenience
export type { Booking } from "../types"

/**
 * Get all bookings for a parent
 * Future: Replace with Supabase query
 * await supabase.from('bookings').select('*').eq('parent_id', parentId)
 */
export function getBookingsForParent(parentId?: string): Booking[] {
  // In demo mode, return all demo bookings
  // Future: filter by parentId
  return demoBookings
}

/**
 * Get booking by ID
 * Future: Replace with Supabase query
 */
export function getBookingById(id: string): Booking | undefined {
  return demoBookings.find((b) => b.id === id)
}

/**
 * Get upcoming bookings
 */
export function getUpcomingBookings(): Booking[] {
  const today = new Date()
  return demoBookings.filter((b) => {
    const bookingDate = new Date(b.date)
    return bookingDate >= today && b.status !== "cancelled"
  })
}

/**
 * Get past bookings
 */
export function getPastBookings(): Booking[] {
  const today = new Date()
  return demoBookings.filter((b) => {
    const bookingDate = new Date(b.date)
    return bookingDate < today || b.status === "completed"
  })
}

/**
 * Get bookings by status
 */
export function getBookingsByStatus(status: Booking["status"]): Booking[] {
  return demoBookings.filter((b) => b.status === status)
}

/**
 * Create a new booking (mock)
 * Future: Replace with Supabase insert
 * await supabase.from('bookings').insert(booking)
 */
export async function createBooking(booking: Omit<Booking, "id">): Promise<Booking> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newBooking: Booking = {
    ...booking,
    id: `b${Date.now()}`,
  }
  
  // In a real app, this would be inserted into the database
  // For now, we just return the mock booking
  return newBooking
}

/**
 * Update booking status (mock)
 * Future: Replace with Supabase update
 */
export async function updateBookingStatus(
  bookingId: string, 
  status: Booking["status"]
): Promise<Booking | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const booking = demoBookings.find((b) => b.id === bookingId)
  if (!booking) return null
  
  // In a real app, this would update the database
  return { ...booking, status }
}

/**
 * Cancel a booking (mock)
 */
export async function cancelBooking(bookingId: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const booking = demoBookings.find((b) => b.id === bookingId)
  return !!booking
}

/**
 * Calculate booking statistics
 */
export function getBookingStats() {
  const total = demoBookings.length
  const confirmed = demoBookings.filter((b) => b.status === "confirmed").length
  const completed = demoBookings.filter((b) => b.status === "completed").length
  const pending = demoBookings.filter((b) => b.status === "pending").length
  
  return { total, confirmed, completed, pending }
}
