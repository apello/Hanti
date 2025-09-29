"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import RequireRole from "@/app/components/auth/common-auth/RequireRole";

export default function RentalDashboard() {
    const [userId, setUserId] = useState<string | null>(null);
    const [savedUnits, setSavedUnits] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const uid = sessionData?.session?.user?.id ?? null;
            setUserId(uid);

            try {
                const raw = typeof window !== 'undefined' ? localStorage.getItem('rental:localUnits') : null;
                if (raw) setSavedUnits(JSON.parse(raw));
                else setSavedUnits([]);
            } catch (e) {
                setSavedUnits([]);
            }
        };

        load();
    }, []);

    return (
        <RequireRole role="landlord">
            <div>
                <h1>Rental Dashboard</h1>
                <p>Signed in as: <code>{userId ?? 'not signed in'}</code></p>
                <p><Link href="/dashboard/rental/new">Create new rental (local)</Link></p>

                <div style={{ marginTop: 16 }}>
                    <h3>Your (local) rental units</h3>
                    {savedUnits.length === 0 ? (
                        <div>No rental units saved locally yet. Backend wiring is pending.</div>
                    ) : (
                        <ul>
                            {savedUnits.map((u: any, i: number) => (
                                <li key={i}><strong>{u.address}</strong> — Rent: {u.monthlyRent}</li>
                            ))}
                        </ul>
                    )}

                    <div style={{ marginTop: 12, color: '#666' }}>
                        Note: This dashboard currently does not fetch rental units from the backend.
                    </div>
                </div>
            </div>
        </RequireRole>
    );
}
