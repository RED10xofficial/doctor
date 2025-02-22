"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@/app/components/Snackbar";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.ok) {
      redirect("/home");
    } else {
      console.log('res',res);
      showSnackbar(res?.error || "Something went wrong", "error");
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Section - Image */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Image
          src="/login.png"
          alt="Medical Illustration"
          className="w-full max-w-2xl p-8"
          width={500}
          height={500}
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 bg-gradient-to-t from-sky-400 to-sky-200 p-8 flex items-center justify-center">
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
      </div>
    </div>
  );
}
