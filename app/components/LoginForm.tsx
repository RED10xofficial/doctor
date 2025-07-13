"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@/app/components/Snackbar";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { userApi } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/api-utils";

type FormData = {
  email: string;
  password: string;
};


export default function LoginForm() {
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // First, try to authenticate with our API to get specific error messages
      const apiResponse = await userApi.loginUser({
        email: data.email,
        password: data.password,
      });

      if (apiResponse.success && apiResponse.data) {
        // If API authentication succeeds, proceed with NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        
        if (result?.ok) {
          router.push("/home");
        } else {
          showSnackbar("Authentication failed", "error");
        }
      } else {
        // Show the specific error message from the API
        showSnackbar(getErrorMessage(apiResponse), "error");
      }
    } catch {
      showSnackbar("Network error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <a
          href="#"
          className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
        >
          Forgot your password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Divider */}
      <div className="relative my-4 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-2 bg-white text-gray-500">
            Don&apos;t have an account?
          </span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <a
          href="/signup"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          Create an account
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </form>
  );
}
