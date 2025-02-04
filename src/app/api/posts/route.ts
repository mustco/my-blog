import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase/server";

export async function GET() {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts, status: 200 }, );
}


