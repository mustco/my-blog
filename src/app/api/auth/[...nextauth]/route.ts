import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "John Doe", email: "mustcoweb@example.com" };

        if (
          credentials?.email === user.email &&
          credentials?.password === "password"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }:{session:any,token:any}) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);

// Next.js 15+ menggunakan `NextResponse` untuk API Route
export const GET = handler;
export const POST = handler;
