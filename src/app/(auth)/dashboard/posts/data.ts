// "use client";
// import { nanoid } from "nanoid";
// import { useEffect, useRef, useState } from "react";
// import { supabase } from "../../../../../utils/supabase/server";
// import { getRelativeOrFormattedDate } from "../../../../../utils/supabase/formatedTimestamp";
// import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
// import AdBanner from "@/components/AdBanner";
// import { createClient } from "../../../../../utils/supabase/client";
// export default function DashboardPosts() {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [session, setSession] = useState<any>(null);
//   const currentDate = useRef(new Date().toISOString());
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedDetailFile, setSelectedDetailFile] = useState<File | null>(
//     null
//   );
//   const [uploaded, setUploaded] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingPublish, setIsLoadingPublish] = useState(false);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [reviewTitle, setReviewTitle] = useState("");
//   const [reviewCategory, setReviewCategory] = useState("");
//   const [author, setAuthor] = useState("");

//   const [selected, setSelected] = useState("h1");
//   const [content, setContent] = useState("");
//   const [postId, setPostId] = useState<number | null>(null);
//   const [objectContent, setObjectContent] = useState<
//     {
//       post_id: number | null;
//       element: string;
//       content: string;
//       created_at: string;
//       updated_at: string;
//       level: number;
//     }[]
//   >([]);

//   const supabase = createClient();
//   useEffect(() => {
//     async function getSession() {
//       const { data, error } = await supabase.auth.getSession();
//       setSession(data.session);
//     }
//     getSession();
//   }, []);

//   const handleChange = (e: any) => {
//     setContent("");
//     setSelected(e.target.value);
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (postId === null) {
//       return;
//     }

//     let imageUrl = "";
//     if (selectedDetailFile) {
//       const objectUrl = URL.createObjectURL(selectedDetailFile);
//       setUploaded(objectUrl);
//       const filename = nanoid();
//       const fileExt = selectedDetailFile.name.split(".").pop();
//       const filePath = `${filename}.${fileExt}`;

//       try {
//         // Upload gambar ke Supabase Storage
//         const { data, error } = await supabase.storage
//           .from("images")
//           .upload(filePath, selectedDetailFile, {
//             cacheControl: "3600",
//             upsert: false,
//           });

//         if (error) {
//           throw new Error(`Error Uploading File: ${error.message}`);
//         }

//         // Ambil URL gambar dari Supabase Storage
//         const { data: file } = await supabase.storage
//           .from("images")
//           .getPublicUrl(data.path);
//         imageUrl = file.publicUrl; // Simpan URL di variabel
//       } catch (error) {
//         console.error("Error Uploading File:", error);
//         return; // Stop jika upload gagal
//       }
//     }

//     // Setelah gambar berhasil diupload, tambahkan ke objectContent
//     const newContent = {
//       post_id: postId,
//       element: selected,
//       content: content || imageUrl, // Jika content kosong, simpan URL gambar
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       level: objectContent.length + 1,
//     };

//     setObjectContent((prev) => [...prev, newContent]);

//     // Reset input setelah submit
//     setContent("");
//     setSelectedDetailFile(null);
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title || !author || !category || !selectedFile) {
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

//       const { data: file } = await supabase.storage
//         .from("images")
//         .getPublicUrl(data.path);

//       const slug = title
//         .trim()
//         .replace(/\s+/g, "-")
//         .toLowerCase()
//         .replace(/[^a-z0-9\-]/g, "");

//       const response = await fetch("/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.access_token}`,
//         },
//         body: JSON.stringify({
//           title,
//           author,
//           category,
//           slug,
//           image: file.publicUrl,
//         }),
//       });

//       const res = await response.json();
//       if (!response.ok) {
//         setSuccessMessage(res.error);
//         setTimeout(() => {
//           setSuccessMessage("");
//         }, 5000);

//         throw new Error(res.error);
//       }
//       setSuccessMessage("Berhasil Tambah Data");
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 5000);
//       setPostId(res.post_id);
//       setTitle("");
//       setAuthor("");
//       setCategory("");
//       setSelectedFile(null);

//       if (inputRef.current) {
//         inputRef.current.value = "";
//       }
//     } catch (error) {
//       setSuccessMessage((error as Error).message);
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 5000);
//       console.error("Error in Upload:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       currentDate.current = new Date().toISOString();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);
//   const handlePublish = async () => {
//     confirm("Are you sure you want to publish this article?");
//     setIsLoadingPublish(true);
//     try {
//       if (objectContent.length === 0) {
//         return;
//       }
//       const response = await fetch("/api/articles", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.access_token}`,
//         },
//         body: JSON.stringify(objectContent),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setIsLoadingPublish(false);
//       }
//     } catch (error) {
//       console.error("Error in Upload:", error);
//     }
//     setIsLoadingPublish(false);
//     setObjectContent([]);
//   };
//   return (
//     <div className="w-full h-full">
//       <h1 className="text-xl mb-10">New Posts Blog</h1>
//       <div className="grid gird-cols-1 md:grid-cols-2 gap-5 h-[90%]">
//         <div className="p-4 h-[85%]  flex gap-x-3 w-full border border-black/30 rounded-md dark:border-gray-500">
//           <div className="w-1/2">
//             <p className="mb-5">Input Blog</p>
//             <form onSubmit={handleUpload}>
//               <p className="mb-0">Input Title Blog</p>
//               <input
//                 type="text"
//                 onChange={(e) => {
//                   setTitle(e.target.value);
//                   setReviewTitle(e.target.value);
//                 }}
//                 value={title}
//                 placeholder="Title Blog"
//                 className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
//                 required
//               />
//               <p className="mb-0">Input Author</p>
//               <input
//                 type="text"
//                 onChange={(e) => setAuthor(e.target.value)}
//                 value={author}
//                 placeholder="Author"
//                 className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
//                 required
//               />
//               <p className="mb-0">Input Category</p>
//               <input
//                 type="text"
//                 onChange={(e) => {
//                   setCategory(e.target.value);
//                   setReviewCategory(e.target.value);
//                 }}
//                 value={category}
//                 placeholder="Category"
//                 className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
//                 required
//               />
//               <p className="mb-0">Input Paragraf Content</p>
//               <input
//                 ref={inputRef}
//                 onChange={(e) => {
//                   const file = e?.target?.files?.[0];
//                   if (file) {
//                     setSelectedFile(file);
//                   } else {
//                     setSelectedFile(null);
//                   }
//                 }}
//                 type="file"
//                 className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
//                 required
//               />{" "}
//               <div className="flex  space-x-2 items-center">
//                 <button
//                   type="submit"
//                   className="flex  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out"
//                 >
//                   {isLoading ? "Loading..." : "Kirim"}
//                 </button>
//                 {successMessage && (
//                   <p className="flex  font-bold py-2 px-4 rounded">
//                     {successMessage}
//                   </p>
//                 )}
//               </div>
//             </form>
//             <div className="flex flex-col items-start my-5 gap-2">
//               <div>
//                 <span className="font-bold">rules</span> : ***rules***
//               </div>
//               <div>
//                 <span className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs">
//                   rules
//                 </span>{" "}
//                 : **rules**
//               </div>
//               <div>
//                 <span className="text-blue-500 underline">rules</span> : !rules!
//               </div>
//               <div>
//                 <span className="italic">rules</span> : _rules_
//               </div>
//             </div>
//           </div>
//           <div className="w-1/2">
//             <p className="mb-5">Input Detail Blog</p>
//             <form className="w-full" onSubmit={handleSubmit}>
//               <label
//                 htmlFor="countries"
//                 className="block font-medium text-gray-900 dark:text-white"
//               >
//                 Select an option
//               </label>

