import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // Or Google etc.

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session?.user?.role = token.role; // if you're extending session
      return session;
    },
  },
  // Add more logic like DB adapter if needed
};
