"use client"

import { useState } from "react"
import { Heart, MapPin, Bed, Bath, Square, Star, Shield, Phone, Mail, Calendar, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock property data
const property = {
  id: 1,
  title: "Modern Apartment in Westlands",
  location: "Westlands, Nairobi",
  price: "$250,000",
  pricePerSqft: "$2,500/sqft",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1200,
  yearBuilt: 2020,
  propertyType: "Apartment",
  status: "For Sale",
  verified: true,
  featured: true,
  description: "This stunning modern apartment offers the perfect blend of luxury and comfort. Located in the heart of Westlands, this property features high-end finishes, spacious rooms, and excellent amenities. Perfect for families or professionals seeking a premium living experience.",
  features: [
    "Balcony with city views",
    "Modern kitchen with appliances",
    "En-suite master bedroom",
    "Parking space included",
    "24/7 security",
    "Swimming pool",
    "Gym access",
    "Garden area"
  ],
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
  ],
  agent: {
    name: "Sarah Johnson",
    rating: 4.8,
    verified: true,
    phone: "+254 700 123 456",
    email: "sarah.johnson@hanti.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    experience: "5+ years",
    propertiesSold: 45,
    responseTime: "2 hours"
  },
  neighborhood: {
    schools: ["Westlands Primary", "Braeburn School", "ISK"],
    hospitals: ["Nairobi Hospital", "Aga Khan Hospital"],
    shopping: ["Westgate Mall", "Sarit Centre", "ABC Place"],
    transport: ["Westlands Bus Station", "Matatu routes", "Uber available"]
  },
  marketData: {
    avgPrice: "$2,400/sqft",
    priceTrend: "+5.2%",
    daysOnMarket: 15,
    similarProperties: 8
  }
}

// Similar properties
const similarProperties = [
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Karen, Nairobi",
    price: "$850,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 2800
  },
  {
    id: 3,
    title: "Cozy 2-Bedroom Apartment",
    location: "Kilimani, Nairobi",
    price: "$180,000",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 850
  },
  {
    id: 4,
    title: "Investment Property",
    location: "Lavington, Nairobi",
    price: "$320,000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1400
  }
]

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Properties</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                →
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {property.featured && (
                  <Badge className="bg-yellow-500 text-white">Featured</Badge>
                )}
                {property.verified && (
                  <Badge className="bg-green-600 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Property Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {property.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.pricePerSqft}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.sqft}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Year Built</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Neighborhood</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Schools</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                        {property.neighborhood.schools.map((school, index) => (
                          <li key={index}>{school}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shopping</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                        {property.neighborhood.shopping.map((shop, index) => (
                          <li key={index}>{shop}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Similar Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarProperties.map((prop) => (
                  <Card key={prop.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{prop.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{prop.location}</p>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {prop.price}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="mr-3">{prop.bedrooms} beds</span>
                        <span className="mr-3">{prop.bathrooms} baths</span>
                        <span>{prop.sqft} sqft</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{property.agent.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {property.agent.rating}
                      {property.agent.verified && (
                        <Shield className="h-4 w-4 text-green-600 ml-1" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    {property.agent.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    {property.agent.email}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                    <span className="text-gray-900 dark:text-white">{property.agent.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Properties Sold:</span>
                    <span className="text-gray-900 dark:text-white">{property.agent.propertiesSold}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                    <span className="text-gray-900 dark:text-white">{property.agent.responseTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Message Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Market Data */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Market Data</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Price/sqft:</span>
                    <span className="text-sm font-medium">{property.marketData.avgPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price Trend:</span>
                    <span className="text-sm font-medium text-green-600">{property.marketData.priceTrend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Days on Market:</span>
                    <span className="text-sm font-medium">{property.marketData.daysOnMarket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Similar Properties:</span>
                    <span className="text-sm font-medium">{property.marketData.similarProperties}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
