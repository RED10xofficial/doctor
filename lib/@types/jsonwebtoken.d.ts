import { JWT as JWTI } from "jsonwebtoken";

declare module "jwt" {
  interface JWT {
    id: string & JWTI
  }
}
