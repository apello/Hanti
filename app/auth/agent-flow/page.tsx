"use client";

import Location from "@/app/components/auth/common-auth/Location";
import QuestionaireFlow from "@/app/components/auth/QuestionaireFlow";
import Email from "@/app/components/auth/common-auth/Email";
import FullName from "@/app/components/auth/common-auth/FullName";
import PhoneNumber from "@/app/components/auth/common-auth/PhoneNumber";
import Password from "@/app/components/auth/common-auth/Password";
import LicenseDetails from "@/app/components/auth/agent-flow/LicenseDetails";
import ProfessionalDetails from "@/app/components/auth/agent-flow/ProfessionalDetails";
import ServicesSpecialization from "@/app/components/auth/agent-flow/ServicesSpecialization";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignUpCredentials } from "@/types";
import { registerUser } from "@/lib/registerUser";
import { useRouter } from "next/navigation";

interface AgentProfile {
  estateBoardId: string;
  licenseExpiry: string;
  agencyName?: string;
  yearsOfExperience?: number;
  officeAddress?: string;
  nationalId?: string;
  kraPin?: string;
  servicesOffered?: string[];
  specializations?: string[];
}

// TODO: Add Zod validation to all questionaire forms
export default function AgentFlow() {
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<SignUpCredentials>({
    email: "",
    passwordHash: "",
    phoneNumber: "",
    role: "agent",
    location: "",
    firstName: "",
    lastName: "",
  });

  const [agentProfile, setAgentProfile] = useState<AgentProfile>({
    estateBoardId: "",
    licenseExpiry: "",
    agencyName: "",
    yearsOfExperience: undefined,
    officeAddress: "",
    nationalId: "",
    kraPin: "",
    servicesOffered: [],
    specializations: [],
  });

  // Grab stored data if page is refreshed
  useEffect(() => {
    const savedUser = localStorage.getItem("agentUserProfile");
    if (savedUser) setUserProfile(JSON.parse(savedUser));

    const savedAgent = localStorage.getItem("agentAgentProfile");
    if (savedAgent) setAgentProfile(JSON.parse(savedAgent));
  }, []);

  // Store data in case page is refreshed
  useEffect(() => {
    localStorage.setItem("agentUserProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("agentAgentProfile", JSON.stringify(agentProfile));
  }, [agentProfile]);

  useEffect(() => {
    const doRegister = async () => {
      await registerUser({
        userProfile,
        storageKeys: ["agentUserProfile", "agentAgentProfile"],
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
      <h1>Agent Registration</h1>
      <h3>Join our network of professional real estate agents</h3>

      {isLoading && (
        <div style={{ color: "blue" }}>Loading...</div>
      )}

      {error && (
        <div style={{ color: "red" }}>{error}</div>
      )}

      <QuestionaireFlow setFormSubmitted={setFormSubmitted}>
        <LicenseDetails agentProfile={agentProfile} setAgentProfile={setAgentProfile} />
        <ProfessionalDetails agentProfile={agentProfile} setAgentProfile={setAgentProfile} />
        <ServicesSpecialization agentProfile={agentProfile} setAgentProfile={setAgentProfile} />
        <Location userProfile={userProfile} setUserProfile={setUserProfile} />
        <FullName userProfile={userProfile} setUserProfile={setUserProfile} />
        <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
        <Email userProfile={userProfile} setUserProfile={setUserProfile} />
        <Password userProfile={userProfile} setUserProfile={setUserProfile} />
      </QuestionaireFlow>

      <p>Already have an agent account? <Link href="/auth/login">Log in</Link></p>

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h4>Current User Info:</h4>
        <pre style={{ fontSize: "12px", overflow: "auto" }}>
          {JSON.stringify(userProfile, null, 2)}
        </pre>

        <h4>Current Agent Info:</h4>
        <pre style={{ fontSize: "12px", overflow: "auto" }}>
          {JSON.stringify(agentProfile, null, 2)}
        </pre>
      </div>
    </div>
  );
}
