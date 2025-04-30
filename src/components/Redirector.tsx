"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirector({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      router.replace(`/blog/${slug}`);
    }
  }, [slug]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </>
  );
}
