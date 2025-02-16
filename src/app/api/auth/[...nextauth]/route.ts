import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Contoh: Hardcoded user (ganti dengan database)
        const user = { id: "1", name: "John Doe", email: "john@example.com" };

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
    async session({ session, token }:{session:any, token:any}) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
 
  secret: process.env.NEXTAUTH_SECRET, // Pastikan ini ada di .env.local
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