//               <select
//                 id="countries"
//                 value={selected}
//                 onChange={(e) => handleChange(e)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-white dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               >
//                 <option value="h1">h1</option>
//                 <option value="h2">h2</option>
//                 <option value="h3">h3</option>
//                 <option value="h4">h4</option>
//                 <option value="h5">h5</option>
//                 <option value="p">p</option>
//                 <option value="img">img</option>
//                 <option value="code">code</option>
//                 <option value="ul">ul</option>
//                 <option value="li">li</option>
//                 <option value="ads">ads</option>
//                 <option value="blockquote">blockquote</option>
//               </select>

//               <div className="my-3 flex items-center gap-1">
//                 {selected === "h1" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="heading 1"
//                     required
//                   />
//                 )}
//                 {selected === "h2" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="heading 2"
//                     required
//                   />
//                 )}
//                 {selected === "h3" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="heading 3"
//                     required
//                   />
//                 )}
//                 {selected === "h4" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="heading 4"
//                     required
//                   />
//                 )}
//                 {selected === "h5" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="heading 5"
//                     required
//                   />
//                 )}
//                 {selected === "p" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="paragraph"
//                     required
//                   />
//                 )}
//                 {selected === "img" && (
//                   <div className="flex flex-col items-center justify-center w-full">
//                     <input
//                       ref={inputRef}
//                       onChange={(e) => {
//                         const file = e?.target?.files?.[0];
//                         if (file) {
//                           setSelectedDetailFile(file);
//                         } else {
//                           setSelectedDetailFile(null);
//                         }
//                       }}
//                       type="file"
//                       className="border border-black/30 rounded-md py-1 px-2 w-full mb-3 dark:bg-white dark:text-black"
//                       required
//                     />
//                   </div>
//                 )}
//                 {selected === "code" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="code"
//                     required
//                   />
//                 )}
//                 {selected === "ul" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="unordered list array format"
//                     required
//                   />
//                 )}
//                 {selected === "li" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="list item"
//                     required
//                   />
//                 )}
//                 {selected === "ads" && (
//                   <input
//                     type="text"
//                     onChange={(e) => setContent(e.target.value)}
//                     value={content}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="ads"
//                     required
//                   />
//                 )}
//                 {selected === "blockquote" && (
//                   <input
//                     type="text"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="border border-black/30 rounded-md py-1 px-2 w-full dark:bg-white dark:text-black"
//                     placeholder="quote"
//                     required
//                   />
//                 )}
//               </div>
//               {content || selectedDetailFile ? (
//                 <button
//                   type="submit"
//                   className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out ${
//                     !postId ? "cursor-not-allowed" : "cursor-pointer"
//                   }`}
//                 >
//                   Kirim
//                 </button>
//               ) : null}
//             </form>
//           </div>
//           {/* <p className="mb-0">Input Source Code</p>
//           <input
//             type="text"
//             className="border border-black/30 rounded-md py-1 px-2 w-1/2 mb-3"
//           /> */}
//         </div>
//         <div className="p-4 h-[85%] relative overflow-y-scroll border dark:border-gray-500 border-black/30 rounded-md select-none">
//           <p className="mb-5">Review Blog</p>
//           <div className="flex justify-between mb-6">
//             {reviewCategory && (
//               <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
//                 {reviewCategory}
//               </div>
//             )}
//             <p>{getRelativeOrFormattedDate(currentDate.current)}</p>
//           </div>
//           <h1 className="text-3xl font-bold mb-5">{reviewTitle}</h1>

