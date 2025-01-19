import { DefaultSession, DefaultJWT} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add user ID field
    } & DefaultSession["user"];
  }
  interface JWT extends DefaultJWT {
    id: string; 
  }
}
