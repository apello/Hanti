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
      // If auth reports the user already exists, show a friendly message
      const authMsg = (authError.message || "").toLowerCase();
      if (authMsg.includes("already registered") || authMsg.includes("user already exists") || authMsg.includes("account already exists")) {
        setError?.("An account with that email already exists. Please sign in instead.");
      } else {
        setError?.(authError.message || JSON.stringify(authError));
      }
      return;
    }

    if (authData?.user) {
      // Create or update a user profile row in the `users` table linked by auth id.
      // Use upsert so repeated signups (or pre-existing rows created by migrations/tools)
      // do not cause a duplicate-key error. If the client library/environment does
      // not support upsert options, the DB will still error and we'll try an update fallback.
      const authId = authData.user.id;
      const userRow = {
        auth_id: authId,
        role: userProfile.role,
        location: userProfile.location,
      };

      // Try upsert first (preferred). This will insert or update the row by auth_id.
      const { error: upsertError } = await supabase.from("users").upsert([userRow], {
        onConflict: "auth_id",
      });

      if (upsertError) {
        // If upsert failed, attempt to detect duplicate-key errors and show a friendly message.
        const msg = String(upsertError.message || "").toLowerCase();
        const code = (upsertError as any)?.code || (upsertError as any)?.status;
        if (msg.includes("duplicate key") || msg.includes("unique constraint") || code === '23505') {
          setError?.("An account already exists for this user. Please sign in instead.");
          return;
        }

        console.warn("Upsert failed, attempting safe fallback:", upsertError);

        // Try to update an existing row with this auth_id
        const { error: updateError } = await supabase
          .from("users")
          .update({ role: userProfile.role, location: userProfile.location })
          .eq("auth_id", authId);

        if (updateError) {
          const uMsg = String(updateError.message || "").toLowerCase();
          const uCode = (updateError as any)?.code || (updateError as any)?.status;
          if (uMsg.includes("duplicate key") || uMsg.includes("unique constraint") || uCode === '23505') {
            setError?.("An account already exists for this user. Please sign in instead.");
            return;
          }

          // If update also failed, try a regular insert as a last resort and report any error
          const { error: insertError } = await supabase.from("users").insert([userRow]);
          if (insertError) {
            const iMsg = String(insertError.message || "").toLowerCase();
            const iCode = (insertError as any)?.code || (insertError as any)?.status;
            if (iMsg.includes("duplicate key") || iMsg.includes("unique constraint") || iCode === '23505') {
              setError?.("An account already exists for this user. Please sign in instead.");
              return;
            }

            console.error("Error creating/updating user profile:", insertError);
            setError?.(insertError.message || JSON.stringify(insertError));
            return;
          }
        }
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
