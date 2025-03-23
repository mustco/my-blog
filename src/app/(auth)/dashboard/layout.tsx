// "use client";
// import { logout } from "@/app/login/action";
// // import { signOut } from "next-auth/react";
// import Link from "next/link";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
//         <div className="p-4 h-full flex flex-col justify-between">
//           <div className="flex flex-col justify-between">
//             <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//               Blog Admin
//             </h1>
//             <nav className="mt-4">
//               <Link href={"/dashboard/overview"} className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                 Overview
//               </Link>
//               <Link href={"/dashboard/posts"} className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                 Posts
//               </Link>
//             </nav>
//           </div>
//           <a
//             className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={() => logout()}
//           >
//             Logout
//           </a>
//         </div>
//       </div>
//       <div className="p-4 w-full">{children}</div>
//     </div>
//   );
// }

export default function DashboardLayout() {
  return <>page not found</>;
}
