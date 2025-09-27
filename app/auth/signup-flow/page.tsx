"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
            // Remove stored data
            localStorage.removeItem("signupUserProfile");

            const response = await fetch("/api/auth/user");
            const data = await response.json();
            console.log(data);
        };

        if (formSubmitted) registerUser();
    }, [formSubmitted]);

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
