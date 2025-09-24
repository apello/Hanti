import { NextResponse } from "next/server";
import { supabase } from "../../../../backend/supabase/server";

// GET all users
export async function GET() {
  try {
    const { data: result, error } = await supabase.from("users").select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Unexpected error fetching users:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

