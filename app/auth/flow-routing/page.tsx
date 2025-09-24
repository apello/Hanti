"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import WelcomeStep from "@/app/components/auth/simple-auth/WelcomeStep";
import PurposeStep from "@/app/components/auth/simple-auth/PurposeStep";
import LocationStep from "@/app/components/auth/simple-auth/LocationStep";
import EmailStep from "@/app/components/auth/simple-auth/EmailStep";
import PasswordStep from "@/app/components/auth/simple-auth/PasswordStep";
import NameStep from "@/app/components/auth/simple-auth/NameStep";

export default function SimpleAuth() {
    const [formData, setFormData] = useState({
        purpose: "",
        location: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const [isSignUp, setIsSignUp] = useState(false);
    const [flowKey, setFlowKey] = useState(0);
    const [userChoseMode, setUserChoseMode] = useState<null | "in" | "up">(null);
    const router = useRouter();

    // Check if user exists (simulate API call)
    const checkUserExists = async (email: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        // For demo purposes, assume user doesn't exist if email contains "new"
        return !email.includes("new");
    };

    // Handle email step completion
    useEffect(() => {
        if (formData.email && formData.email.includes("@") && userChoseMode === null) {
            checkUserExists(formData.email).then(exists => {
                if (!exists) {
                    setIsSignUp(true);
                    resetFlow();
                } else {
                    setIsSignUp(false);
                }
            });
        }
    }, [formData.email, userChoseMode]);

    const resetFlow = () => setFlowKey((k) => k + 1);

    const chooseSignUp = () => {
        setUserChoseMode("up");
        setIsSignUp(true);
        resetFlow();
    };

    const chooseSignIn = () => {
        setUserChoseMode("in");
        setIsSignUp(false);
        resetFlow();
    };

    const handleComplete = async () => {
        try {
            const timestamp = new Date().toISOString();

            if (isSignUp) {
                console.log("Simple Auth - Sign Up Payload:", {
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    purpose: formData.purpose,
                    location: formData.location,
                    timestamp,
                });
            } else {
                console.log("Simple Auth - Sign In Payload:", {
                    email: formData.email,
                    password: formData.password,
                    timestamp,
                });
            }

            localStorage.setItem("userSession", JSON.stringify(
                isSignUp
                    ? {
                        email: formData.email,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        isLoggedIn: true,
                        loginTime: timestamp,
                    }
                    : {
                        email: formData.email,
                        isLoggedIn: true,
                        loginTime: timestamp,
                    }
            ));

            router.push("/");
        } catch (error) {
            console.error("Auth error:", error);
        }
    };

    return (
        <div>
            <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

            {isSignUp ? (
                <QuestionaireFlow key={`${isSignUp}-${flowKey}`}>
                    <EmailStep
                        email={formData.email}
                        setEmail={(email) => setFormData({ ...formData, email })}
                        onSignUpClick={chooseSignUp}
                        showSignUpLink={false}
                    />
                    <PasswordStep
                        password={formData.password}
                        setPassword={(password) => setFormData({ ...formData, password })}
                    />
                    <WelcomeStep />
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
            ) : (
                <div>
                    <EmailStep
                        email={formData.email}
                        setEmail={(email) => setFormData({ ...formData, email })}
                        onSignUpClick={chooseSignUp}
                        showSignUpLink={false}
                    />
                    <PasswordStep
                        password={formData.password}
                        setPassword={(password) => setFormData({ ...formData, password })}
                    />
                    <p>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); chooseSignUp(); }}>Sign up</a></p>
                </div>
            )}

            {isSignUp ? (
                <button onClick={handleComplete} style={{ marginTop: '20px' }}>
                    Complete Sign Up
                </button>
            ) : (
                <button onClick={handleComplete} style={{ marginTop: '20px' }}>
                    Sign In
                </button>
            )}

            {isSignUp && (
                <>
                    <h4>Current Auth Data:</h4>
                    <p>{JSON.stringify(formData)}</p>
                </>
            )}

            {!isSignUp && (
                <>
                    <h4>Current Auth Data:</h4>
                    <p>{JSON.stringify({ email: formData.email, password: formData.password })}</p>
                </>
            )}
        </div>
    );
}
