"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewSellerListing() {
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [timeline, setTimeline] = useState("");
    const [squareFootage, setSquareFootage] = useState<number | "">("");
    const [yearBuilt, setYearBuilt] = useState<number | "">("");
    const [bedrooms, setBedrooms] = useState<number>(0);
    const [bathroomsFull, setBathroomsFull] = useState<number>(0);
    const [bathroomsThreeQuarter, setBathroomsThreeQuarter] = useState<number>(0);
    const [bathroomsHalf, setBathroomsHalf] = useState<number>(0);
    const [floors, setFloors] = useState<number>(0);
    const [hasPool, setHasPool] = useState<string>("no");
    const [poolType, setPoolType] = useState<string>("");
    const [parkingSpaces, setParkingSpaces] = useState<number>(0);
    const [isGatedCommunity, setIsGatedCommunity] = useState<string>("no");
    const [hasBasement, setHasBasement] = useState<string>("no");
    const [basementSquareFootage, setBasementSquareFootage] = useState<number | undefined>(undefined);
    const [askingPrice, setAskingPrice] = useState(0);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        // Build a full PropertyListing-shaped object and save locally
        const listing = {
            address,
            timeline,
            squareFootage: typeof squareFootage === 'number' ? squareFootage : 0,
            yearBuilt: typeof yearBuilt === 'number' ? yearBuilt : 0,
            bedrooms,
            bathrooms: { full: bathroomsFull, threeQuarter: bathroomsThreeQuarter, half: bathroomsHalf },
            floors,
            hasPool,
            poolType: hasPool === 'yes' ? poolType : '',
            parkingSpaces,
            isGatedCommunity,
            hasBasement,
            basementSquareFootage: hasBasement === 'yes' ? basementSquareFootage ?? 0 : undefined,
            askingPrice,
            verified,
            createdAt: new Date().toISOString(),
        };

        try {
            const raw = localStorage.getItem('seller:localListings');
            const arr = raw ? JSON.parse(raw) : [];
            arr.push(listing);
            localStorage.setItem('seller:localListings', JSON.stringify(arr));
            setLoading(false);
            router.push('/dashboard/seller');
        } catch (e) {
            console.error('Local save failed', e);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Seller Listing</h1>
            <div>
                <label>Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
                <label>Timeline</label>
                <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    <option value="">Select</option>
                    <option value="immediately">Immediately</option>
                    <option value="3-6 months">3–6 months</option>
                    <option value="6-12 months">6–12 months</option>
                    <option value="flexible">Flexible</option>
                </select>
            </div>

            <div>
                <label>Square Footage</label>
                <input type="number" value={squareFootage as any} onChange={(e) => setSquareFootage(e.target.value ? Number(e.target.value) : "")} />
            </div>

            <div>
                <label>Year Built</label>
                <input type="number" value={yearBuilt as any} onChange={(e) => setYearBuilt(e.target.value ? Number(e.target.value) : "")} />
            </div>

            <div>
                <label>Bedrooms</label>
                <input type="number" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} />
            </div>

            <div>
                <label>Bathrooms (full)</label>
                <input type="number" value={bathroomsFull} onChange={(e) => setBathroomsFull(Number(e.target.value))} />
            </div>
            <div>
                <label>Bathrooms (3/4)</label>
                <input type="number" value={bathroomsThreeQuarter} onChange={(e) => setBathroomsThreeQuarter(Number(e.target.value))} />
            </div>
            <div>
                <label>Bathrooms (half)</label>
                <input type="number" value={bathroomsHalf} onChange={(e) => setBathroomsHalf(Number(e.target.value))} />
            </div>

            <div>
                <label>Floors</label>
                <input type="number" value={floors} onChange={(e) => setFloors(Number(e.target.value))} />
            </div>

            <div>
                <label>Do you have a pool?</label>
                <select value={hasPool} onChange={(e) => setHasPool(e.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            {hasPool === 'yes' && (
                <div>
                    <label>Pool Type</label>
                    <input value={poolType} onChange={(e) => setPoolType(e.target.value)} />
                </div>
            )}

            <div>
                <label>Parking spaces</label>
                <input type="number" value={parkingSpaces} onChange={(e) => setParkingSpaces(Number(e.target.value))} />
            </div>

            <div>
                <label>Is this in a gated community?</label>
                <select value={isGatedCommunity} onChange={(e) => setIsGatedCommunity(e.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            <div>
                <label>Has basement?</label>
                <select value={hasBasement} onChange={(e) => setHasBasement(e.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            {hasBasement === 'yes' && (
                <div>
                    <label>Basement square footage</label>
                    <input type="number" value={basementSquareFootage ?? ''} onChange={(e) => setBasementSquareFootage(e.target.value ? Number(e.target.value) : undefined)} />
                </div>
            )}

            <div>
                <label>Asking Price</label>
                <input type="number" value={askingPrice} onChange={(e) => setAskingPrice(Number(e.target.value))} />
            </div>

            <div>
                <label>Verified</label>
                <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
            </div>
            <button onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
    );
}
