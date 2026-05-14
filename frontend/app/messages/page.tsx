"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Calendar,
  CheckCheck,
  Clock,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Star,
  MapPin,
  X,
  Check
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoConversations, demoMessages, getSitterById, type Conversation, type Message } from "@/lib/data"

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-xs text-muted-foreground ml-2">typing...</span>
    </div>
  )
}

// Online status indicator
function OnlineStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500" : "bg-muted-foreground/50"}`} />
      <span className={`text-xs ${isOnline ? "text-green-600" : "text-muted-foreground"}`}>
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  )
}

// Booking card component for chat
function BookingCard({ 
  type, 
  date, 
  time, 
  status,
  onAccept,
  onDecline
}: { 
  type: "request" | "confirmed" | "completed"
  date: string
  time: string
  status?: "pending" | "accepted" | "declined"
  onAccept?: () => void
  onDecline?: () => void
}) {
  const getStatusColor = () => {
    switch (type) {
      case "request": return "border-yellow-200 bg-yellow-50"
      case "confirmed": return "border-green-200 bg-green-50"
      case "completed": return "border-muted bg-muted/30"
      default: return "border-border bg-card"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "request": return <Clock className="h-5 w-5 text-yellow-600" />
      case "confirmed": return <Check className="h-5 w-5 text-green-600" />
      case "completed": return <CheckCheck className="h-5 w-5 text-muted-foreground" />
      default: return <Calendar className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className={`rounded-xl border p-4 max-w-xs ${getStatusColor()}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground">
            {type === "request" ? "Booking Request" : type === "confirmed" ? "Booking Confirmed" : "Booking Completed"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{date}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
          
          {type === "request" && status === "pending" && (
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="h-8 rounded-lg text-xs" onClick={onAccept}>
                Accept
              </Button>
              <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" onClick={onDecline}>
                Decline
              </Button>
            </div>
          )}
          
          {type === "confirmed" && (
            <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs mt-3" asChild>
              <Link href="/dashboard/parent">View Details</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Quick reply suggestions
function QuickReplies({ 
  suggestions, 
  onSelect 
}: { 
  suggestions: string[]
  onSelect: (text: string) => void 
}) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border/50 bg-secondary/20">
      <span className="text-xs text-muted-foreground self-center mr-1">Quick replies:</span>
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          onClick={() => onSelect(suggestion)}
          className="text-xs px-3 py-1.5 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

// Message skeleton for loading state
function MessageSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-[70%] ${i % 2 === 0 ? "" : "order-2"}`}>
            <Skeleton className={`h-12 ${i % 2 === 0 ? "w-48" : "w-36"} rounded-2xl`} />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Conversation list item
function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  onlineUsers
}: {
  conversation: Conversation
  isSelected: boolean
  onSelect: () => void
  onlineUsers: Set<string>
}) {
  const other = conversation.participants.find(p => p.id !== "parent1")
  if (!other) return null
  
  const isOnline = onlineUsers.has(other.id)
  
  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all mb-1 ${
        isSelected
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-secondary/50"
      }`}
    >
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center">
          <span className="text-xl">{other.avatar}</span>
        </div>
        {/* Online indicator */}
        <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background ${
          isOnline ? "bg-green-500" : "bg-muted-foreground/30"
        }`} />
        {conversation.unread > 0 && (
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
            {conversation.unread}
          </div>
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={`font-medium truncate ${conversation.unread > 0 ? "text-foreground" : "text-foreground"}`}>
            {other.name}
          </p>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatRelativeTime(conversation.lastMessageTime)}
          </span>
        </div>
        <p className={`text-sm truncate ${conversation.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          {conversation.lastMessage}
        </p>
      </div>
    </button>
  )
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function formatRelativeTime(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
  return date.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(demoConversations[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(demoMessages.filter(m => m.conversationId === "c1"))
  const [showMobileList, setShowMobileList] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Simulate online users (in real app this would come from presence system)
  const [onlineUsers] = useState(new Set(["1", "2"])) // Emma and Michael are online

  // Quick reply suggestions based on conversation context
  const quickReplies = [
    "Sounds great!",
    "What time works?",
    "Thank you!",
    "See you then!"
  ]

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectConversation = (conv: typeof selectedConversation) => {
    setIsLoading(true)
    setSelectedConversation(conv)
    setShowMobileList(false)
    
    // Simulate loading messages
    setTimeout(() => {
      setMessages(demoMessages.filter(m => m.conversationId === conv.id))
      setIsLoading(false)
    }, 300)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: `m${messages.length + Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: "parent1",
      content: message,
      timestamp: new Date().toISOString(),
      read: true,
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate typing response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate auto-reply
      const autoReply: Message = {
        id: `m${messages.length + Date.now() + 1}`,
        conversationId: selectedConversation.id,
        senderId: selectedConversation.participants.find(p => p.id !== "parent1")?.id || "",
        content: getAutoReply(message),
        timestamp: new Date().toISOString(),
        read: true,
        type: "text",
      }
      setMessages(prev => [...prev, autoReply])
    }, 2000)
  }

  const handleQuickReply = (text: string) => {
    setMessage(text)
    inputRef.current?.focus()
  }

  // Simple auto-reply logic for demo
  const getAutoReply = (msg: string) => {
    const lowerMsg = msg.toLowerCase()
    if (lowerMsg.includes("time") || lowerMsg.includes("when")) {
      return "I'm flexible! What time works best for your family?"
    }
    if (lowerMsg.includes("thank")) {
      return "You're welcome! Looking forward to it."
    }
    if (lowerMsg.includes("book") || lowerMsg.includes("available")) {
      return "Yes, I'm available! Would you like to book through the app?"
    }
    return "Sounds good! Let me know if you have any questions."
  }

  // Filter conversations by search
  const filteredConversations = demoConversations.filter(conv => {
    if (!searchQuery) return true
    const other = conv.participants.find(p => p.id !== "parent1")
    return other?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const otherParticipant = selectedConversation.participants.find(p => p.id !== "parent1")
  const sitterInfo = otherParticipant ? getSitterById(otherParticipant.id) : null
  const isOtherOnline = otherParticipant ? onlineUsers.has(otherParticipant.id) : false

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 h-screen flex flex-col">
        <div className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
          <div className="flex-1 bg-card border border-border/50 rounded-2xl overflow-hidden flex shadow-lg">
            {/* Conversation list */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-border/50 flex flex-col ${showMobileList ? "block" : "hidden md:flex"}`}>
              {/* List header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-semibold text-foreground">Messages</h1>
                  <Badge variant="secondary" className="rounded-full">
                    {demoConversations.reduce((acc, c) => acc + c.unread, 0)} new
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-9 pr-9 h-10 rounded-xl bg-secondary/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              </div>

              {/* Conversation list */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm">No conversations found</p>
                    </div>
                  ) : (
                    filteredConversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isSelected={selectedConversation.id === conv.id}
                        onSelect={() => handleSelectConversation(conv)}
                        onlineUsers={onlineUsers}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Chat area */}
            <div className={`flex-1 flex flex-col ${!showMobileList ? "block" : "hidden md:flex"}`}>
              {/* Chat header */}
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden rounded-full"
                    onClick={() => setShowMobileList(true)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Link 
                    href={`/sitters/${otherParticipant?.id}`}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
                        <span className="text-lg">{otherParticipant?.avatar}</span>
                      </div>
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        isOtherOnline ? "bg-green-500" : "bg-muted-foreground/30"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{otherParticipant?.name}</p>
                      <OnlineStatus isOnline={isOtherOnline} />
                    </div>
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  {sitterInfo && (
                    <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 rounded-full bg-secondary/50">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{sitterInfo.rating}</span>
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1">
                {isLoading ? (
                  <MessageSkeleton />
                ) : (
                  <div className="p-4 space-y-4">
                    {messages.map((msg, idx) => {
                      const isOwn = msg.senderId === "parent1"
                      const showDate = idx === 0 || 
                        formatDate(messages[idx - 1].timestamp) !== formatDate(msg.timestamp)

                      return (
                        <div key={msg.id}>
                          {showDate && (
                            <div className="text-center my-6">
                              <span className="text-xs text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full">
                                {formatDate(msg.timestamp)}
                              </span>
                            </div>
                          )}

                          {msg.type === "booking_request" ? (
                            <div className="flex justify-center my-4">
                              <BookingCard
                                type="request"
                                date="Saturday, Jan 27"
                                time="6:00 PM - 10:00 PM"
                                status="pending"
                              />
                            </div>
                          ) : msg.type === "booking_confirmed" ? (
                            <div className="flex justify-center my-4">
                              <BookingCard
                                type="confirmed"
                                date="Saturday, Jan 27"
                                time="6:00 PM - 10:00 PM"
                              />
                            </div>
                          ) : (
                            <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                              {!isOwn && (
                                <div className="h-8 w-8 rounded-full bg-accent/50 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                  <span className="text-sm">{otherParticipant?.avatar}</span>
                                </div>
                              )}
                              <div className="max-w-[70%]">
                                <div
                                  className={`rounded-2xl px-4 py-2.5 ${
                                    isOwn
                                      ? "bg-primary text-primary-foreground rounded-br-md"
                                      : "bg-secondary text-foreground rounded-bl-md"
                                  }`}
                                >
                                  <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 mt-1 ${isOwn ? "justify-end" : ""}`}>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTime(msg.timestamp)}
                                  </span>
                                  {isOwn && msg.read && (
                                    <CheckCheck className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/50 flex items-center justify-center">
                          <span className="text-sm">{otherParticipant?.avatar}</span>
                        </div>
                        <div className="bg-secondary rounded-2xl rounded-bl-md">
                          <TypingIndicator />
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Quick replies */}
              <QuickReplies suggestions={quickReplies} onSelect={handleQuickReply} />

              {/* Message input */}
              <div className="p-4 border-t border-border/50 bg-background">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hidden sm:flex">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <Input
                    ref={inputRef}
                    placeholder="Type a message..."
                    className="flex-1 h-12 rounded-xl"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hidden sm:flex">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-12 w-12 rounded-xl shadow-lg shadow-primary/20"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
