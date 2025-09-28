"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/registerUser";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import Purpose from "@/app/components/auth/common-auth/Purpose";
import Location from "@/app/components/auth/common-auth/Location";
import Email from "@/app/components/auth/common-auth/Email";
import Password from "@/app/components/auth/common-auth/Password";
import Name from "@/app/components/auth/common-auth/FullName";
import Link from "next/link";
import { SignUpCredentials } from "@/types";
import PhoneNumber from "@/app/components/auth/common-auth/PhoneNumber";

export default function SignupPage() {
    const router = useRouter();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [userProfile, setUserProfile] = useState<SignUpCredentials>({
        email: "",
        phoneNumber: "",
        passwordHash: "",
        firstName: "",
        lastName: "",
        role: "buyer",
        location: ""
    });

    // Grab stored data if page is refreshed (persist partially-completed signup)
    useEffect(() => {
        const savedUser = localStorage.getItem("signupUserProfile");
        if (savedUser) setUserProfile(JSON.parse(savedUser));
    }, []);

    // Store data in case page is refreshed (keeps user's progress between steps)
    useEffect(() => {
        localStorage.setItem("signupUserProfile", JSON.stringify(userProfile));
    }, [userProfile]);

    // Submit form
    // - When `formSubmitted` toggles, call the shared `registerUser` helper
    // - `registerUser` will remove the provided storage keys and update UI via callbacks
    // TODO: Add automatic sign in after successful registration
    useEffect(() => {
        const doRegister = async () => {
            await registerUser({
                userProfile,
                storageKeys: ["signupUserProfile"],
                router,
                setError,
                setIsLoading,
            });
        };

        if (formSubmitted) {
            doRegister();
            setFormSubmitted(false);
        }
    }, [formSubmitted, userProfile, router]);

    return (
        <div>
            <h1>Signup flow</h1>
            <h3>Please complete the steps below to create your account.</h3>

            {isLoading && (
                <div style={{ color: "blue" }}>Loading...</div>
            )}

            {error && (
                <div style={{ color: "red" }}>{error}</div>
            )}

            <QuestionaireFlow setFormSubmitted={setFormSubmitted}>
                <Purpose userProfile={userProfile} setUserProfile={setUserProfile} />
                <Location userProfile={userProfile} setUserProfile={setUserProfile} />
                <Name userProfile={userProfile} setUserProfile={setUserProfile} />
                <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
                <Email userProfile={userProfile} setUserProfile={setUserProfile} />
                <Password userProfile={userProfile} setUserProfile={setUserProfile} />
            </QuestionaireFlow>

            <p>Already have an account? <Link href="/auth/login">Log in</Link></p>

            <h4>Current User Info: </h4>
            <p>{JSON.stringify(userProfile)}</p>
        </div>
    );
}
