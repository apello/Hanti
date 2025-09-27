"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import Purpose from "@/app/components/auth/simple-auth/Purpose";
import Location from "@/app/components/auth/simple-auth/Location";
import Email from "@/app/components/auth/simple-auth/Email";
import Password from "@/app/components/auth/simple-auth/Password";
import Name from "@/app/components/auth/simple-auth/Name";
import { User } from "@/types/schema";

export default function SignupPage() {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const router = useRouter();

    const [userProfile, setUserProfile] = useState<User>({
        email: "",
        phoneNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "buyer",
        location: ""
    });

    // Redirect to seller flow if seller role is selected
    useEffect(() => {
        if (userProfile.role === "seller") {
            router.push("/auth/seller-flow");
        }
    }, [userProfile.role, router]);

    // Grab stored data if page is refreshed
    useEffect(() => {
        const savedUser = localStorage.getItem("signupUserProfile");
        if (savedUser) setUserProfile(JSON.parse(savedUser));
    }, []);

    // Store data in case page is refreshed
    useEffect(() => {
        localStorage.setItem("signupUserProfile", JSON.stringify(userProfile));
    }, [userProfile]);

    // Submit form
    useEffect(() => {
        const registerUser = async () => {
            try {
                // Remove stored data
                localStorage.removeItem("signupUserProfile");

                // Sign up with Supabase Auth
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: userProfile.email,
                    password: userProfile.password || "",
                    options: {
                        data: {
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            role: userProfile.role,
                            location: userProfile.location,
                            phoneNumber: userProfile.phoneNumber
                        }
                    }
                });

                if (authError) {
                    console.error("Auth signup error:", authError);
                    return;
                }

                if (authData.user) {
                    console.log("Supabase Auth signup successful:", authData.user);

                    // Try to create profile in custom users table (if migration is complete)
                    try {
                        const { data: profileData, error: profileError } = await supabase
                            .from('users')
                            .upsert({
                                auth_id: authData.user.id,
                                email: userProfile.email,
                                first_name: userProfile.firstName,
                                last_name: userProfile.lastName,
                                role: userProfile.role,
                                location: userProfile.location,
                                phone_number: userProfile.phoneNumber,
                                username: userProfile.email.split('@')[0] // Create username from email
                            });

                        if (profileError) {
                            console.error("Profile creation error (migration may not be complete):", profileError);
                            console.log("User authenticated successfully, but profile creation failed. Please run the database migration.");
                        } else {
                            console.log("Profile created successfully:", profileData);
                        }
                    } catch (profileError) {
                        console.error("Profile creation failed:", profileError);
                        console.log("User authenticated successfully, but profile creation failed. Please run the database migration.");
                    }

                    // Redirect regardless of profile creation (auth still works)
                    console.log("Redirecting to home...");
                    router.push("/");
                }

            } catch (error) {
                console.error("Signup error:", error);
            }
        };

        if (formSubmitted) registerUser();
    }, [formSubmitted, userProfile, router]);

    return (
        <div>
            <h1>Signup flow</h1>
            <QuestionaireFlow setFormSubmitted={setFormSubmitted}>
                <Purpose userProfile={userProfile} setUserProfile={setUserProfile} />
                <Location userProfile={userProfile} setUserProfile={setUserProfile} />
                <Name userProfile={userProfile} setUserProfile={setUserProfile} />
                <Email userProfile={userProfile} setUserProfile={setUserProfile} />
                <Password userProfile={userProfile} setUserProfile={setUserProfile} />

            </QuestionaireFlow>

            <h4>Current User Info: </h4>
            <p>{JSON.stringify(userProfile)}</p>
        </div>
    );
}
