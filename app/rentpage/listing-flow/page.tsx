"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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

export default function RentalListingPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [property, setProperty] = useState<RentalListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("rental_listing")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (error) {
          setError(error.message);
          return;
        }
        setProperty(data || null);
      } catch (err) {
        setError("Failed to fetch property");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || "Property not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <a href="/rentpage" className="inline-block text-blue-600 hover:underline mb-4">&larr; Back to Rental Listings</a>
        </div>
        {/* Title & Price */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="text-xl text-gray-700 mb-4">{property.price}</div>

        {/* Image Gallery */}
        <div className="mb-6">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            {property.images && property.images.length > 0 ? (
              <Image
                src={`/rentaldata/${property.images[selectedImage]}`}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover rounded-lg"
                priority
                quality={90}
                style={{objectFit: "cover"}}
              />
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
            {/* Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((img, idx) => (
                  <button
                    key={img}
                    className={`w-8 h-8 border-2 rounded-lg overflow-hidden focus:outline-none ${selectedImage === idx ? "border-blue-500" : "border-white"}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      src={`/rentaldata/${img}`}
                      alt="thumb"
                      width={48}
                      height={48}
                      className="object-cover rounded"
                      quality={90}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 text-gray-700">
            <span><strong>Bedrooms:</strong> {property.bedrooms}</span>
            <span><strong>Bathrooms:</strong> {property.bathrooms}</span>
            {property.area && property.area !== "N/A" && (
              <span><strong>Area:</strong> {property.area}</span>
            )}
            <span><strong>Type:</strong> {property.property_type}</span>
            <span><strong>Transaction:</strong> {property.transaction_type}</span>
          </div>
          <div className="mt-2 text-gray-600">
            <strong>Location:</strong> {property.location}
          </div>
        </div>

        {/* Contact Seller */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Interested in this property?</h2>
          <p className="mb-4 text-gray-600">Contact the seller to learn more or schedule a viewing.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full border rounded px-3 py-2" />
            <input type="email" placeholder="Your Email" className="w-full border rounded px-3 py-2" />
            <textarea placeholder="Your Message" className="w-full border rounded px-3 py-2" rows={4} />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