//           <div className="flex flex-col gap-5">
//             {objectContent.map((article: any) => (
//               <div key={article.level} className="ea">
//                 {article.element === "h1" && (
//                   <h1 className="text-3xl font-bold dark:text-gray-200 tracking-normal">
//                     {article.content}
//                   </h1>
//                 )}
//                 {article.element === "h2" && (
//                   <h2 className="text-2xl font-bold dark:text-gray-200 tracking-normal">
//                     {article.content}
//                   </h2>
//                 )}
//                 {article.element === "h3" && (
//                   <h3 className="text-xl font-bold dark:text-gray-200 tracking-normal">
//                     {article.content}
//                   </h3>
//                 )}
//                 {article.element === "h4" && (
//                   <h4 className="text-lg font-bold dark:text-gray-200 tracking-normal">
//                     {article.content}
//                   </h4>
//                 )}
//                 {article.element === "h5" && (
//                   <h5 className="text-md font-bold dark:text-gray-200 tracking-normal">
//                     {article.content}
//                   </h5>
//                 )}
//                 {article.element === "p" && (
//                   <p className="text-gray-800 dark:text-gray-200 tracking-normal">
//                     {article.content
//                       .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|!.*?!)/g) // urut: *** dulu, baru **, lalu !
//                       .map((part: string, index: number) => {
//                         if (part.startsWith("***") && part.endsWith("***")) {
//                           return (
//                             <strong key={index}>
//                               {part.replace(/\*\*\*/g, "")}
//                             </strong>
//                           );
//                         } else if (
//                           part.startsWith("**") &&
//                           part.endsWith("**")
//                         ) {
//                           return (
//                             <span
//                               key={index}
//                               className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
//                             >
//                               {part.replace(/\*\*/g, "")}
//                             </span>
//                           );
//                         } else if (part.startsWith("!") && part.endsWith("!")) {
//                           const link = part.replace(/!/g, "");
//                           return (
//                             <a
//                               key={index}
//                               href={
//                                 link.startsWith("http")
//                                   ? link
//                                   : `https://${link}`
//                               }
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-500 underline"
//                             >
//                               {link}
//                             </a>
//                           );
//                         } else {
//                           return part;
//                         }
//                       })}
//                   </p>
//                 )}

//                 {article.element === "img" && (
//                   <img
//                     src={uploaded!}
//                     alt="Article image"
//                     width={600}
//                     height={600}
//                     className="mb-5 rounded-lg shadow-md bg-transparent border-gray-100 dark:bg-gray-200 pointer-events-none"
//                     // priority
//                     // loading="lazy"
//                     // quality={50}
//                   />
//                 )}

