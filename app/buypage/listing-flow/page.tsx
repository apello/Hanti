"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface PropertyImage {
  id: number;
  image_path: string;
  image_order: number;
}

interface PropertyListing {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  property_type: string;
  transaction_type: string;
  property_images: PropertyImage[];
}

export default function ListingFlowPage() {
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setError("No property ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('property_listings')
          .select(`
            *,
            property_images (
              id,
              image_path,
              image_order
            )
          `)
          .eq('id', parseInt(propertyId))
          .single();

        if (error || !data) {
          setError("Property not found");
          return;
        }

        setProperty(data);
      } catch (err) {
        setError("Failed to fetch property");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleContactSubmit = async () => {
    try {
      setSubmitting(true);
      // TODO: Implement contact form submission
      console.log("Contact form submitted:", contactForm);
      alert("Message sent successfully!");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <Link href="/buypage" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Sort images by order
  const sortedImages = property.property_images?.sort((a, b) => a.image_order - b.image_order) || [];

  // Image navigation functions
  const nextImage = () => {
    if (sortedImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
    }
  };

  const prevImage = () => {
    if (sortedImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/buypage" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Properties for Sale
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {property.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {property.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {sortedImages.length > 0 ? (
                <div className="relative">
                  <img
                    src={`/buyrentkenya_data/${sortedImages[currentImageIndex].image_path}`}
                    alt={property.title}
                    className="w-full h-[500px] object-cover"
                  />
                  
                  {/* Navigation arrows */}
                  {sortedImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-md"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-md"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Image Gallery Dots */}
                  {sortedImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {sortedImages.slice(0, 8).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                        />
                      ))}
                      {sortedImages.length > 8 && (
                        <div className="w-2 h-2 rounded-full bg-white bg-opacity-30" />
                      )}
                    </div>
                  )}
                  
                  {/* Image count indicator */}
                  {sortedImages.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {sortedImages.length}
                    </div>
                  )}
                  
                  {/* Heart icon for favorites */}
                  <div className="absolute top-4 left-4">
                    <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-md">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">No Images Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {sortedImages.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">All Photos</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {sortedImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={`/buyrentkenya_data/${image.image_path}`}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Property Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Property Type:</span>
                  <span className="ml-2 font-medium">{property.property_type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Transaction Type:</span>
                  <span className="ml-2 font-medium">{property.transaction_type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="ml-2 font-medium">{property.bedrooms}</span>
                </div>
                <div>
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="ml-2 font-medium">{property.bathrooms}</span>
                </div>
                {property.area && property.area !== 'N/A' && (
                  <div>
                    <span className="text-gray-600">Area:</span>
                    <span className="ml-2 font-medium">{property.area}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {property.price}
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Contact Seller
              </button>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Request Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    placeholder="I'm interested in this property..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button
                  onClick={handleContactSubmit}
                  disabled={!contactForm.name || !contactForm.email || submitting}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
