"use client";

import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import AgentDetails from "@/app/components/auth/seller-flow/AgentDetails";
import Email from "@/app/components/auth/seller-flow/Email";
import FullName from "@/app/components/auth/seller-flow/FullName";
import HomeAddress from "@/app/components/auth/seller-flow/HomeAddress";
import HomeDetailsA from "@/app/components/auth/seller-flow/HomeDetailsA";
import HomeDetailsB from "@/app/components/auth/seller-flow/HomeDetailsB";
import PhoneNumber from "@/app/components/auth/seller-flow/PhoneNumber";
import SellingTimeline from "@/app/components/auth/seller-flow/SellingTimeline";
import { HomeInfo, UserInfo } from "@/types";
import { useEffect, useState } from "react";

// TODO: Add Zod validation to all questionaire forms
export default function SellerFlow() {  
  const [userProfile, setUserProfile] = useState<UserInfo>({
    sellerEmail: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [homeProfile, setHomeProfile] = useState<HomeInfo>({
    homeAddress: "",
    agentDetails: 0,
    timeline: "",
    squareFootage: 0,
    yearBuilt: 0,
    bedrooms: 0,
    fullBathrooms: 0,
    threeFourthBathrooms: 0,
    oneHalfBathrooms: 0,
    floors: 0,
    hasPool: "",
    parkingSpaces: 0,
    gatedCommunity: "",
    hasBasement: "",
    poolType: "",
    basementSquareFootage: undefined,
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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/auth/seller-flow");
      const data = await response.json();
      console.log(data)
    }

    fetchUsers();
  })

  return (
    <div>
      <h1>Seller flow</h1>
      <QuestionaireFlow>
        <HomeAddress homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <AgentDetails homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <SellingTimeline homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <HomeDetailsA homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <HomeDetailsB homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
        <Email userProfile={userProfile} setUserProfile={setUserProfile} />
        <FullName userProfile={userProfile} setUserProfile={setUserProfile} />
        <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
      </QuestionaireFlow>

      <h4>Current User Info: </h4>
      <p>{JSON.stringify(userProfile)}</p>

      <h4>Current Home Info: </h4>
      <p>{JSON.stringify(homeProfile)}</p>
    </div>
  );
}
