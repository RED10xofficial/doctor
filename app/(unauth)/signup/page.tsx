import { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/app/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up - Medical Education Platform",
  description:
    "Create an account to access medical education courses and resources",
};

export default async function SignupPage() {
  const session = await auth();

  // If user is already logged in, redirect to home
  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Section - Image */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Image
          src="/register.png"
          alt="Medical Illustration"
          className="w-full max-w-md rounded-lg"
          width={500}
          height={500}
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 bg-gradient-to-t from-[#702DFF] to-[#311075] p-8 flex items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
}
