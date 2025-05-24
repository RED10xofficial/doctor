'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/schema/user.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/Snackbar";

type FormData = z.infer<typeof userSchema>;

interface AuthError extends Error {
  message: string;
}

export default function SignupForm() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData & { confirmPassword: string }>({
    resolver: zodResolver(userSchema),
  });

  const password = watch("password");

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        router.push("/login");
      } else {
        showSnackbar(data.message, "error");
      }
    } catch (error) {
      const authError = error as AuthError;
      showSnackbar(authError.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-primaryText text-2xl font-semibold mb-6 text-center">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            {...register("name", {
              required: "Full name is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-gray-700 mb-2">
            Password
            <Info
              className="inline-block ml-2 w-4 h-4 cursor-pointer text-gray-500"
              onMouseEnter={() => setShowPasswordInfo(true)}
              onMouseLeave={() => setShowPasswordInfo(false)}
            />
          </label>
          {showPasswordInfo && (
            <div className="absolute right-0 top-0 bg-white p-3 rounded-lg shadow-lg border z-10 text-sm">
              Password must contain:
              <ul className="list-disc pl-4 text-gray-600">
                <li>Minimum 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
          )}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                message: "Password must meet all requirements",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
      <a
        href="/login"
        className="text-sky-600 text-sm mt-2 block text-center"
      >
        Already have an account? Login
      </a>
    </div>
  );
} 