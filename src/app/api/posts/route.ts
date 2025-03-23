import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase/server";

export async function GET() {
  const { data: posts, error } = await supabase()
    .from("posts")
    .select("*")
    

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts }, { status: 200 });
}


// export async function POST(req:NextRequest) {
//   const body = await req.json();
//   // const postTitle = body.get("title");
//   // const postSlug = body.get("slug");
//   // const postAuthor = body.get("author");
//   // const postCategory = body.get("category");
//   // const postImage = body.get("image");

// console.log(body);
//   const { data: posts, error } = await supabase
//     .from("posts")
//     .insert(body)

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
//   return NextResponse.json({ post_id: posts.id }, { status: 200 });
  
// // }
// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   const bearerToken = req.headers.get("Authorization");
//   console.log(bearerToken);
//   // Masukkan data dan kembalikan post_id
//   const { data, error } = await supabase()
//     .from("posts")
//     .insert(body)
//     .select("id") // Ambil post_id yang baru saja dibuat
//     .single(); // Ambil satu data saja

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ post_id: data.id }, { status: 200 });
// }

export async function POST(req: NextRequest) {
  const body = await req.json();

  const bearerToken = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!bearerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase(bearerToken)
    .from("posts")
    .insert(body)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post_id: data.id }, { status: 200 });
}
