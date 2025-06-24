import { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/app/components/LoginForm";

export const metadata: Metadata = {
  title: "Login - Medical Education Platform",
  description: "Login to access your medical education courses and resources",
};

export default async function LoginPage() {
  const session = await auth();

  // If user is already logged in, redirect to home
  if (session) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements - Responsive positioning */}
      <div className="absolute inset-0">
        {/* Floating Circles - Adjusted for mobile */}
        <div className="absolute top-10 left-4 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-float opacity-20 sm:opacity-30"></div>
        <div className="absolute top-20 right-4 sm:top-40 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-float-slow opacity-20 sm:opacity-30"></div>
        <div className="absolute -bottom-20 left-8 sm:-bottom-32 sm:left-40 w-56 h-56 sm:w-80 sm:h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed opacity-20 sm:opacity-30"></div>

        {/* Geometric Shapes - Hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-32 right-1/3 w-4 h-4 bg-purple-400 rotate-45 animate-pulse opacity-60"></div>
        <div className="hidden sm:block absolute bottom-40 left-1/4 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-50"></div>
        <div className="hidden md:block absolute top-1/2 left-16 w-3 h-3 bg-sky-400 rotate-45 animate-pulse opacity-70"></div>

        {/* Star decorations - Responsive sizing */}
        <div className="absolute top-8 right-8 sm:top-16 sm:right-1/4 w-8 h-8 sm:w-12 sm:h-12 opacity-15 sm:opacity-20 animate-pulse">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 0L48.9 30.3L80 40L48.9 49.7L40 80L31.1 49.7L0 40L31.1 30.3L40 0Z"
              fill="#702DFF"
            />
          </svg>
        </div>
        <div className="absolute bottom-16 right-4 sm:bottom-32 sm:right-16 w-6 h-6 sm:w-8 sm:h-8 opacity-10 sm:opacity-15 animate-pulse-slow">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 0L48.9 30.3L80 40L48.9 49.7L40 80L31.1 49.7L0 40L31.1 30.3L40 0Z"
              fill="#0EA5E9"
            />
          </svg>
        </div>
      </div>

      {/* Main Content - Enhanced responsive layout */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Section - Content - Responsive typography and spacing */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-1 animate-fade-in">
              {/* Logo/Brand - Responsive sizing */}
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  Study Catalyst
                </span>
              </div>

              {/* Hero Text - Responsive typography */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Welcome Back to Your
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Medical Journey
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0">
                  Continue your professional development with expert-led
                  courses, comprehensive exams, and personalized learning paths
                  designed for medical professionals.
                </p>
              </div>

              {/* Features - Responsive layout */}
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Expert-Led Content</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span>Personalized Learning</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                  <span>Professional Certification</span>
                </div>
              </div>

              {/* Floating Medical Illustration - Hidden on smaller screens */}
              <div className="hidden xl:block absolute -bottom-10 left-0 w-32 h-32 opacity-10 animate-float">
                <Image
                  src="/medical.png"
                  alt="Medical Icon"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Section - Login Form - Enhanced responsive design */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-delayed">
              <div className="w-full max-w-sm sm:max-w-md">
                {/* Enhanced Login Form Container - Responsive padding and sizing */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 relative overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

                  {/* Form content */}
                  <div className="relative z-10">
                    <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        Sign In
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        Enter your credentials to access your account
                      </p>
                    </div>
                    <LoginForm />
                  </div>

                  {/* Decorative elements - Responsive sizing */}
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 blur-xl"></div>
                  <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-sky-400 rounded-full opacity-10 blur-xl"></div>
                </div>

                {/* Trust indicators - Responsive layout */}
                <div className="mt-4 sm:mt-6 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure Login</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Privacy Protected</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-sky-500"></div>
    </div>
  );
}
