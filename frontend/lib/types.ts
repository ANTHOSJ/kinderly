// Types and interfaces for the Kinderly application
// These types are designed to match future Supabase database schema

export interface Sitter {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  distance: string
  hourlyRate: number
  experience: string
  experienceYears: number
  badges: string[]
  bio: string
  available: boolean
  verified: boolean
  trustScore: number
  languages: string[]
  responseTime: string
  location: string
  availability: {
    weekdays: boolean
    weekends: boolean
    evenings: boolean
    overnight: boolean
  }
  gallery: string[]
  certifications: {
    name: string
    issuer: string
    year: number
  }[]
  education: string
  specialties: string[]
  // Future fields for database
  createdAt?: string
  updatedAt?: string
  userId?: string
}

export interface Review {
  id: string
  sitterId: string
  parentName: string
  parentAvatar: string
  rating: number
  date: string
  content: string
  helpful: number
  // Future fields for database
  parentId?: string
  createdAt?: string
}

export interface Booking {
  id: string
  sitterId: string
  sitterName: string
  sitterAvatar: string
  date: string
  startTime: string
  endTime: string
  hours: number
  totalCost: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string
  address: string
  children: { name: string; age: number }[]
  // Future fields for database
  parentId?: string
  createdAt?: string
  updatedAt?: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
  type: "text" | "booking_request" | "booking_confirmed" | "system"
}

export interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar: string
    role: "parent" | "sitter"
  }[]
  lastMessage: string
  lastMessageTime: string
  unread: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
  location: string
  date: string
  featured: boolean
  isSitter?: boolean
}

export interface TrustFeature {
  title: string
  description: string
  icon: string
}

export interface HowItWorksStep {
  step: number
  title: string
  description: string
  icon: string
}

// Parent/User profile type for future auth
export interface Parent {
  id: string
  name: string
  email: string
  avatar: string
  phone?: string
  address?: string
  children: {
    name: string
    age: number
    notes?: string
  }[]
  createdAt?: string
  updatedAt?: string
}
