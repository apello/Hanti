import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET /api/listings/[id] - Get a specific listing by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const listingId = parseInt(params.id);

  const { data, error } = await supabase
    .from('property_listings')
    .select(`
      *,
      property_images (
        id,
        image_path,
        image_order
      )
    `)
    .eq('id', listingId)
    .single();

  if (error) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ listing: data });
}

// PUT /api/listings/[id] - Update a specific listing
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const listingId = parseInt(params.id);
  const body = await req.json();

  const { data, error } = await supabase
    .from('property_listings')
    .update(body)
    .eq('id', listingId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ listing: data });
}

// DELETE /api/listings/[id] - Delete a specific listing
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const listingId = parseInt(params.id);

  const { error } = await supabase
    .from('property_listings')
    .delete()
    .eq('id', listingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Listing deleted successfully" });
}