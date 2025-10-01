"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface RentalListing {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  property_type: string;
  transaction_type: string;
  images: string[];
}

export default function RentPage() {
  const [properties, setProperties] = useState<RentalListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("rental_listing")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          setError(error.message);
          return;
        }

        setProperties(data || []);
      } catch (err) {
        setError("Failed to fetch rental properties");
        console.error("Error fetching rental properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading rental properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Properties for Rent
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {properties.length} rental properties found
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rental properties found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/rentpage/listing-flow?id=${property.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Property Image */}
                <div className="relative h-64 bg-gray-200">
                  {property.images && property.images.length > 0 ? (
                    <>
                      <img
                        src={`/rentaldata/${property.images[0]}`}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Image navigation dots */}
                      {property.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {property.images.slice(0, 5).map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === 0 ? "bg-white" : "bg-white bg-opacity-50"
                              }`}
                            />
                          ))}
                          {property.images.length > 5 && (
                            <div className="w-2 h-2 rounded-full bg-white bg-opacity-30" />
                          )}
                        </div>
                      )}
                      {/* Heart icon for favorites */}
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">No Image Available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-5">
                  {/* Price */}
                  <div className="text-2xl font-bold text-gray-900 mb-3">
                    {property.price}
                  </div>

                  {/* Property Specs */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="font-medium">{property.bedrooms} bds</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="font-medium">{property.bathrooms} ba</span>
                    {property.area && property.area !== "N/A" && (
                      <>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="font-medium">{property.area}</span>
                      </>
                    )}
                    <span className="mx-2 text-gray-400">-</span>
                    <span className="text-gray-500">{property.property_type} for {property.transaction_type ? property.transaction_type.toLowerCase() : "rent"}</span>
                  </div>

                  {/* Location */}
                  <div className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                    {property.location}
                  </div>

                  {/* Agent/Brokerage placeholder */}
                  <div className="text-xs text-gray-500">
                    HANTI REAL ESTATE
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
