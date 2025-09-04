"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Star,
  Shield,
  MapPin,
  Check,
  CheckCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock conversations data
const conversations = [
  {
    id: 1,
    agent: {
      name: "Sarah Johnson",
      avatar: "/agent-sarah.jpg",
      verified: true,
      rating: 4.9,
      online: true,
    },
    property: {
      title: "Modern 3BR Villa",
      location: "Westlands, Nairobi",
      price: "KSh 45,000,000",
    },
    lastMessage: "The property viewing is scheduled for tomorrow at 2 PM. I'll send you the exact location.",
    timestamp: "2 min ago",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "agent",
        content:
          "Hello! I see you're interested in the Modern 3BR Villa in Westlands. I'd be happy to help you with any questions.",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: 2,
        sender: "user",
        content: "Hi Sarah! Yes, I'm very interested. Could we schedule a viewing this week?",
        timestamp: "10:45 AM",
        read: true,
      },
      {
        id: 3,
        sender: "agent",
        content: "I have availability tomorrow (Wednesday) at 2 PM or Friday at 10 AM. Which works better for you?",
        timestamp: "10:47 AM",
        read: true,
      },
      {
        id: 4,
        sender: "user",
        content: "Tomorrow at 2 PM works perfectly for me. What's the exact address?",
        timestamp: "11:15 AM",
        read: true,
      },
      {
        id: 5,
        sender: "agent",
        content: "The property viewing is scheduled for tomorrow at 2 PM. I'll send you the exact location.",
        timestamp: "11:20 AM",
        read: false,
      },
    ],
  },
  {
    id: 2,
    agent: {
      name: "Michael Asante",
      avatar: "/agent-michael.jpg",
      verified: true,
      rating: 4.7,
      online: false,
    },
    property: {
      title: "Luxury Apartment",
      location: "Karen, Nairobi",
      price: "KSh 28,000,000",
    },
    lastMessage: "Thank you for your interest. The apartment has great amenities including a swimming pool and gym.",
    timestamp: "1 hour ago",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Hi, I'm interested in the luxury apartment in Karen. Could you tell me more about the amenities?",
        timestamp: "Yesterday 3:20 PM",
        read: true,
      },
      {
        id: 2,
        sender: "agent",
        content: "Thank you for your interest. The apartment has great amenities including a swimming pool and gym.",
        timestamp: "Yesterday 4:15 PM",
        read: true,
      },
    ],
  },
  {
    id: 3,
    agent: {
      name: "Grace Wanjiku",
      avatar: "/agent-grace.jpg",
      verified: true,
      rating: 4.8,
      online: true,
    },
    property: {
      title: "Family House",
      location: "Kilimani, Nairobi",
      price: "KSh 32,000,000",
    },
    lastMessage: "I can arrange a virtual tour if you'd like to see the property before visiting in person.",
    timestamp: "3 hours ago",
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "agent",
        content: "I can arrange a virtual tour if you'd like to see the property before visiting in person.",
        timestamp: "2:30 PM",
        read: false,
      },
    ],
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <button onClick={() => router.push("/")} className="text-xl font-bold text-foreground">
                Hanti
              </button>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => router.push("/")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => router.push("/listings")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Listings
              </button>
              <span className="text-foreground font-medium">Messages</span>
            </nav>
            <div className="flex items-center space-x-3">
              <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0">
                {/* Search Header */}
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/30 transition-colors ${
                        selectedConversation.id === conversation.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.agent.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conversation.agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.agent.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-sm truncate">{conversation.agent.name}</h3>
                              {conversation.agent.verified && <Shield className="h-3 w-3 text-accent" />}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                              {conversation.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conversation.property.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.agent.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedConversation.agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.agent.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{selectedConversation.agent.name}</h3>
                        {selectedConversation.agent.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{selectedConversation.agent.rating}</span>
                        <span>•</span>
                        <span>{selectedConversation.agent.online ? "Online" : "Offline"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Property Info */}
                <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{selectedConversation.property.title}</h4>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedConversation.property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{selectedConversation.property.price}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-transparent"
                        onClick={() => router.push(`/property/${selectedConversation.id}`)}
                      >
                        View Property
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                        {message.sender === "user" && (
                          <div className="ml-2">
                            {message.read ? (
                              <CheckCheck className="h-3 w-3 opacity-70" />
                            ) : (
                              <Check className="h-3 w-3 opacity-70" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
