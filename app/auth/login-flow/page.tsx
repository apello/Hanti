"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Email from "@/app/components/auth/simple-auth/Email";
import Password from "@/app/components/auth/simple-auth/Password";
import { User } from "@/types/schema";

export default function LoginPage() {
    const [userProfile, setUserProfile] = useState<User>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "buyer",
        location: ""
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
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <button
                            onClick={() => {
                                console.log("Navigating to signup-flow");
                                router.push("/auth/signup-flow");
                            }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none cursor-pointer underline"
                        >
                            create a new account
                        </button>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <Email
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        onSignUpClick={() => router.push("/auth/signup-flow")}
                        showSignUpLink={false}
                    />

                    <Password
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                    />

                    <button
                        onClick={handleLogin}
                        disabled={!userProfile.email || !userProfile.password || loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
}
