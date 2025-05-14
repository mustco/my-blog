"use client";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../../../../../utils/supabase/client";
import { getRelativeOrFormattedDate } from "../../../../../utils/supabase/formatedTimestamp";
import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import AdBanner from "@/components/AdBanner";
import { categoryImages } from "../../../../../utils/supabase/category/CategoryImages";

export default function DashboardPosts() {
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

  const handlePublish = async () => {
    if (objectContent.length === 0) {
      setSuccessMessage("Cannot publish empty content");
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }

    const shouldPublish = confirm(
      "Are you sure you want to publish this article?"
    );
    if (!shouldPublish) return;

    setIsLoadingPublish(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token || ""}`,
        },
        body: JSON.stringify(objectContent),
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
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  // Helper function to render formatted content
  const renderFormattedContent = (content: string) => {
    return content
      .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|!.*?!|_.*?_)/g)
      .map((part: string, index: number) => {
        if (part.startsWith("***") && part.endsWith("***")) {
          return <strong key={index}>{part.replace(/\*\*\*/g, "")}</strong>;
        } else if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={index}
              className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
            >
              {part.replace(/\*\*/g, "")}
            </span>
          );
        } else if (part.startsWith("!") && part.endsWith("!")) {
          const link = part.replace(/!/g, "");
          return (
            <a
              key={index}
              href={link.startsWith("http") ? link : `https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {link}
            </a>
          );
        } else if (part.startsWith("_") && part.endsWith("_")) {
          return <em key={index}>{part.replace(/_/g, "")}</em>;
        } else {
          return part;
        }
      });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-xl mb-10">New Posts Blog</h1>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-5 h-[90%]">
        <div className="p-4 h-[85%] flex gap-x-3 w-full border border-black/30 rounded-md dark:border-gray-500">
          <div className="w-1/2">
            <p className="mb-5">Input Blog</p>
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
              <input
                type="text"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setReviewCategory(e.target.value);
                }}
                value={category}
                placeholder="Category"
                className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
                required
              />
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
            <div className="flex flex-col items-start my-5 gap-2">
              <div>
                <span className="font-bold">rules</span> : ***rules***
              </div>
              <div>
                <span className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs">
                  rules
                </span>{" "}
                : **rules**
              </div>
              <div>
                <span className="text-blue-500 underline">rules</span> : !rules!
              </div>
              <div>
                <span className="italic">rules</span> : _rules_
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <p className="mb-5">Input Detail Blog</p>
            <form className="w-full" onSubmit={handleSubmit}>
              <label
                htmlFor="element-type"
                className="block font-medium text-gray-900 dark:text-white"
              >
                Select an element type
              </label>

              <select
                id="element-type"
                value={selected}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-white dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h4">h4</option>
                <option value="h5">h5</option>
                <option value="p">p</option>
                <option value="img">img</option>
                <option value="code">code</option>
                <option value="ul">ul</option>
                <option value="li">li</option>
                <option value="ads">ads</option>
                <option value="blockquote">blockquote</option>
              </select>

              <div className="my-3 flex items-center gap-1">
                {selected === "img" ? (
                  <div className="flex flex-col items-center justify-center w-full">
                    <input
                      ref={inputRef}
                      onChange={(e) => {
                        const file = e?.target?.files?.[0];
                        if (file) {
                          setSelectedDetailFile(file);
                        } else {
                          setSelectedDetailFile(null);
                        }
                      }}
                      type="file"
                      className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
                      required
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
                    placeholder={
                      selected === "ul"
                        ? "unordered list array format"
                        : selected === "code"
                        ? "code"
                        : selected === "blockquote"
                        ? "quote"
                        : `${selected} content`
                    }
                    required
                  />
                )}
              </div>

              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out ${
                  !postId ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                disabled={!postId || (!content && !selectedDetailFile)}
              >
                Add Content
              </button>

              {successMessage && (
                <p className="mt-2 text-sm font-medium text-blue-600">
                  {successMessage}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="p-4 h-[85%] relative overflow-y-scroll border dark:border-gray-500 border-black/30 rounded-md select-none">
          <p className="mb-5">Review Blog</p>
          <div className="flex justify-between mb-6">
            {reviewCategory && (
              <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
                {reviewCategory}
              </div>
            )}
            <p>{getRelativeOrFormattedDate(currentDate.current)}</p>
          </div>
          <h1 className="text-3xl font-bold mb-5">{reviewTitle}</h1>

          <div className="flex flex-col gap-5">
            {objectContent.map((article) => (
              <div key={article.level}>
                {article.element === "h1" && (
                  <h1 className="text-3xl font-bold dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </h1>
                )}
                {article.element === "h2" && (
                  <h2 className="text-2xl font-bold dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </h2>
                )}
                {article.element === "h3" && (
                  <h3 className="text-xl font-bold dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </h3>
                )}
                {article.element === "h4" && (
                  <h4 className="text-lg font-bold dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </h4>
                )}
                {article.element === "h5" && (
                  <h5 className="text-md font-bold dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </h5>
                )}
                {article.element === "p" && (
                  <p className="text-gray-800 dark:text-gray-200 tracking-normal">
                    {renderFormattedContent(article.content)}
                  </p>
                )}
                {article.element === "img" && article.content && (
                  <img
                    src={article.content}
                    alt="Article image"
                    className="mb-5 rounded-lg shadow-md max-w-full h-auto"
                    loading="lazy"
                  />
                )}
                {article.element === "li" && (
                  <ul className="list-disc list-outside ms-5">
                    <li className="dark:text-gray-200">
                      {renderFormattedContent(article.content)}
                    </li>
                  </ul>
                )}
                {article.element === "ul" && (
                  <ul className="list-disc list-outside ms-5 flex flex-col gap-4">
                    {(() => {
                      try {
                        const items = JSON.parse(article.content);
                        return Array.isArray(items) ? (
                          items.map((item, index) => (
                            <li key={index} className="dark:text-gray-200">
                              {renderFormattedContent(item)}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-500">Invalid list format</li>
                        );
                      } catch (e) {
                        return (
                          <li className="text-red-500">
                            Error parsing list: {article.content}
                          </li>
                        );
                      }
                    })()}
                  </ul>
                )}
                {article.element === "ol" && (
                  <ol className="list-decimal list-outside ms-5 flex flex-col gap-4">
                    {(() => {
                      try {
                        const items = JSON.parse(article.content);
                        return Array.isArray(items) ? (
                          items.map((item, index) => (
                            <li key={index} className="dark:text-gray-200">
                              {renderFormattedContent(item)}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-500">Invalid list format</li>
                        );
                      } catch (e) {
                        return (
                          <li className="text-red-500">
                            Error parsing list: {article.content}
                          </li>
                        );
                      }
                    })()}
                  </ol>
                )}
                {article.element === "code" && (
                  <CodeSyntaxHighlight code={article.content} />
                )}
                {article.element === "blockquote" && (
                  <blockquote className="border-l-4 text-lg border-blue-500 dark:border-green-500 pl-4 pe-1 italic text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-[rgb(43,43,43)] py-1">
                    {renderFormattedContent(article.content)}
                  </blockquote>
                )}
                {article.element === "ads" && <AdBanner />}
              </div>
            ))}
          </div>

          {objectContent.length > 0 && (
            <button
              onClick={handlePublish}
              className="fixed top-5 right-5 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoadingPublish}
            >
              {isLoadingPublish ? "Publishing..." : "Publish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
