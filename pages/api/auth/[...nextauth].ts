// pages/api/auth/[...nextauth].ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session, SessionStrategy, User } from "next-auth";
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
  accessToken?: string;
}

export const authOptions = {
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
        // Call your REST API to verify credentials
        const res = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/students/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const { data } = await res.json();
        if (res.ok && data) {
          // Attach the token to the user object
          return {
            ...data.student,
            token: data.token, // if your API returns a JWT or similar
          };
        }
        // Return null if authentication fails
        return null;
      },
    })
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Store session as JWT
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // Persist the token from your API to the JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.examType = user.examType;
        if (user.token) {
          token.accessToken = user.token;
        }
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
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
