import { z } from "zod";
export const userSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    examType: z.string().min(1, "Exam type is required"),
    confirmPassword: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error is set at confirmPassword field
  });
