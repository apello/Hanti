import { PropertyListing } from "@/types/schema";
import { supabase } from "@/lib/supabase";


/**
 * Creates a property listing in Supabase in the `property_listings` table.
 *
 * Parameters:
 * - homeProfile: the property listing data
 * - storageKeys: localStorage keys to remove after successful submission
 * - router: optional navigation helper (used to redirect after listing creation)
 * - setError / setIsLoading: optional callbacks to update UI state from the caller
 *
 * The function is intentionally small and returns nothing. It updates the caller
 * via the provided callbacks and handles errors internally (logging + setError).
 */
export async function createListing(params: {
  homeProfile: PropertyListing;
  storageKeys?: string[];
  router?: { push: (path: string) => void } | null;
  setError?: (msg: string | null) => void;
  setIsLoading?: (v: boolean) => void;
}) {
  const { homeProfile, storageKeys = [], router, setError, setIsLoading } = params;

  try {
    setIsLoading?.(true);
    setError?.(null);

    // Clear any temporary client-side storage (so stale saved drafts are removed)
    storageKeys.forEach((k) => localStorage.removeItem(k));

    // Insert the property listing into the database
    const { error: insertError } = await supabase.from("property_listings").insert([
      homeProfile
    ]);

    if (insertError) {
      console.error("Error inserting property listing:", insertError);
      setError?.(insertError.message || JSON.stringify(insertError));
      return;
    }

  // Redirect to the buy page after successful listing creation
  router?.push("/buypage?param=new-listing");
  } catch (err: unknown) {
    console.error("Listing creation error:", err);
    setError?.(
      err instanceof Error ? err.message : "Something went wrong: " + JSON.stringify(err)
    );
  } finally {
    setIsLoading?.(false);
  }
}
