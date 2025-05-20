import { supabase } from "../../utils/supabase/server";
import type { MetadataRoute } from "next";

export const revalidate = 0;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://mustcoweb.xyz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://mustcoweb.xyz/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://mustcoweb.xyz/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Ambil semua slug dari Supabase
  const { data: posts, error } = await supabase()
    .from("posts")
    .select("slug, updated_at");

  if (error) {
    console.error("Gagal mengambil data post untuk sitemap:", error.message);
    return staticPages; 
  }

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://mustcoweb.xyz/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages];
}
