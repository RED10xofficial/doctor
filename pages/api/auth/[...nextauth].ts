// pages/api/auth/[...nextauth].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { Session, SessionStrategy, User } from "next-auth";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

interface CustomSessionUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    examType: string;
}

interface CustomSession extends Session {
  user: CustomSessionUser;
}

export const authOptions = {
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
            id: user.id.toString(),
            username: user.email,
            name: user.name,
            image: user.image,
            email: user.email,
            examType: user.examType,
          };
        } else {
          throw Error("Incorrect email / password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy, // Store session as JWT
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // @ts-expect-error - ExamType is not a standard property on the User object
        token.examType = user.examType;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        examType: token.examType as string,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
