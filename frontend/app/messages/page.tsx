"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Calendar,
  CheckCheck,
  Clock
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { demoConversations, demoMessages, getSitterById } from "@/lib/data"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(demoConversations[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(demoMessages.filter(m => m.conversationId === "c1"))
  const [showMobileList, setShowMobileList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSelectConversation = (conv: typeof selectedConversation) => {
    setSelectedConversation(conv)
    setMessages(demoMessages.filter(m => m.conversationId === conv.id))
    setShowMobileList(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: `m${messages.length + 1}`,
      conversationId: selectedConversation.id,
      senderId: "parent1",
      content: message,
      timestamp: new Date().toISOString(),
      read: true,
      type: "text" as const,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
    return date.toLocaleDateString()
  }

  const otherParticipant = selectedConversation.participants.find(p => p.id !== "parent1")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 h-screen flex flex-col">
        <div className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
          <div className="flex-1 bg-card border border-border/50 rounded-2xl overflow-hidden flex">
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
                    placeholder="Search messages..." 
                    className="pl-9 h-10 rounded-xl bg-secondary/50"
                  />
                </div>
              </div>

              {/* Conversation list */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {demoConversations.map((conv) => {
                    const other = conv.participants.find(p => p.id !== "parent1")
                    return (
                      <button
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv)}
                        className={`w-full p-3 rounded-xl flex items-start gap-3 transition-colors mb-1 ${
                          selectedConversation.id === conv.id
                            ? "bg-primary/10"
                            : "hover:bg-secondary/50"
                        }`}
                      >
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center">
                            <span className="text-xl">{other?.avatar}</span>
                          </div>
                          {conv.unread > 0 && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              {conv.unread}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-foreground truncate">{other?.name}</p>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatTime(conv.lastMessageTime)}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${conv.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {conv.lastMessage}
                          </p>
                        </div>
                      </button>
                    )
                  })}
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
                    <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center">
                      <span className="text-lg">{otherParticipant?.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{otherParticipant?.name}</p>
                      <p className="text-xs text-green-500">Online</p>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center gap-2">
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
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, idx) => {
                    const isOwn = msg.senderId === "parent1"
                    const showDate = idx === 0 || 
                      formatDate(messages[idx - 1].timestamp) !== formatDate(msg.timestamp)

                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                              {formatDate(msg.timestamp)}
                            </span>
                          </div>
                        )}

                        {msg.type === "booking_request" || msg.type === "booking_confirmed" ? (
                          <div className="flex justify-center my-4">
                            <div className="bg-secondary/50 rounded-xl p-4 max-w-sm text-center">
                              <Calendar className="h-6 w-6 mx-auto text-primary mb-2" />
                              <p className="text-sm text-foreground">{msg.content}</p>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] ${isOwn ? "order-2" : ""}`}>
                              <div
                                className={`rounded-2xl px-4 py-2.5 ${
                                  isOwn
                                    ? "bg-primary text-primary-foreground rounded-br-md"
                                    : "bg-secondary text-foreground rounded-bl-md"
                                }`}
                              >
                                <p className="text-sm">{msg.content}</p>
                              </div>
                              <div className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : ""}`}>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(msg.timestamp)}
                                </span>
                                {isOwn && msg.read && (
                                  <CheckCheck className="h-3 w-3 text-primary" />
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-4 border-t border-border/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1 h-12 rounded-xl"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-12 w-12 rounded-xl"
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
