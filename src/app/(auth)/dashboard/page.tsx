"use client";

import { useEffect, useRef, useState } from "react";
import MarkdownInput from "@/components/MarkdownInput";
import { nanoid } from "nanoid";
import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import { createClient } from "../../../../utils/supabase/client";
import { categoryImages } from "../../../../utils/supabase/category/CategoryImages";

export default function Dashboard() {
  const [successMessage, setSuccessMessage] = useState("");
  const [session, setSession] = useState<any>(null);
  const currentDate = useRef(new Date().toISOString());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDetailFile, setSelectedDetailFile] = useState<File | null>(
    null
  );
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewCategory, setReviewCategory] = useState("");
  const [author, setAuthor] = useState("");

  const [selected, setSelected] = useState("h1");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState<number | null>(null);
  const [objectContent, setObjectContent] = useState<
    {
      post_id: number | null;
      element: string;
      content: string;
      created_at: string;
      updated_at: string;
      level: number;
    }[]
  >([]);

  const supabase = createClient();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    }
    getSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContent("");
    setSelected(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postId === null) {
      setSuccessMessage("Please create a post first");
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }

    let imageUrl = "";
    if (selectedDetailFile) {
      try {
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(selectedDetailFile);
        setUploaded(objectUrl);

        // Generate unique filename
        const filename = nanoid();
        const fileExt = selectedDetailFile.name.split(".").pop();
        const filePath = `${filename}.${fileExt}`;

        // Upload image to Supabase Storage
        const { data, error } = await supabase.storage
          .from("images")
          .upload(filePath, selectedDetailFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error(`Error Uploading File: ${error.message}`);
        }

        // Get public URL of the uploaded image
        const { data: file } = await supabase.storage
          .from("images")
          .getPublicUrl(data.path);

        imageUrl = file.publicUrl;
      } catch (error) {
        console.error("Error Uploading File:", error);
        setSuccessMessage(`Upload error: ${(error as Error).message}`);
        setTimeout(() => setSuccessMessage(""), 5000);
        return;
      }
    }

    // Add content to objectContent array
    const newContent = {
      post_id: postId,
      element: selected,
      content: selected === "img" ? imageUrl : content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      level: objectContent.length + 1,
    };

    setObjectContent((prev) => [...prev, newContent]);

    // Reset input fields
    setContent("");
    setSelectedDetailFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setSuccessMessage("Content added successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !category) {
      setSuccessMessage("Please fill all required fields");
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }

    setIsLoading(true);

    try {
      // Use predefined image from categoryImages
      const imageUrl = categoryImages[category.trim()] || "";

      // Generate slug from title
      const slug = title
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/[^a-z0-9\-]/g, "");

      // Create post via API
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token || ""}`,
        },
        body: JSON.stringify({
          title,
          author,
          category,
          slug,
          image: imageUrl,
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        setSuccessMessage(res.error);
        setTimeout(() => setSuccessMessage(""), 5000);
        throw new Error(res.error);
      }

      setSuccessMessage("Post created successfully");
      setTimeout(() => setSuccessMessage(""), 5000);
      setPostId(res.post_id);

      // Reset form fields
      setTitle("");
      setAuthor("");
      setCategory("");
      setSelectedFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setSuccessMessage((error as Error).message);
      setTimeout(() => setSuccessMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      currentDate.current = new Date().toISOString();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Success Message Alert */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-500 ease-in-out">
          {successMessage}
        </div>
      )}

      <div className="w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-xl md:text-3xl">
          Welcome Back, <span className="font-bold">Adnan</span>! 👀
        </h1>
        <form onSubmit={handleUpload}>
          <p className="mb-0">Input Title Blog</p>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
              setReviewTitle(e.target.value);
            }}
            value={title}
            placeholder="Title Blog"
            className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
            required
          />
          <p className="mb-0">Input Author</p>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            placeholder="Author"
            className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
            required
          />
          <p className="mb-0">Input Category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setReviewCategory(e.target.value);
            }}
            value={category}
            className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
            required
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {Object.keys(categoryImages).map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
          <div className="flex space-x-2 items-center">
            <button
              type="submit"
              className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>

      <MarkdownInput
        post_id={postId ?? 0}
        session={session}
        setSuccessMessage={setSuccessMessage}
        setObjectContent={setObjectContent}
        setIsLoadingPublish={setIsLoadingPublish}
      />
    </div>
  );
}
