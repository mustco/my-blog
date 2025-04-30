// src/app/blog/[short_id]/page.tsx

import { createClient } from "../../../utils/supabase/client";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

// Define the props type explicitly
interface PageProps {
  params: {
    short_id: any;
  };
}

// Metadata generation for SEO and social sharing
export async function generateMetadata() {
  const imageUrl = `https://fusowjktlpehckfgwebs.supabase.co/storage/v1/object/public/images//ufHLcaYK0xPABskj784jM1BuUSiDPaKd.png`;
  return {
    title: "ZoneUpdate - Yang lagi rame nih!",
    description: "Yang lagi rame nih!",
    openGraph: {
      title: "ZoneUpdate - Yang lagi rame nih!",
      description: "Yang lagi rame nih!",
      url: imageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "ZoneUpdate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ZoneUpdate - Yang lagi rame nih!",
      description: "Yang lagi rame nih!",
      images: [imageUrl],
    },
  };
}

// Main page rendering logic
export default async function ShortIdPage({
  params,
}: {
  params: Promise<{ short_id: string }>;
}) {
  const short_id = (await params).short_id;
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("short_id", short_id)
    .single();

  if (error || !post) {
    redirect("/not-found");
  }

  // You can change this to redirect(`/blog/${post.slug}`) if needed
  redirect(`/blog/${post.slug}`);

  // return (
  //   <div>
  //     <h1>Short ID: {short_id}</h1>
  //     <p>Slug: {post.slug}</p>
  //   </div>
  // );
}
