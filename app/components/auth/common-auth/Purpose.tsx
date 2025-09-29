"use client";

import React from "react";
import Link from "next/link";
import { SignUpCredentials } from "@/types";

type Role = "buyer" | "seller" | "agent" | "landlord";

const roles: { id: Role; label: string; description: string; href?: string }[] = [
    { id: "buyer", label: "I'm a buyer", description: "Looking to buy property" },
    { id: "seller", label: "I'm a seller", description: "Looking to sell my property", href: "/auth/seller-flow" },
    { id: "landlord", label: "I'm a landlord", description: "Looking to rent out my property", href: "/auth/rental-flow" },
    { id: "agent", label: "I'm an agent", description: "Real estate professional", href: "/auth/agent-flow" },
];

// styles used directly on each control
const baseStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "left" as const,
};

const Purpose = ({
    userProfile,
    setUserProfile,
}: {
    userProfile: SignUpCredentials;
    setUserProfile: React.Dispatch<React.SetStateAction<SignUpCredentials>>;
}) => {
    return (
        <div>
            <h1>What&apos;s your role?</h1>
            <h3>Help us personalize your experience</h3>

            <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
                {roles.map((r) => {
                    const selected = userProfile.role === r.id;

                    if (r.href) {
                        return (
                            <Link
                                key={r.id}
                                href={r.href}
                                style={{
                                    display: "block",
                                    ...baseStyle,
                                    border: selected ? "2px solid #007bff" : "1px solid #ddd",
                                    backgroundColor: selected ? "#f8f9ff" : "white",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <div style={{ fontWeight: 600, fontSize: 16, color: "#333" }}>{r.label}</div>
                                <div style={{ fontSize: 14, color: "#666", marginTop: 5 }}>{r.description}</div>
                            </Link>
                        );
                    }

                    // buyer: submit and update parent state
                    return (
                        <button
                            key={r.id}
                            type="submit"
                            onClick={() => setUserProfile((prev) => ({ ...prev, role: r.id }))}
                            style={{
                                ...baseStyle,
                                border: selected ? "2px solid #007bff" : "1px solid #ddd",
                                backgroundColor: selected ? "#f8f9ff" : "white",
                            }}
                        >
                            <div style={{ fontWeight: 600, fontSize: 16, color: "#333" }}>{r.label}</div>
                            <div style={{ fontSize: 14, color: "#666", marginTop: 5 }}>{r.description}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Purpose;
