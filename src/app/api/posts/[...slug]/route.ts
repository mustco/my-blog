import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const [slug] = params.slug;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, articles(*)")
    .eq("slug", slug)
    .single();

  if (post?.articles) {
    post.articles.sort((a: any, b: any) => a.level - b.level);
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post }, { status: 200 });
}
