"use client"

import { useState } from "react"
import { Search, MapPin, Filter, Grid, List, Map, Heart, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Westlands",
    location: "Westlands, Nairobi",
    price: "$250,000",
    pricePerSqft: "$2,500/sqft",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "Sarah Johnson",
      rating: 4.8,
      verified: true
    },
    type: "Apartment",
    status: "For Sale",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Karen, Nairobi",
    price: "$850,000",
    pricePerSqft: "$3,200/sqft",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "Michael Chen",
      rating: 4.9,
      verified: true
    },
    type: "Villa",
    status: "For Sale",
    featured: true
  },
  {
    id: 3,
    title: "Cozy 2-Bedroom Apartment",
    location: "Kilimani, Nairobi",
    price: "$180,000",
    pricePerSqft: "$2,200/sqft",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "David Ochieng",
      rating: 4.7,
      verified: true
    },
    type: "Apartment",
    status: "For Sale",
    featured: false
  },
  {
    id: 4,
    title: "Investment Property",
    location: "Lavington, Nairobi",
    price: "$320,000",
    pricePerSqft: "$2,800/sqft",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "Grace Wanjiku",
      rating: 4.6,
      verified: true
    },
    type: "House",
    status: "For Sale",
    featured: false
  },
  {
    id: 5,
    title: "Studio Apartment",
    location: "CBD, Nairobi",
    price: "$120,000",
    pricePerSqft: "$2,000/sqft",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "John Kamau",
      rating: 4.5,
      verified: true
    },
    type: "Studio",
    status: "For Sale",
    featured: false
  },
  {
    id: 6,
    title: "Family Home",
    location: "Runda, Nairobi",
    price: "$450,000",
    pricePerSqft: "$2,900/sqft",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    verified: true,
    agent: {
      name: "Mary Wambui",
      rating: 4.8,
      verified: true
    },
    type: "House",
    status: "For Sale",
    featured: false
  }
]

export default function ListingsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")
  const [bedrooms, setBedrooms] = useState("")

  const handleViewDetails = (propertyId: number) => {
    router.push(`/property/${propertyId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Property Listings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {properties.length} properties found
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "map" ? (
          <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Map view coming soon</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
            }`}>
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className={`object-cover ${viewMode === "list" ? "w-64 h-48" : "w-full h-48"
                      }`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {property.verified && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {property.title}
                    </h3>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {property.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.pricePerSqft}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      {property.bedrooms} beds
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🚿</span>
                      {property.bathrooms} baths
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">📏</span>
                      {property.sqft} sqft
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {property.agent.name}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {property.agent.rating}
                          {property.agent.verified && (
                            <Shield className="h-3 w-3 ml-1 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      View Details
                    </Button>
                    <Button className="flex-1">
                      Contact Agent
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
