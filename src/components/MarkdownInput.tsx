"use client";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { parseMarkdownToBlocks } from "./parseMarkdownToBlocks";
import { marked } from "marked";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function MarkdownInput({
  post_id,
  session,
  setSuccessMessage,
  setObjectContent,
  setIsLoadingPublish,
}: {
  post_id: number;
  session: any;
  setSuccessMessage: (message: string) => void;
  setObjectContent: (content: any) => void;
  setIsLoadingPublish: (isLoading: boolean) => void;
}) {
  const [markdown, setMarkdown] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = ({ text }: { html: string; text: string }) => {
    setMarkdown(text);
  };
console.log(markdown);
  const handleSubmit = async () => {
    if (post_id === 0) {
      setSuccessMessage("Please create a post first before publishing content");
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }
    console.log(markdown);
    const blocks = parseMarkdownToBlocks(markdown, post_id);

    if (blocks.length === 0) {
      setSuccessMessage("Cannot publish empty content");
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }

    const shouldPublish = confirm(
      "Are you sure you want to publish this article?"
    );
    if (!shouldPublish) return;

    setIsLoadingPublish(true);
    setIsSaving(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token || ""}`,
        },
        body: JSON.stringify(blocks),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Article published successfully!");
        setObjectContent([]);
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to publish article");
      }
    } catch (error) {
      console.error("Error in Publishing:", error);
      setSuccessMessage(`Publishing error: ${(error as Error).message}`);
    } finally {
      setIsLoadingPublish(false);
      setIsSaving(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        {post_id === 0
          ? "Create a post first to enable editor"
          : "Write your article content"}
      </h2>
      <MdEditor
        style={{ height: "500px" }}
        value={markdown}
        renderHTML={(text) => marked(text)}
        onChange={handleChange}
        // readOnly={post_id === 0}
      />
      <button
        onClick={handleSubmit}
        disabled={isSaving || post_id === 0}
        className={`mt-4 px-4 py-2 ${
          post_id === 0
            ? "bg-gray-400 cursor-not-allowed"
            : isSaving
            ? "bg-blue-400"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white rounded transition-colors duration-300`}
      >
        {isSaving ? "Saving..." : "Simpan ke Supabase"}
      </button>
    </div>
  );
}
