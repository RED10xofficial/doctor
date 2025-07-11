import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      if (data.confirmPassword) {
        delete data.confirmPassword;
      }
      data.password = bcrypt.hashSync(data.password, 10);

      const user = await prisma.student.create({ data });

      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "Signup successful" });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Check error code to handle specific cases
        if (error.code === "P2002") {
          // Unique constraint failed (duplicate value)
          return res.status(400).json({
            success: false,
            message: `signup failed, ${(error?.meta?.target as string[]).join(
              ","
            )} already exists`,
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "signup failed", error });
      }
    }
  } else {
    return res
      .status(500)
      .json({ success: false, message: "method not allowed" });
  }
}
