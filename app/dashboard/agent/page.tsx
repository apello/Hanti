"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RequireRole from "@/app/components/auth/common-auth/RequireRole";

export default function AgentDashboard() {
    const [userId, setUserId] = useState<string | null>(null);
    const [localProfile, setLocalProfile] = useState<any | null>(null);

    useEffect(() => {
        const load = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const uid = sessionData?.session?.user?.id ?? null;
            setUserId(uid);

            try {
                const raw = typeof window !== 'undefined' ? localStorage.getItem('agent:localProfile') : null;
                if (raw) setLocalProfile(JSON.parse(raw));
                else setLocalProfile(null);
            } catch (e) {
                setLocalProfile(null);
            }
        };

        load();
    }, []);

    return (
        <RequireRole role="agent">
            <div>
                <h1>Agent Dashboard</h1>
                <p>Signed in as: <code>{userId ?? 'not signed in'}</code></p>

                {!localProfile ? (
                    <div>No agent profile found (local placeholder).</div>
                ) : (
                    <div>
                        <h3>{localProfile.agencyName}</h3>
                        <p>Board ID: {localProfile.estateBoardId}</p>
                        <p>Phone: {localProfile.phoneNumber}</p>
                        <p>Email: {localProfile.email}</p>
                    </div>
                )}

                <div style={{ marginTop: 12, color: '#666' }}>
                    Note: This dashboard currently does not load agent data from the backend.
                </div>
            </div>
        </RequireRole>
    );
}
