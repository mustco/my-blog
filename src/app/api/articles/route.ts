import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const bearerToken = req.headers.get("Authorization")?.split("Bearer ")[1];
  
  if (!bearerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase(bearerToken)
    .from("articles")
    .insert(body)
    .select() 
    

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });

  }

  return NextResponse.json({body}, { status: 200 });
}