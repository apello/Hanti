"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // Get url params
  const searchParams = useSearchParams();
  const param = searchParams?.get("param");
  const isNewUser = param === "new-user";
  const signedOut = param === "signed-out";

  // TODO: Make banners manually/timer dismissable
  // TODO: Add error banner for this: #error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
  return (
    <div>
      {isNewUser && (
        <div style={{ border: "1px solid #cce5ff", background: "#e6f2ff", padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Welcome to Hanti!</h2>
          <p style={{ margin: "6px 0 0" }}>
            Thanks for signing up — please check your email and click the verification link to activate your account.
          </p>
        </div>
      )}

      {signedOut && (
        <div style={{ border: "1px solid #d4edda", background: "#e9f7ee", padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Signed out</h2>
          <p style={{ margin: "6px 0 0" }}>
            You have been signed out successfully. <Link href="/auth/login">Sign in</Link> if you&apos;d like to access your account again.
          </p>
        </div>
      )}

      <h1>Welcome to Hanti</h1>
    </div>
  );
}
