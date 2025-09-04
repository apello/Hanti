"use client"

import { useState } from "react"
import { Heart, MapPin, Bed, Bath, Square, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"

// Mock data for featured properties
const featuredProperties = [
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
    status: "For Sale"
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
    status: "For Sale"
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
    status: "For Sale"
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
    status: "For Sale"
  }
]

export function FeaturedProperties() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredProperties.length / 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(featuredProperties.length / 2)) % Math.ceil(featuredProperties.length / 2))
  }

  const handleViewDetails = (propertyId: number) => {
    router.push(`/property/${propertyId}`)
  }

  const visibleProperties = featuredProperties.slice(currentIndex * 2, currentIndex * 2 + 2)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
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
              {property.verified && (
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-green-600 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
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
                  <Bed className="h-4 w-4 mr-1" />
                  {property.bedrooms} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.bathrooms} baths
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        →
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(featuredProperties.length / 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
