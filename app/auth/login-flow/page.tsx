"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmailStep from "@/app/components/auth/simple-auth/EmailStep";
import PasswordStep from "@/app/components/auth/simple-auth/PasswordStep";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleLogin = async () => {
        try {
            // Simple session storage
            const timestamp = new Date().toISOString();

            // Log the credentials for backend
            console.log("Login Payload:", {
                email: formData.email,
                password: formData.password,
                timestamp,
            });

            // Redirect to home
            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
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

                <div className="space-y-6">
                    <EmailStep
                        email={formData.email}
                        setEmail={(email) => setFormData({ ...formData, email })}
                        onSignUpClick={() => router.push("/auth/signup-flow")}
                        showSignUpLink={false}
                    />

                    <PasswordStep
                        password={formData.password}
                        setPassword={(password) => setFormData({ ...formData, password })}
                    />

                    <button
                        onClick={handleLogin}
                        disabled={!formData.email || !formData.password}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}
