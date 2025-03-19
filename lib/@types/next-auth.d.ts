import { DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add user ID field
      email: string,
      name: string,
      examType: string
    };
  }
  interface JWT extends DefaultJWT {
    id: string;
    examType: string
  }
}
