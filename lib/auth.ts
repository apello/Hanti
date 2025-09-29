import { supabase } from "@/lib/supabase";

/**
 * Get the current signed-in user's role from the `users` table.
 * Returns the role string or null if no session. Falls back to 'buyer' when no row exists.
 */
export async function getCurrentUserRole(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    const userId = data?.session?.user?.id;
    if (!userId) return null;

    const { data: userRow, error } = await supabase
        .from('users')
        .select('role')
        .eq('auth_id', userId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching user role:', error);
        return null;
    }

    // If there's no users row yet, treat them as buyer by default (DB default)
    return (userRow && (userRow as any).role) || 'buyer';
}
