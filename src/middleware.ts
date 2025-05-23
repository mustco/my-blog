import { NextResponse, type NextRequest } from "next/server";
// import withAuth from "next-auth/middleware";
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// export default withAuth({
//   pages: {
//     signIn: "/api/auth/signin",
//   }
// })

// export const config = {
//   matcher: "/dashboard/:path*",
// };

import { updateSession } from "../utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * Feel free to modify this pattern to include more paths.
  //    */
  //   "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  // ],
};
