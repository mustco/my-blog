import { supabase } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

interface Page {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod?: string;
}

export async function GET() {
  const staticPages = [
    {
      loc: "https://mustcoweb.xyz",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      loc: "https://mustcoweb.xyz/about",
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      loc: "https://mustcoweb.xyz/blog",
      changefreq: "weekly",
      priority: 1.0,
    },
  ];

  const { data: posts } = await supabase()
    .from("posts")
    .select("slug, updated_at");

  const blogPages = (posts || []).map((post) => ({
    loc: `https://mustcoweb.xyz/blog/${post.slug}`,
    lastmod: new Date(post.updated_at || Date.now()).toISOString(),
    changefreq: "monthly",
    priority: 0.9,
  }));

  const allPages: Page[] = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${page.loc}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
