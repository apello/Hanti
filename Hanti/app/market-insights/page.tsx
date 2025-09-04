"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Download, Calculator, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock market data
const marketData = {
  overview: {
    totalProperties: 15420,
    avgPrice: "$285,000",
    priceChange: "+5.2%",
    daysOnMarket: 45,
    marketTrend: "up"
  },
  topAreas: [
    { name: "Westlands", avgPrice: "$320,000", change: "+8.5%", properties: 1250 },
    { name: "Karen", avgPrice: "$450,000", change: "+6.2%", properties: 890 },
    { name: "Kilimani", avgPrice: "$280,000", change: "+4.8%", properties: 1100 },
    { name: "Lavington", avgPrice: "$380,000", change: "+5.1%", properties: 950 },
    { name: "Runda", avgPrice: "$520,000", change: "+7.3%", properties: 650 }
  ],
  propertyTypes: [
    { type: "Apartment", avgPrice: "$220,000", change: "+4.2%", marketShare: "45%" },
    { type: "House", avgPrice: "$380,000", change: "+6.1%", marketShare: "35%" },
    { type: "Villa", avgPrice: "$650,000", change: "+8.7%", marketShare: "15%" },
    { type: "Studio", avgPrice: "$150,000", change: "+3.5%", marketShare: "5%" }
  ],
  priceTrends: [
    { month: "Jan", price: 270000 },
    { month: "Feb", price: 275000 },
    { month: "Mar", price: 280000 },
    { month: "Apr", price: 285000 },
    { month: "May", price: 290000 },
    { month: "Jun", price: 295000 }
  ]
}

export default function MarketInsightsPage() {
  const [selectedArea, setSelectedArea] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [sqft, setSqft] = useState("")

  const calculateValuation = () => {
    // Mock AI valuation calculation
    const basePrice = 250000
    const areaMultiplier = selectedArea === "Westlands" ? 1.2 : selectedArea === "Karen" ? 1.5 : 1.0
    const typeMultiplier = propertyType === "Villa" ? 1.8 : propertyType === "House" ? 1.3 : 1.0
    const bedroomMultiplier = parseInt(bedrooms) * 0.1 + 1
    const sqftMultiplier = parseInt(sqft) / 1000

    const valuation = basePrice * areaMultiplier * typeMultiplier * bedroomMultiplier * sqftMultiplier
    return Math.round(valuation).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive real estate analytics and trends across Africa
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {marketData.overview.totalProperties.toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {marketData.overview.avgPrice}
                  </p>
                  <div className="flex items-center text-sm">
                    {marketData.overview.marketTrend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={marketData.overview.marketTrend === "up" ? "text-green-600" : "text-red-600"}>
                      {marketData.overview.priceChange}
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Days on Market</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {marketData.overview.daysOnMarket}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Market Status</p>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </Badge>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Valuation Tool */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  AI Property Valuation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketData.topAreas.map((area) => (
                        <SelectItem key={area.name} value={area.name}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Type
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketData.propertyTypes.map((type) => (
                        <SelectItem key={type.type} value={type.type}>
                          {type.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bedrooms
                  </label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Square Feet
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter sq ft"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={() => { }}>
                  Calculate Valuation
                </Button>

                {selectedArea && propertyType && bedrooms && sqft && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Value</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${calculateValuation()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top Areas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.topAreas.map((area, index) => (
                    <div key={area.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{area.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {area.properties} properties
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">{area.avgPrice}</p>
                        <div className="flex items-center text-sm text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {area.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Property Types Analysis */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Type Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketData.propertyTypes.map((type) => (
                  <div key={type.type} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{type.type}</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {type.avgPrice}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">{type.change}</span>
                      <span className="text-gray-600 dark:text-gray-400">{type.marketShare}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Trends Chart */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Interactive chart coming soon</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Price trends visualization will be implemented with Chart.js or Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Download Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  <span>Monthly Market Report</span>
                  <span className="text-xs text-gray-500 mt-1">PDF • 2.3 MB</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  <span>Area Analysis Report</span>
                  <span className="text-xs text-gray-500 mt-1">PDF • 1.8 MB</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  <span>Investment Guide</span>
                  <span className="text-xs text-gray-500 mt-1">PDF • 3.1 MB</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
