// "use client";
// import { nanoid } from "nanoid";
// import { useRef, useState } from "react";
// import { supabase } from "../../../../../utils/supabase/server";
// export default function DashboardPosts() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploaded, setUploaded] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [slug, setSlug] = useState<String | null>(null);
//   const [author, setAuthor] = useState("");
//   console.log(selectedFile);
//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       console.log("No file selected");
//       return;
//     }

//     setIsLoading(true);

//     const filename = nanoid();
//     const fileExt = selectedFile.name.split(".").pop();
//     const filePath = `${filename}.${fileExt}`;

//     try {
//       const { data, error } = await supabase.storage
//         .from("images")
//         .upload(filePath, selectedFile, {
//           cacheControl: "3600",
//           upsert: false,
//         });

//       if (error) {
//         throw new Error(`Error Uploading File: ${error.message}`);
//       }

//       console.log("File Uploaded Successfully:", data);

//       const { data: file } = await supabase.storage
//         .from("images")
//         .getPublicUrl(data.path);

//       console.log("Public URL:", file.publicUrl);

//       const slug = title
//         .trim()
//         .replace(/\s+/g, "-")
//         .toLowerCase()
//         .replace(/[^a-z0-9\-]/g, "");

//       const response = await fetch("/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           author,
//           category,
//           slug,
//           image: file.publicUrl,
//         }),
//       });

//       const res = await response.json();
//       console.log("Response:", res);

//       setTitle("");
//       setAuthor("");
//       setCategory("");
//       setSelectedFile(null);

//       if (inputRef.current) {
//         inputRef.current.value = "";
//       }
//     } catch (error) {
//       console.error("Error in Upload:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <h1 className="text-xl mb-10">New Posts Blog</h1>
//       <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
//         <div className="p-4 h-autp border border-black/30 rounded-md">
//           <p className="mb-5">Input Blog</p>
//           <form onSubmit={handleUpload}>
//             <p className="mb-0">Input Title Blog</p>
//             <input
//               type="text"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//               className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//               required
//             />
//             <p className="mb-0">Input Author</p>
//             <input
//               type="text"
//               onChange={(e) => setAuthor(e.target.value)}
//               value={author}
//               className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//               required
//             />
//             <p className="mb-0">Input Category</p>
//             <input
//               type="text"
//               onChange={(e) => setCategory(e.target.value)}
//               value={category}
//               className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//               required
//             />
//             <p className="mb-0">Input Paragraf Content</p>
//             <input
//               ref={inputRef}
//               onChange={(e) => {
//                 const file = e?.target?.files?.[0];
//                 if (file) {
//                   setSelectedFile(file);
//                 } else {
//                   setSelectedFile(null);
//                 }
//               }}
//               type="file"
//               className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//               required
//             />{" "}
//             <button
//               type="submit"
//               className="flex  border border-black/30 px-4 py-1 rounded-md active:bg-gray-400"
//             >
//               {isLoading ? "Loading..." : "Kirim"}
//             </button>
//           </form>
//           {/* <p className="mb-0">Input Source Code</p>
//           <input
//             type="text"
//             className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//           /> */}
//         </div>
//         <div className="p-4 h-72 border border-black/30 rounded-md">
//           <p className="mb-5">Review Blog</p>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function DashboardPost() {
  return <>page not found</>;
}