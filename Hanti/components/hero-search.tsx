"use client"

import { useState } from "react"
import { Search, MapPin, DollarSign, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSearch() {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const handleSearch = () => {
    // Navigate to listings page with search params
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (propertyType) params.append("type", propertyType)
    if (priceRange) params.append("price", priceRange)

    window.location.href = `/listings?${params.toString()}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Property Type */}
          <div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">$0 - $50,000</SelectItem>
                <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                <SelectItem value="100000-200000">$100,000 - $200,000</SelectItem>
                <SelectItem value="200000-500000">$200,000 - $500,000</SelectItem>
                <SelectItem value="500000+">$500,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Home className="h-3 w-3 mr-1" />
            Buy
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Home className="h-3 w-3 mr-1" />
            Rent
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            Under $100K
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Nairobi
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Lagos
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Cape Town
          </Button>
        </div>
      </div>
    </div>
  )
}
