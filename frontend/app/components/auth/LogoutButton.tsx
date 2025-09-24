"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    onLogout?: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            localStorage.removeItem("userSession");

            if (onLogout) {
                onLogout();
            }

            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            style={{
                display: 'block',
                width: '100%',
                padding: '8px 15px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontSize: '14px'
            }}
        >
            {isLoading ? "Logging out..." : "Logout"}
        </button>
    );
}
