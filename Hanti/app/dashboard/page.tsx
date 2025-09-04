"use client"

import { useState } from "react"
import {
  Home,
  Heart,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  FileText,
  Star,
  MapPin,
  Phone,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "buyer", // buyer, agent, developer
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  verified: true
}

// Mock dashboard data
const dashboardData = {
  buyer: {
    savedProperties: 12,
    scheduledVisits: 3,
    unreadMessages: 5,
    recentSearches: [
      { query: "3 bedroom apartments in Westlands", date: "2024-01-15" },
      { query: "Houses under $300k in Karen", date: "2024-01-10" }
    ],
    savedProperties: [
      {
        id: 1,
        title: "Modern Apartment in Westlands",
        price: "$250,000",
        location: "Westlands, Nairobi",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
        agent: "Sarah Johnson"
      },
      {
        id: 2,
        title: "Luxury Villa with Pool",
        price: "$850,000",
        location: "Karen, Nairobi",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop",
        agent: "Michael Chen"
      }
    ]
  },
  agent: {
    totalListings: 25,
    activeListings: 18,
    pendingApprovals: 3,
    monthlyViews: 1247,
    recentInquiries: [
      { property: "Modern Apartment", client: "Alice Smith", date: "2024-01-15" },
      { property: "Luxury Villa", client: "Bob Johnson", date: "2024-01-14" }
    ],
    performance: {
      views: 1247,
      inquiries: 45,
      conversions: 12,
      rating: 4.8
    }
  },
  developer: {
    totalProjects: 8,
    activeProjects: 5,
    totalUnits: 240,
    soldUnits: 180,
    recentLeads: [
      { project: "Sunset Heights", client: "Investment Group", date: "2024-01-15" },
      { project: "Green Valley", client: "Individual Buyer", date: "2024-01-14" }
    ],
    projects: [
      {
        id: 1,
        name: "Sunset Heights",
        location: "Westlands, Nairobi",
        units: 50,
        sold: 35,
        status: "active"
      },
      {
        id: 2,
        name: "Green Valley",
        location: "Karen, Nairobi",
        units: 30,
        sold: 25,
        status: "active"
      }
    ]
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Saved Properties</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.buyer.savedProperties}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled Visits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.buyer.scheduledVisits}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.buyer.unreadMessages}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData.buyer.savedProperties.map((property) => (
              <div key={property.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{property.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{property.location}</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{property.price}</p>
                    <p className="text-xs text-gray-500">Agent: {property.agent}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Contact Agent</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dashboardData.buyer.recentSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900 dark:text-white">{search.query}</span>
                </div>
                <span className="text-xs text-gray-500">{search.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAgentDashboard = () => (
    <div className="space-y-6">
      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.agent.totalListings}
                </p>
              </div>
              <Home className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.agent.activeListings}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.agent.monthlyViews.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {dashboardData.agent.performance.rating}
                  </p>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.agent.recentInquiries.map((inquiry, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{inquiry.property}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Client: {inquiry.client}</p>
                  <p className="text-xs text-gray-500">{inquiry.date}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Add New Listing</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span>Manage Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDeveloperDashboard = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.developer.totalProjects}
                </p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.developer.activeProjects}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Units</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.developer.totalUnits}
                </p>
              </div>
              <Home className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sold Units</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.developer.soldUnits}
                </p>
                <p className="text-xs text-green-600">
                  {Math.round((dashboardData.developer.soldUnits / dashboardData.developer.totalUnits) * 100)}% sold
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.developer.projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.location}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Units: {project.units}</span>
                    <span className="text-sm text-gray-500">Sold: {project.sold}</span>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.developer.recentLeads.map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{lead.project}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Client: {lead.client}</p>
                  <p className="text-xs text-gray-500">{lead.date}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome back, {user.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {["overview", "properties", "messages", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <>
            {user.role === "buyer" && renderBuyerDashboard()}
            {user.role === "agent" && renderAgentDashboard()}
            {user.role === "developer" && renderDeveloperDashboard()}
          </>
        )}

        {activeTab === "properties" && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 dark:text-gray-400">Properties management coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "messages" && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 dark:text-gray-400">Messages coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 dark:text-gray-400">Settings coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
