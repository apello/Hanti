"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const router = useRouter();
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
    // TODO: Add automatic sign in
    useEffect(() => {
        const registerUser = async () => {
            // Use promise chain and handle loading/errors in the chain
            setIsLoading(true);
            // clear previous error
            setError(null);
            // Remove stored data
            localStorage.removeItem("signupUserProfile");

            // Sign up with Supabase Auth, then create a row in public.users
            supabase.auth.signUp({
                email: userProfile.email,
                password: userProfile.passwordHash || "",
                options: {
                    data: {
                        firstName: userProfile.firstName,
                        lastName: userProfile.lastName,
                        phoneNumber: userProfile.phoneNumber,
                    }
                }
            })
            .then(({ data: authData, error: authError }) => {
                if (authError) {
                    console.error("Auth signup error:", authError);
                    setError(authError.message || JSON.stringify(authError));
                    // throw to be caught by the outer catch below
                    throw authError;
                }

                if (authData?.user) {
                    const authId = authData.user.id;
                    // Insert into the public.users table (auth_id links to auth.users.id)
                    return supabase
                        .from('users')
                        .insert([{
                            auth_id: authId,
                            role: userProfile.role,
                            location: userProfile.location
                        }])
                        .then(({ error: insertError }) => {
                            if (insertError) {
                                console.error('Error inserting user profile:', insertError);
                                setError(insertError.message || JSON.stringify(insertError));
                                throw insertError;
                            }

                            // Navigate after profile is created
                            router.push('/?param=new-user');
                        });
                }
            })
            .catch((err) => {
                console.error("Signup error:", err);
                setError(err.message ?? "Something went wrong: " + JSON.stringify(err));
            })
            .finally(() => {
                setIsLoading(false);
            });
        };

        if (formSubmitted) {
            registerUser();
            setFormSubmitted(false);
        }
    }, [formSubmitted, userProfile, router]);

    return (
        <div>
            <h1>Signup flow</h1>
            <h3>Please complete the steps below to create your account.</h3>

            {isLoading && (
                <div style={{ color: "blue" }}>
                    Creating your account... Please wait.
                </div>
            )}

            {error && (
                <div style={{ color: "red" }}>
                    {error}
                </div>
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
