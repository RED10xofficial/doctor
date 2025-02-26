"use client";
import { EmblaOptionsType } from "embla-carousel";
import "../../css/embla.css";
import EmblaCarousel from "@/app/components/emblaCarousel";
import Link from "next/link";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { Section } from "@prisma/client";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Home() {
  const { data: sections, error, isLoading } = useSWR("/api/sections", fetcher);

  if (error) {
    return <div>Failed to load sections</div>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const testimonials = [
    {
      name: "John Doe",
      comment: "This service was fantastic! Highly recommend to everyone.",
    },
    {
      name: "Jane Smith",
      comment:
        "A wonderful experience from start to finish. Will definitely return!",
    },
    {
      name: "Alice Johnson",
      comment: "I was very satisfied with the quality and attention to detail.",
    },
    {
      name: "Bob Brown",
      comment: "Excellent customer support and a great product. Five stars!",
    },
    {
      name: "Emily Davis",
      comment:
        "I can't say enough good things about this place. Truly exceptional!",
    },
    {
      name: "Michael Wilson",
      comment:
        "The team was professional and attentive. I felt valued as a customer.",
    },
    {
      name: "Sarah Miller",
      comment:
        "Amazing experience! The staff went above and beyond to help me.",
    },
    {
      name: "David Garcia",
      comment: "Quality service and a friendly atmosphere. I will be back!",
    },
    {
      name: "Laura Martinez",
      comment: "I loved every moment! The attention to detail was impressive.",
    },
    {
      name: "James Anderson",
      comment: "A top-notch experience! I highly recommend this to everyone.",
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-white relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <div className="grid-background"></div>
        </div>

        {/* Existing Animated Patterns */}
        <div className="absolute inset-0 w-full h-full">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.15]">
            <div className="absolute w-full h-full grid grid-cols-8 gap-1">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className="animate-grid-fade aspect-square bg-blue-500/20 rounded-full"
                  style={{
                    animationDelay: `${Math.random() * 4}s`,
                    opacity: Math.random() * 0.3,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Floating Circles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-circles rounded-full"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)`,
                }}
              ></div>
            ))}
          </div>

          {/* Animated Lines */}
          <div className="absolute inset-0">
            <div className="absolute left-0 right-0 top-1/4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent animate-slide-right"></div>
            <div className="absolute left-0 right-0 top-2/4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent animate-slide-left"></div>
            <div className="absolute left-0 right-0 top-3/4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent animate-slide-right"></div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-screen-xl mx-auto px-4 h-screen flex items-center">
          <div className="w-full max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="animate-slide-up text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Advance Your Medical Career
                <span className="animate-slide-up-delay-1 block text-blue-600 mt-2">
                  With Expert-Led Courses
                </span>
              </h1>
              <p className="animate-slide-up-delay-2 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Access comprehensive medical courses, certification exams, and
                professional development resources designed for healthcare
                professionals.
              </p>
            </div>

            {/* Stats section */}
            <div className="animate-slide-up-delay-3 grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2 animate-number">
                  1000+
                </div>
                <div className="text-sm text-gray-600">Sections</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2 animate-number">
                  50k+
                </div>
                <div className="text-sm text-gray-600">Units</div>
              </div>
              <div className="hidden md:block text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2 animate-number">
                  98%
                </div>
                <div className="text-sm text-gray-600">Exams</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-slide-up-delay-4 flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/details"
                className="group px-8 py-3 bg-white text-blue-600 rounded-full font-semibold border-2 border-blue-600 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Explore Courses
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <Link
                href="/my-exams"
                className="group px-8 py-3 bg-blue-600 text-white rounded-full font-semibold border-2 border-blue-600 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-blue-600 transition-colors">
                  View My Exams
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto bg-white">
        <div className="max-w-screen-2xl mx-auto h-full px-8">
          <div className="w-full h-full container mx-auto py-10">
            <h2 className="text-primaryText text-2xl lg:text-4xl font-semibold mb-4 text-center">
              Courses
            </h2>
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-4">
              {sections.map((s: Section, i: number) => {
                return (
                  <div
                    key={`section-${i}`}
                    className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400"
                    onClick={() => redirect(`/details?currentSection=${i}`)}
                  >
                    <p className="text-primaryText text-lg font-semibold">
                      {s.name}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Learn the best practices for Angular development.
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      $199.00
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-gradient-to-r from-sky-100/30 to-pink-100/30 via-gray-50 py-8">
        <h2 className="text-primaryText text-2xl lg:text-4xl font-semibold mb-8 text-center">
          Student Testimonials
        </h2>
        <div className="w-full grid relative">
          <div className="absolute  left-0 w-56 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute  right-0 w-56 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <EmblaCarousel slides={testimonials} options={OPTIONS} />
          {/* <EmblaCarousel slides={testimonials} options={OPTIONS2} /> */}
        </div>
      </div>
    </>
  );
}
