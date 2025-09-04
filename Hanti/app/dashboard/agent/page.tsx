"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Plus,
  TrendingUp,
  Users,
  MessageCircle,
  Calendar,
  Eye,
  DollarSign,
  Star,
  Shield,
  Edit,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock agent data
const agentData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@hanti.com",
  phone: "+254 712 345 678",
  rating: 4.9,
  reviews: 127,
  verified: true,
  joinDate: "January 2023",
  stats: {
    activeListings: 15,
    totalSales: 45,
    monthlyViews: 2340,
    pendingInquiries: 8,
  },
}

// Mock agent properties
const agentProperties = [
  {
    id: 1,
    title: "Modern 3BR Villa",
    price: "KSh 45,000,000",
    location: "Westlands, Nairobi",
    status: "active",
    views: 234,
    inquiries: 12,
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    price: "KSh 28,000,000",
    location: "Karen, Nairobi",
    status: "pending",
    views: 156,
    inquiries: 8,
    dateAdded: "2024-01-10",
  },
]

export default function AgentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

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
              <span className="text-foreground font-medium">Agent Dashboard</span>
            </nav>
            <div className="flex items-center space-x-3">
              <Button onClick={() => router.push("/listings/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/agent-avatar.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Agent Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/agent-avatar.jpg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{agentData.name}</h1>
                    {agentData.verified && (
                      <Badge className="bg-accent">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Agent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span>
                        {agentData.rating} ({agentData.reviews} reviews)
                      </span>
                    </div>
                    <span>Member since {agentData.joinDate}</span>
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                    <p className="text-2xl font-bold">{agentData.stats.activeListings}</p>
                  </div>
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold">{agentData.stats.totalSales}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Views</p>
                    <p className="text-2xl font-bold">{agentData.stats.monthlyViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Inquiries</p>
                    <p className="text-2xl font-bold">{agentData.stats.pendingInquiries}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Properties */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Properties</CardTitle>
                <Button onClick={() => router.push("/listings/create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`/modern-african-house-exterior-.png?height=80&width=120&query=property ${property.id}`}
                        alt={property.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <p className="font-medium text-primary">{property.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="text-center">
                        <p className="font-medium">{property.views}</p>
                        <p>Views</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{property.inquiries}</p>
                        <p>Inquiries</p>
                      </div>
                      <Badge variant={property.status === "active" ? "default" : "secondary"}>{property.status}</Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/dashboard/agent/analytics")}
            >
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your performance and insights</p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/dashboard/agent/clients")}
            >
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Manage Clients</h3>
                <p className="text-sm text-muted-foreground">View and manage your client relationships</p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/dashboard/agent/schedule")}
            >
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Schedule</h3>
                <p className="text-sm text-muted-foreground">Manage property visits and appointments</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
