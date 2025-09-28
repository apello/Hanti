"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { LoginCredentials } from "@/types";

export default function LoginPage() {
    const [userProfile, setUserProfile] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            // Sign in with Supabase Auth
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: userProfile.email,
                password: userProfile.password || "",
            });

            if (authError) {
                setError(authError.message);
                return;
            }

            if (data.user) {
                console.log("Login successful:", data.user);
                // Redirect to home or dashboard
                router.push("/");
            }

        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div style={{ color: "red" }}>
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={userProfile.email || ""}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={userProfile.password || ""}
                            onChange={(e) => setUserProfile((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={!userProfile.email || !userProfile.password || loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <p>Don&apos;t have an account? <Link href="/auth/signup-flow">Sign up</Link></p>
                    <p><Link href="/auth/forgot-password">Forgot password?</Link></p>
                    
                </div>
            </div>
        </div>
    );
}
