'use client';

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@/app/components/Snackbar";

type FormData = {
  email: string;
  password: string;
};

interface AuthError extends Error {
  message: string;
}

export default function LoginForm() {
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/home"
      });
    } catch (error) {
      const authError = error as AuthError;
      showSnackbar(authError.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-primaryText text-2xl font-semibold mb-6 text-center">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
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

        <button
          type="submit"
          className="w-full bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors duration-300"
        >
          Login
        </button>
      </form>
      <a
        href="/signup"
        className="text-sky-600 text-sm mt-2 block text-center"
      >
        Don&apos;t have an account? Sign up
      </a>
    </div>
  );
} 