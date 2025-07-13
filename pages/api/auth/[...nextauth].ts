// pages/api/auth/[...nextauth].ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import apiClient from "@/lib/api";

interface CustomSessionUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    examType: string;
    token?:string
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
        
        try {
          // Use the robust API client for authentication
          const {data: response} = await apiClient.post(`/students/login`,{
            email: credentials.email,
            password: credentials.password,
          });

          console.log(response, 'here')
          
          if (response.success && response.data) {
            // Attach the token to the user object
            const data = response.data;
            return {
              ...data.student,
              token: data.token, // if your API returns a JWT or similar
            };
          } else {
            // Log the specific error message from the API
            console.error('Authentication failed:', response.message);
            // Return null to indicate failed authentication
            return null;
          }
        } catch(err) {
          console.log(err,'dfdsfdfsdfds')
          return null;
        }
      },
    })
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Store session as JWT
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login page on error
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
