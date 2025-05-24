import { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/app/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up - Medical Education Platform",
  description: "Create an account to access medical education courses and resources",
};

export default async function SignupPage() {
  const session = await auth();
  
  // If user is already logged in, redirect to home
  if (session) {
    redirect("/home");
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-sky-400 to-sky-200 py-16 relative">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-xl shadow-lg grid grid-cols-2">
          <div className="flex items-center justify-center rounded-l-xl">
            <Image
              src="/register.png"
              alt="Medical Illustration"
              className="w-full max-w-md rounded-lg"
              width={500}
              height={500}
              priority
            />
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
