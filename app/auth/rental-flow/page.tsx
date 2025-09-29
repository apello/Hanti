"use client";

import Location from "@/app/components/auth/common-auth/Location";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import Email from "@/app/components/auth/common-auth/Email";
import FullName from "@/app/components/auth/common-auth/FullName";
import RentalAddress from "@/app/components/auth/rental-flow/RentalAddress";
import RentalDetailsA from "@/app/components/auth/rental-flow/RentalDetailsA";
import RentalDetailsB from "@/app/components/auth/rental-flow/RentalDetailsB";
import PhoneNumber from "@/app/components/auth/common-auth/PhoneNumber";
import RentalTimeline from "@/app/components/auth/rental-flow/RentalTimeline";
import { RentalUnit } from "@/types/schema";
import { useEffect, useState } from "react";
import Password from "@/app/components/auth/common-auth/Password";
import Link from "next/link";
import { SignUpCredentials } from "@/types";
import { registerUser } from "@/lib/registerUser";
import { useRouter } from "next/navigation";
import RequireNoAuth from "@/app/components/auth/common-auth/RequireNoAuth";

// TODO: Add Zod validation to all questionaire forms
export default function RentalFlow() {
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<SignUpCredentials>({
    email: "",
    passwordHash: "",
    phoneNumber: "",
    role: "landlord",
    location: "",
    firstName: "",
    lastName: "",
  });

  const [rentalProfile, setRentalProfile] = useState<RentalUnit>({
    rentalId: 0,
    ownerId: 0,
    address: "",
    unitNumber: "",
    monthlyRent: 0,
    securityDeposit: 0,
    leaseLength: "12 months",
    availableFrom: new Date(),
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: {
      full: 0,
      half: 0,
    },
    amenities: {
      inUnitLaundry: false,
      parking: "none",
      gym: false,
      pool: false,
      petFriendly: false,
      furnished: false,
      balcony: false,
      storageUnit: false,
      airConditioning: false,
      heating: false,
    },
    isGatedCommunity: false,
    buildingYear: 0,
    floorsInUnit: 1,
  });

  // Grab stored data if page is refreshed
  useEffect(() => {
    const savedUser = localStorage.getItem("rentalUserProfile");
    if (savedUser) setUserProfile(JSON.parse(savedUser));

    const savedRental = localStorage.getItem("rentalProfile");
    if (savedRental) {
      const parsed = JSON.parse(savedRental);
      // Convert date string back to Date object
      if (parsed.availableFrom) {
        parsed.availableFrom = new Date(parsed.availableFrom);
      }
      setRentalProfile(parsed);
    }
  }, []);

  // Stored data in case page is refreshed
  useEffect(() => {
    localStorage.setItem("rentalUserProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("rentalProfile", JSON.stringify(rentalProfile));
  }, [rentalProfile]);

  useEffect(() => {
    const doRegister = async () => {
      await registerUser({
        userProfile,
        storageKeys: ["rentalUserProfile", "rentalProfile"],
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
    <RequireNoAuth>
      <div>
        <h1>Rental flow</h1>

        {isLoading && (
          <div style={{ color: "blue" }}>Loading...</div>
        )}

        {error && (
          <div style={{ color: "red" }}>{error}</div>
        )}

        <QuestionaireFlow setFormSubmitted={setFormSubmitted}>
          <RentalAddress rentalProfile={rentalProfile} setRentalProfile={setRentalProfile} />
          <Location userProfile={userProfile} setUserProfile={setUserProfile} />
          <RentalTimeline rentalProfile={rentalProfile} setRentalProfile={setRentalProfile} />
          <RentalDetailsA rentalProfile={rentalProfile} setRentalProfile={setRentalProfile} />
          <RentalDetailsB rentalProfile={rentalProfile} setRentalProfile={setRentalProfile} />
          <FullName userProfile={userProfile} setUserProfile={setUserProfile} />
          <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
          <Email userProfile={userProfile} setUserProfile={setUserProfile} />
          <Password userProfile={userProfile} setUserProfile={setUserProfile} />
        </QuestionaireFlow>

        <p>Already have a landlord account? <Link href="/auth/login">Log in</Link></p>

        <h4>Current User Info: </h4>
        <p>{JSON.stringify(userProfile)}</p>

        <h4>Current Rental Info: </h4>
        <p>{JSON.stringify(rentalProfile)}</p>
      </div>
    </RequireNoAuth>
  );
}
