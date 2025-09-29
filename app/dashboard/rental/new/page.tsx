"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewRentalUnit() {
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [monthlyRent, setMonthlyRent] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        // Save locally until backend is wired
        try {
            const raw = localStorage.getItem('rental:localUnits');
            const arr = raw ? JSON.parse(raw) : [];
            arr.push({ address, monthlyRent, createdAt: new Date().toISOString() });
            localStorage.setItem('rental:localUnits', JSON.stringify(arr));
            setLoading(false);
            router.push('/dashboard/rental');
        } catch (e) {
            console.error('Local save failed', e);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Rental Unit</h1>
            <div>
                <label>Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Monthly Rent</label>
                <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
            </div>
            <button onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
    );
}
