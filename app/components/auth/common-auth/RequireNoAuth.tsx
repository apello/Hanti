"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type UserRecord = {
    id?: number;
    role?: string;
};

export default function RequireNoAuth({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

    useEffect(() => {
        let mounted = true;

        const check = async () => {
            const { data } = await supabase.auth.getSession();
            if (!mounted) return;
            const isSigned = Boolean(data?.session);
            setSignedIn(isSigned);

            if (isSigned) {
                // Try to load user record to get role
                const userId = data?.session?.user?.id;
                if (userId) {
                    const { data: users, error } = await supabase
                        .from("users")
                        .select("role")
                        .eq("auth_id", userId)
                        .limit(1)
                        .maybeSingle();

                    if (!error && users) {
                        setUserRole(users.role ?? null);
                    }
                }
            }

            setLoading(false);
        };

        check();

        return () => { mounted = false; };
    }, []);

    if (loading) return <div>Checking authentication...</div>;

    if (signedIn) {
        const isSellerTryingRental = userRole === "seller" && currentPath.includes("/auth/rental-flow");
        const isBuyerTryingSeller = userRole === "buyer" && currentPath.includes("/auth/seller-flow");

        const handleSignOut = async () => {
            await supabase.auth.signOut();
            // reload to clear session and allow the flow to render
            window.location.reload();
        };

        return (
            <div style={{ padding: 16, borderRadius: 8, background: "#fff6f0", border: "1px solid #ffd6b8" }}>
                <h3 style={{ margin: 0 }}>You are already signed in</h3>

                {isSellerTryingRental && (
                    <>
                        <p style={{ marginTop: 8 }}>
                            You are signed in as a <strong>seller</strong>. The rental flow creates a separate landlord account and cannot be completed while signed in. You can either manage your seller listings or sign out to create a landlord account.
                        </p>
                    </>
                )}

                {isBuyerTryingSeller && (
                    <>
                        <p style={{ marginTop: 8 }}>
                            You are signed in as a <strong>buyer</strong>. The seller flow creates a seller account. To continue with seller registration you must sign out and register a new seller account.
                        </p>
                    </>
                )}

                {!isSellerTryingRental && !isBuyerTryingSeller && (
                    <p style={{ marginTop: 8 }}>
                        It looks like you already have an account. To create a separate seller/agent/landlord account, please sign out first or continue to your dashboard.
                    </p>
                )}

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <Link href="/" style={{ padding: "8px 12px", background: "#eef6ff", borderRadius: 6 }}>Go to dashboard</Link>
                    <Link href="/auth/login" style={{ padding: "8px 12px", background: "#fff", border: "1px solid #ddd", borderRadius: 6 }}>Manage account</Link>
                    <button onClick={handleSignOut} style={{ padding: "8px 12px", background: "#fff", border: "1px solid #ddd", borderRadius: 6 }}>Sign out and continue</button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
