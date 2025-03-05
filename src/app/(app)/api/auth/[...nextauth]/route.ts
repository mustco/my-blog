import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Contoh: Hardcoded user (gantilah dengan database)
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
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Pastikan ini ada di .env.local
});

// Pastikan ekspor hanya GET dan POST
export const GET = handler;
export const POST = handler;
