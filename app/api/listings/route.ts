import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET /api/listings - Get all listings
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transactionType = searchParams.get('transaction_type');

  let query = supabase
    .from('property_listings')
    .select(`
      *,
      property_images (
        id,
        image_path,
        image_order
      )
    `)
    .order('id', { ascending: true });

  // Filter by transaction type if provided
  if (transactionType) {
    query = query.eq('transaction_type', transactionType);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ listings: data });
}

// POST /api/listings - Create a new listing
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('property_listings')
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ listing: data }, { status: 201 });
}