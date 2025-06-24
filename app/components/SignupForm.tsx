"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Info, Eye, EyeOff, User, Phone, Mail, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/schema/user.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/Snackbar";

type FormData = z.infer<typeof userSchema>;

interface AuthError extends Error {
  message: string;
}

type ExamType = { id: number; name: string };

interface SignupFormProps {
  examTypes: ExamType[];
}

export default function SignupForm({ examTypes }: SignupFormProps) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        showSnackbar("Account created successfully! Please login.", "success");
        router.push("/login");
      } else {
        showSnackbar(data.message, "error");
      }
    } catch (error) {
      const authError = error as AuthError;
      showSnackbar(authError.message || "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            {...register("name", {
              required: "Full name is required",
            })}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            })}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.phone.message}
          </p>
        )}
      </div>

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
          Exam Type
        </label>
        <div className="relative">
          <select
            {...register("examType", { required: "Exam type is required" })}
            className="w-full pl-3 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select exam type
            </option>
            {examTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        {errors.examType && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.examType.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
          <button
            type="button"
            className="ml-2 inline-flex items-center"
            onMouseEnter={() => setShowPasswordInfo(true)}
            onMouseLeave={() => setShowPasswordInfo(false)}
            onClick={() => setShowPasswordInfo(!showPasswordInfo)}
          >
            <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        </label>

        {showPasswordInfo && (
          <div className="absolute right-0 top-0 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 z-20 text-xs sm:text-sm w-56 sm:w-64">
            <div className="font-medium text-gray-700 mb-2">
              Password must contain:
            </div>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full flex-shrink-0"></span>
                <span className="text-xs sm:text-sm">Minimum 8 characters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                <span className="text-xs sm:text-sm">One uppercase letter</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                <span className="text-xs sm:text-sm">One number</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-sky-400 rounded-full flex-shrink-0"></span>
                <span className="text-xs sm:text-sm">
                  One special character
                </span>
              </li>
            </ul>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                message: "Password must meet all requirements",
              },
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <div className="relative my-4 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-2 bg-white text-gray-500">
            Already have an account?
          </span>
        </div>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          Sign in instead
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
