"use client";
import Link from "next/link";

export default function RelatedPosts({
  articleContent,
}: {
  articleContent: string[];
}) {
  if (!Array.isArray(articleContent) || articleContent.length === 0)
    return null;

  return (
    <div className="my-1">
      <h3 className="text-xl font-semibold mb-4">Baca Juga</h3>
      <ul className="space-y-3">
        {articleContent.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              <p className="text-blue-600 hover:underline capitalize">
                {slug.replace(/-/g, " ")} {/* opsional, biar rapi */}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
