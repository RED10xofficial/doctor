// pages/api/auth/[...nextauth].ts

import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find the user by username or email
        const user = await prisma.student.findUnique({
          where: { email: credentials.email },
        });

        // If the user exists and the password matches, return the user
        if (
          user?.password &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          return {
            id: `${user.id}`,
            username: user.email,
            email: user.email,
          };
        } else {
          throw Error("Incorrect email / password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", // Store session as JWT
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session?.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
