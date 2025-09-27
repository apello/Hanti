"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import PurposeStep from "@/app/components/auth/simple-auth/PurposeStep";
import LocationStep from "@/app/components/auth/simple-auth/LocationStep";
import EmailStep from "@/app/components/auth/simple-auth/EmailStep";
import PasswordStep from "@/app/components/auth/simple-auth/PasswordStep";
import NameStep from "@/app/components/auth/simple-auth/NameStep";

export default function SignupPage() {
    console.log("SignupPage component loaded");

    const [formData, setFormData] = useState({
        purpose: "",
        location: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const [flowKey, setFlowKey] = useState(0);
    const router = useRouter();

    // Form data is now displayed in the UI below

    const handleSignup = async () => {
        try {
            // Simple session storage
            const timestamp = new Date().toISOString();

            // Log the credentials for backend
            console.log("Sign Up Payload:", {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                purpose: formData.purpose,
                location: formData.location,
                timestamp,
            });

            // Redirect to home
            router.push("/");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login-flow"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <QuestionaireFlow key={flowKey} onSubmit={handleSignup}>
                    <EmailStep
                        email={formData.email}
                        setEmail={(email) => setFormData({ ...formData, email })}
                        onSignUpClick={() => { }}
                        showSignUpLink={false}
                    />
                    <PasswordStep
                        password={formData.password}
                        setPassword={(password) => setFormData({ ...formData, password })}
                    />
                    <PurposeStep
                        purpose={formData.purpose}
                        setPurpose={(purpose) => setFormData({ ...formData, purpose })}
                    />
                    <LocationStep
                        location={formData.location}
                        setLocation={(location) => setFormData({ ...formData, location })}
                    />
                    <NameStep
                        firstName={formData.firstName}
                        setFirstName={(firstName) => setFormData({ ...formData, firstName })}
                        lastName={formData.lastName}
                        setLastName={(lastName) => setFormData({ ...formData, lastName })}
                    />
                </QuestionaireFlow>

                <h4>Current Form Data: </h4>
                <p>{JSON.stringify(formData)}</p>
            </div>
        </div>
    );
}
