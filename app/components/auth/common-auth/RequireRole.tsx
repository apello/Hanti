"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentUserRole } from "@/lib/auth";
import Link from "next/link";

export default function RequireRole({ children, role }: PropsWithChildren<{ role: string }>) {
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const check = async () => {
            const roleVal = await getCurrentUserRole();
            if (mounted) {
                setUserRole(roleVal);
                setLoading(false);
            }
        };

        check();
        return () => { mounted = false; };
    }, [role]);

    if (loading) return <div>Checking permissions...</div>;

    if (userRole !== role) {
        return (
            <div style={{ padding: 16, borderRadius: 8, background: '#fff6f0', border: '1px solid #ffd6b8' }}>
                <h3>Access denied</h3>
                <p>You do not have the required account type to view this dashboard.</p>
                <p><Link href="/">Return home</Link> or <Link href="/auth/login">sign in</Link> with an appropriate account.</p>
            </div>
        );
    }

    return <>{children}</>;
}
