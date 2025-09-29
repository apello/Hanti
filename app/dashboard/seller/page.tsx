"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import RequireRole from "@/app/components/auth/common-auth/RequireRole";

export default function SellerDashboard() {
    const [userId, setUserId] = useState<string | null>(null);
    const [savedListings, setSavedListings] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            // Only read auth session here — no backend listing queries
            const { data: sessionData } = await supabase.auth.getSession();
            const uid = sessionData?.session?.user?.id ?? null;
            setUserId(uid);

            // Load any locally-saved (UI-only) listings as a placeholder
            try {
                const raw = typeof window !== 'undefined' ? localStorage.getItem('seller:localListings') : null;
                if (raw) setSavedListings(JSON.parse(raw));
                else setSavedListings([]);
            } catch (e) {
                setSavedListings([]);
            }
        };

        load();
    }, []);

    return (
        <RequireRole role="seller">
            <div>
                <h1>Seller Dashboard</h1>
                <p>Signed in as: <code>{userId ?? 'not signed in'}</code></p>
                <p><Link href="/dashboard/seller/new">Create new listing (local)</Link></p>

                <div style={{ marginTop: 16 }}>
                    <h3>Your (local) listings</h3>
                    {savedListings.length === 0 ? (
                        <div>No listings saved locally yet. Backend wiring is pending.</div>
                    ) : (
                        <div>
                            {savedListings.map((l: any, i: number) => (
                                <div key={i} style={{ border: '1px solid #eee', padding: 12, marginBottom: 8 }}>
                                    <h4>{l.address}</h4>
                                    <div>Timeline: {l.timeline}</div>
                                    <div>Square Footage: {l.squareFootage}</div>
                                    <div>Year Built: {l.yearBuilt}</div>
                                    <div>Bedrooms: {l.bedrooms}</div>
                                    <div>Bathrooms: Full {l.bathrooms?.full}, 3/4 {l.bathrooms?.threeQuarter}, Half {l.bathrooms?.half}</div>
                                    <div>Floors: {l.floors}</div>
                                    <div>Pool: {l.hasPool} {l.poolType ? `(${l.poolType})` : ''}</div>
                                    <div>Parking Spaces: {l.parkingSpaces}</div>
                                    <div>Gated Community: {l.isGatedCommunity}</div>
                                    <div>Basement: {l.hasBasement} {l.basementSquareFootage ? `(${l.basementSquareFootage} sqft)` : ''}</div>
                                    <div>Asking Price: {l.askingPrice}</div>
                                    <div>Verified: {l.verified ? 'Yes' : 'No'}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: 12, color: '#666' }}>
                        Note: This dashboard currently does not fetch listings from the backend.
                    </div>
                </div>
            </div>
        </RequireRole>
    );
}
