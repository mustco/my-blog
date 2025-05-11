import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const query = supabase().from("posts").select("category");

  if (name) {
    query.eq("category", name);
  }

  const { data: categories, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const uniqueCategories = Array.from(
    new Set(categories.map((item) => item.category))
  );

  return NextResponse.json({ categories: uniqueCategories });
}
