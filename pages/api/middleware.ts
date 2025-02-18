import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function authMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions); // Pass req and res here
  if (!session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return session;
}