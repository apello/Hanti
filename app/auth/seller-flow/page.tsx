"use client";

import Location from "@/app/components/auth/common-auth/Location";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import Email from "@/app/components/auth/common-auth/Email";
import FullName from "@/app/components/auth/common-auth/FullName";
import HomeAddress from "@/app/components/auth/seller-flow/HomeAddress";
import HomeDetailsA from "@/app/components/auth/seller-flow/HomeDetailsA";
import HomeDetailsB from "@/app/components/auth/seller-flow/HomeDetailsB";
import PhoneNumber from "@/app/components/auth/common-auth/PhoneNumber";
import SellingTimeline from "@/app/components/auth/seller-flow/SellingTimeline";
import { PropertyListing } from "@/types/schema";
import { useEffect, useState } from "react";
import Password from "@/app/components/auth/common-auth/Password";
import Link from "next/link";
import { SignUpCredentials } from "@/types";

// TODO: Add Zod validation to all questionaire forms
export default function SellerFlow() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [userProfile, setUserProfile] = useState<SignUpCredentials>({
    email: "",
    passwordHash: "",
    phoneNumber: "",
    role: "seller",
    location: "",
    firstName: "",
    lastName: "",
  });

  const [homeProfile, setHomeProfile] = useState<PropertyListing>({
    address: "",
    timeline: "",
    squareFootage: 0,
    yearBuilt: 0,
    bedrooms: 0,
    bathrooms: {
      full: 0,
      threeQuarter: 0,
      half: 0,
    },
    floors: 0,
    hasPool: "",
    parkingSpaces: 0,
    isGatedCommunity: "",
    hasBasement: "",
    poolType: "",
    basementSquareFootage: undefined,
    askingPrice: 0,
    verified: false
  });

  // Grab stored data if page is refreshed
  useEffect(() => {
    const savedUser = localStorage.getItem("sellerUserProfile");
    if (savedUser) setUserProfile(JSON.parse(savedUser));

    const savedHome = localStorage.getItem("sellerHomeProfile");
    if (savedHome) setHomeProfile(JSON.parse(savedHome));
  }, []);

  // Stored data in case page is refreshed
  useEffect(() => {
    localStorage.setItem("sellerUserProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("sellerHomeProfile", JSON.stringify(homeProfile));
  }, [homeProfile]);

  // Submit form
  useEffect(() => {
    const registerUser = async () => {
      try {
        // Clear local storage
        localStorage.removeItem("sellerUserProfile");
        localStorage.removeItem("sellerHomeProfile");

      
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    if (formSubmitted) registerUser();

  }, [formSubmitted, userProfile])

  return (
    <div>
      <h1>Seller flow</h1>
      <QuestionaireFlow setFormSubmitted={setFormSubmitted}>
        <HomeAddress homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <Location userProfile={userProfile} setUserProfile={setUserProfile} />
        {/* <AgentDetails homeProfile={homeProfile} setHomeProfile={setHomeProfile} /> */}
        <SellingTimeline homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <HomeDetailsA homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <HomeDetailsB homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <FullName userProfile={userProfile} setUserProfile={setUserProfile} />
        <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
        <Email userProfile={userProfile} setUserProfile={setUserProfile} />
        <Password userProfile={userProfile} setUserProfile={setUserProfile} />
      </QuestionaireFlow>

      <p>Already have a seller account? <Link href="/auth/login">Log in</Link></p>

      <h4>Current User Info: </h4>
      <p>{JSON.stringify(userProfile)}</p>

      <h4>Current Home Info: </h4>
      <p>{JSON.stringify(homeProfile)}</p>
    </div>
  );
}
