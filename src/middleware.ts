import { NextResponse, NextRequest } from "next/server";
import withAuth from "next-auth/middleware";
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export default withAuth({
  pages: {
    signIn: "/api/auth/signin",
  }
})

export const config = {
  matcher: "/dashboard/:path*",
};
