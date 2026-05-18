// Central export for all services
// This allows clean imports like: import { getSitterById, createBooking } from "@/lib/services"

// Sitter services
export {
  getAllSitters,
  getSitterById,
  getSitterByIdAsync,
  getSittersByLocation,
  getAvailableSitters,
  searchSitters,
  getReviewsBySitterId,
  getAllReviews,
  getSitterStats,
  getUniqueLocations,
} from "./sitters"

// Booking services
export {
  getBookingsForParent,
  getBookingById,
  getUpcomingBookings,
  getPastBookings,
  getBookingsByStatus,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getBookingStats,
} from "./bookings"

// Message services
export {
  getConversations,
  getConversationById,
  getMessagesByConversationId,
  getUnreadCount,
  sendMessage,
  markMessagesAsRead,
  getOrCreateConversation,
  getOtherParticipant,
} from "./messages"

// Re-export all types
export type {
  Sitter,
  Review,
  Booking,
  Message,
  Conversation,
  Testimonial,
  TrustFeature,
  HowItWorksStep,
  Parent,
} from "../types"
