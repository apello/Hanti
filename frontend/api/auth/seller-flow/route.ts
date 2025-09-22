import { NextResponse } from "next/server";
import pool from "../../../../config/database";

// GET all users
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
