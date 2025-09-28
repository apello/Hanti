import { SignUpCredentials } from "@/types";
import { supabase } from "@/lib/supabase";

/**
 * Registers a user via Supabase and creates a profile row in the `users` table.
 *
 * Parameters:
 * - userProfile: the signup form data
 * - storageKeys: localStorage keys to remove after successful submission
 * - router: optional navigation helper (used to redirect after signup)
 * - setError / setIsLoading: optional callbacks to update UI state from the caller
 *
 * The function is intentionally small and returns nothing. It updates the caller
 * via the provided callbacks and handles errors internally (logging + setError).
 */
export async function registerUser(params: {
  userProfile: SignUpCredentials;
  storageKeys?: string[];
  router?: { push: (path: string) => void } | null;
  setError?: (msg: string | null) => void;
  setIsLoading?: (v: boolean) => void;
}) {
  const { userProfile, storageKeys = [], router, setError, setIsLoading } = params;

  try {
    // Tell the UI we're working
    setIsLoading?.(true);
    setError?.(null);

    // Clear any temporary client-side storage (so stale saved drafts are removed)
    storageKeys.forEach((k) => localStorage.removeItem(k));

    // Create auth user (email/password) and attach basic metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userProfile.email,
      password: userProfile.passwordHash || "",
      options: {
        data: {
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phoneNumber: userProfile.phoneNumber,
        },
      },
    });

    if (authError) {
      // Surface auth errors back to the caller
      console.error("Auth signup error:", authError);
      setError?.(authError.message || JSON.stringify(authError));
      return;
    }

    if (authData?.user) {
      // Create a user profile row in the `users` table linked by auth id
      const authId = authData.user.id;
      const { error: insertError } = await supabase.from("users").insert([
        {
          auth_id: authId,
          role: userProfile.role,
          location: userProfile.location,
        },
      ]);

      if (insertError) {
        console.error("Error inserting user profile:", insertError);
        setError?.(insertError.message || JSON.stringify(insertError));
        return;
      }

      // Redirect to a success page/state
      router?.push("/?param=new-user");
    }
  } catch (err: unknown) {
    // Generic fallback error handling
    console.error("Signup error:", err);
    setError?.(
      err instanceof Error ? err.message : "Something went wrong: " + JSON.stringify(err)
    );
  } finally {
    // Ensure loading state is cleared for the caller
    setIsLoading?.(false);
  }
}