//                 {article.element === "li" && (
//                   <ul className="list-disc list-outside ms-5">
//                     <li className="dark:text-gray-200">
//                       {article.content
//                         .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|!.*?!)/g)
//                         .map((part: string, index: number) => {
//                           if (part.startsWith("***") && part.endsWith("***")) {
//                             return (
//                               <strong key={index}>
//                                 {part.replace(/\*\*\*/g, "")}
//                               </strong>
//                             );
//                           } else if (
//                             part.startsWith("**") &&
//                             part.endsWith("**")
//                           ) {
//                             return (
//                               <span
//                                 key={index}
//                                 className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
//                               >
//                                 {part.replace(/\*\*/g, "")}
//                               </span>
//                             );
//                           } else if (
//                             part.startsWith("!") &&
//                             part.endsWith("!")
//                           ) {
//                             const link = part.replace(/!/g, "");
//                             return (
//                               <a
//                                 key={index}
//                                 href={
//                                   link.startsWith("http")
//                                     ? link
//                                     : `https://${link}`
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-500 underline"
//                               >
//                                 {link}
//                               </a>
//                             );
//                           } else {
//                             return part;
//                           }
//                         })}
//                     </li>
//                   </ul>
//                 )}

//                 {article.element === "ul" && (
//                   <ul className="list-disc list-outside ms-5 flex flex-col gap-4">
//                     {JSON.parse(article.content).map(
//                       (item: string, index: number) => (
//                         <li key={index} className="dark:text-gray-200">
//                           {item
//                             .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|!.*?!)/g)
//                             .map((part: string, index: number) => {
//                               if (
//                                 part.startsWith("***") &&
//                                 part.endsWith("***")
//                               ) {
//                                 return (
//                                   <strong key={index}>
//                                     {part.replace(/\*\*\*/g, "")}
//                                   </strong>
//                                 );
//                               } else if (
//                                 part.startsWith("**") &&
//                                 part.endsWith("**")
//                               ) {
//                                 return (
//                                   <span
//                                     key={index}
//                                     className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
//                                   >
//                                     {part.replace(/\*\*/g, "")}
//                                   </span>
//                                 );
//                               } else if (
//                                 part.startsWith("!") &&
//                                 part.endsWith("!")
//                               ) {
//                                 const link = part.replace(/!/g, "");
//                                 return (
//                                   <a
//                                     key={index}
//                                     href={
//                                       link.startsWith("http")
//                                         ? link
//                                         : `https://${link}`
//                                     }
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-500 underline"
//                                   >
//                                     {link}
//                                   </a>
//                                 );
//                               } else {
//                                 return part;
//                               }
//                             })}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//                 {article.element === "ol" && (
//                   <ol className="list-decimal list-outside ms-5 flex flex-col gap-4">
//                     {JSON.parse(article.content).map(
//                       (item: string, index: number) => (
//                         <li key={index} className="dark:text-gray-200">
//                           {item
//                             .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|!.*?!)/g)
//                             .map((part: string, index: number) => {
//                               if (
//                                 part.startsWith("***") &&
//                                 part.endsWith("***")
//                               ) {
//                                 return (
//                                   <strong key={index}>
//                                     {part.replace(/\*\*\*/g, "")}
//                                   </strong>
//                                 );
//                               } else if (
//                                 part.startsWith("**") &&
//                                 part.endsWith("**")
//                               ) {
//                                 return (
//                                   <span
//                                     key={index}
//                                     className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
//                                   >
//                                     {part.replace(/\*\*/g, "")}
//                                   </span>
//                                 );
//                               } else if (
//                                 part.startsWith("!") &&
//                                 part.endsWith("!")
//                               ) {
//                                 const link = part.replace(/!/g, "");
//                                 return (
//                                   <a
//                                     key={index}
//                                     href={
//                                       link.startsWith("http")
//                                         ? link
//                                         : `https://${link}`
//                                     }
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-500 underline"
//                                   >
//                                     {link}
//                                   </a>
//                                 );
//                               } else {
//                                 return part;
//                               }
//                             })}
//                         </li>
//                       )
//                     )}
//                   </ol>
//                 )}

//                 {/*             
//               <ol className="list-disc list-outside ms-5 dark:text-gray-200">
//                 <li>eaddddddddd  dddddddddddddd ddddddd ddddddd dddddddd djksfksf skjfksfks fskhfskfhks</li>
//                 <li>12</li>
//               </ol> */}

//                 {article.element === "code" && (
//                   <CodeSyntaxHighlight code={article.content} />
//                 )}
//                 {article.element === "blockquote" && (
//                   <blockquote className="border-l-4 text-lg border-blue-500 dark:border-green-500 pl-4 pe-1 italic text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-[rgb(43,43,43)] py-1">
//                     {article.content}
//                   </blockquote>
//                 )}
//                 {article.element === "ads" && <AdBanner />}
//               </div>
//             ))}
//           </div>
//           {objectContent.length > 0 ? (
//             <button
//               onClick={handlePublish}
//               className="fixed top-5 right-5 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               {isLoadingPublish ? "Loading..." : "Publish"}
//             </button>
//           ) : (
//             <button
//               disabled={true}
//               className="fixed top-0 right-0 bg-blue-500 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-0"
//             >
//               {isLoadingPublish ? "Loading..." : "Publish"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default function DashboardPost() {
// //   return <>page not found</>;
// // }
