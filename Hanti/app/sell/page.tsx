"use client"

import { useState } from "react"
import { Upload, Home, Building, Users, DollarSign, MapPin, Calendar, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function SellPage() {
    const [formData, setFormData] = useState({
        propertyType: "",
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        yearBuilt: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        images: [] as File[]
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Property listing submitted:", formData)
        // Handle form submission
    }

    const sellOptions = [
        {
            icon: Home,
            title: "List Your Property",
            description: "Sell your property with our verified agents",
            features: ["Professional photography", "Market analysis", "Virtual tours", "24/7 support"]
        },
        {
            icon: Users,
            title: "Become an Agent",
            description: "Join our network of verified real estate professionals",
            features: ["Commission structure", "Marketing tools", "Lead generation", "Training support"]
        },
        {
            icon: Building,
            title: "Developer Partnership",
            description: "Partner with us for your real estate projects",
            features: ["Project marketing", "Sales support", "Market insights", "Investor network"]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Sell Your Property
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            List your property with Africa's most trusted real estate platform. Get maximum exposure and connect with serious buyers.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Sell Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {sellOptions.map((option, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <option.icon className="h-8 w-8 text-blue-600" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {option.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {option.description}
                                </p>

                                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                    {option.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center justify-center">
                                            <span className="mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full mt-4">
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Property Listing Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Home className="h-5 w-5 mr-2" />
                            List Your Property
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Property Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Property Type
                                    </label>
                                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="condo">Condo</SelectItem>
                                            <SelectItem value="land">Land</SelectItem>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Price
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="number"
                                            placeholder="Enter price"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange("price", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Property Title
                                    </label>
                                    <Input
                                        placeholder="e.g., Modern 3-Bedroom Apartment in Westlands"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Enter location"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bedrooms
                                    </label>
                                    <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
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
                                        Bathrooms
                                    </label>
                                    <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select bathrooms" />
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
                                        placeholder="Enter square footage"
                                        value={formData.sqft}
                                        onChange={(e) => handleInputChange("sqft", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Year Built
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Enter year built"
                                        value={formData.yearBuilt}
                                        onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Property Description
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Describe your property, features, amenities, and what makes it special..."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Property Images
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Upload high-quality images of your property
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <Button variant="outline" type="button">
                                            Choose Files
                                        </Button>
                                    </label>
                                </div>
                                {formData.images.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            Selected images: {formData.images.length}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.images.map((file, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {file.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Information */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Contact Name
                                        </label>
                                        <Input
                                            placeholder="Your full name"
                                            value={formData.contactName}
                                            onChange={(e) => handleInputChange("contactName", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.contactEmail}
                                                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="tel"
                                                placeholder="+254 700 000 000"
                                                value={formData.contactPhone}
                                                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button type="submit" size="lg">
                                    List Property
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Why Choose Hanti */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Why Choose Hanti to Sell Your Property?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Verified Buyers</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with pre-verified serious buyers</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Best Price</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get market analysis and optimal pricing</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fast Sale</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Average sale time of 45 days</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Home className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Professional Support</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dedicated agent support throughout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
