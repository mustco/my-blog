// // import { login, signup } from "./action";

// // export default function LoginPage() {
// //   return (
// //     <form>
// //       <label htmlFor="email">Email:</label>
// //       <input id="email" name="email" type="email" required />
// //       <label htmlFor="password">Password:</label>
// //       <input id="password" name="password" type="password" required />
// //       <button formAction={login}>Log in</button>
// //       <button formAction={signup}>Sign up</button>
// //     </form>
// //   );
// // }
// 'use client'
// import { login } from "@/app/login/action";
// // import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

// //   const handleLogin = async (e: React.FormEvent) => {
//     // e.preventDefault();

//     // Menambahkan validasi form (opsional)
// //     if (!email || !password) {
// //       setError("Email dan password harus diisi");
// //       return;
// //     }

// //     const result = await signIn("credentials", {
// //       redirect: false,
// //       email,
// //       password,
// //     });

// //     if (result?.error) {
// //       setError(result.error);
// //     } else {
// //       // Redirect jika login berhasil
// //       window.location.href = "/dashboard"; // Ganti sesuai dengan tujuan
// //     }
// //   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//       <div className="bg-white mx-3 dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//           Login
//         </h2>

//         {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

//         <form className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-800 dark:text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-green-500"
//               //   value={email}
//               //   onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-800 dark:text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-green-500"
//               //   value={password}
//               //   onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             formAction={login}
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { login } from "@/app/login/action";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    await login(formData); // Panggil fungsi login

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white mx-3 dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

