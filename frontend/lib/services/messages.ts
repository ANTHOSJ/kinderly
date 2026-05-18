// Service layer for messaging-related data operations
// This abstracts the data source and can be easily swapped for Supabase/API calls

import { demoConversations, demoMessages } from "../data"
import type { Conversation, Message } from "../types"

// Re-export types for convenience
export type { Conversation, Message } from "../types"

/**
 * Get all conversations for a user
 * Future: Replace with Supabase query
 * await supabase.from('conversations').select('*').contains('participants', [userId])
 */
export function getConversations(userId?: string): Conversation[] {
  // In demo mode, return all demo conversations
  // Future: filter by userId
  return demoConversations
}

/**
 * Get conversation by ID
 */
export function getConversationById(id: string): Conversation | undefined {
  return demoConversations.find((c) => c.id === id)
}

/**
 * Get messages for a conversation
 * Future: Replace with Supabase query
 * await supabase.from('messages').select('*').eq('conversation_id', conversationId).order('timestamp')
 */
export function getMessagesByConversationId(conversationId: string): Message[] {
  return demoMessages.filter((m) => m.conversationId === conversationId)
}

/**
 * Get unread message count
 */
export function getUnreadCount(userId?: string): number {
  return demoConversations.reduce((acc, c) => acc + c.unread, 0)
}

/**
 * Send a message (mock)
 * Future: Replace with Supabase insert
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
  type: Message["type"] = "text"
): Promise<Message> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const newMessage: Message = {
    id: `m${Date.now()}`,
    conversationId,
    senderId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
    type,
  }
  
  return newMessage
}

/**
 * Mark messages as read (mock)
 * Future: Replace with Supabase update
 */
export async function markMessagesAsRead(
  conversationId: string,
  userId: string
): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return true
}

/**
 * Create or get conversation with a sitter
 * Future: This would check if a conversation exists and create if not
 */
export async function getOrCreateConversation(
  parentId: string,
  sitterId: string
): Promise<Conversation> {
  // Check if conversation already exists
  const existing = demoConversations.find(
    (c) => c.participants.some((p) => p.id === sitterId)
  )
  
  if (existing) return existing
  
  // In a real app, we would create a new conversation
  // For now, return the first demo conversation
  return demoConversations[0]
}

/**
 * Get conversation participants
 */
export function getOtherParticipant(
  conversation: Conversation,
  currentUserId: string
) {
  return conversation.participants.find((p) => p.id !== currentUserId)
}
