import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("Reset password request received");

      // Get the current session to authenticate the user
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const { oldPassword, newPassword } = req.body;

      // Validate input
      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password and new password are required",
        });
      }

      // Validate new password strength
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          success: false,
          message: "New password does not meet the security requirements",
        });
      }

      // Find the current user
      const user = await prisma.student.findUnique({
        where: { email: session.user.email },
      });

      if (!user || !user.password) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify the old password
      const isOldPasswordValid = bcrypt.compareSync(oldPassword, user.password);

      if (!isOldPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Check if new password is different from old password
      if (oldPassword === newPassword) {
        return res.status(400).json({
          success: false,
          message: "New password must be different from the current password",
        });
      }

      // Hash the new password
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

      // Update the password in the database
      const updatedUser = await prisma.student.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      });

      if (updatedUser) {
        return res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      }
    } catch (error) {
      console.error("Reset password error:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors (following signup.ts pattern)
        return res.status(400).json({
          success: false,
          message: "Database error occurred",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Password reset failed. Please try again.",
        });
      }
    }
  } else {
    return res
      .status(500)
      .json({ success: false, message: "method not allowed" });
  }
}
