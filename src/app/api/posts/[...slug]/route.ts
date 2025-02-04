import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, articles(*)")
    .eq("slug", params.slug)
    .single();

  if (post?.articles) {
    post.articles.sort((a: any, b: any) => a.level - b.level);
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post }, { status: 200 });
}
