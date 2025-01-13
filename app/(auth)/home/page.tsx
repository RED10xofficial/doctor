/* eslint-disable @next/next/no-img-element */

import { EmblaOptionsType } from "embla-carousel";
import "../../css/embla.css";
import EmblaCarousel from "@/app/components/emblaCarousel";
import Link from "next/link";

export default function Home() {
  const OPTIONS: EmblaOptionsType = { align: "start",loop:true};
  const testimonials = [
    {
      name: "John Doe",
      comment: "This service was fantastic! Highly recommend to everyone."
    },
    {
      name: "Jane Smith",
      comment: "A wonderful experience from start to finish. Will definitely return!"
    },
    {
      name: "Alice Johnson",
      comment: "I was very satisfied with the quality and attention to detail."
    },
    {
      name: "Bob Brown",
      comment: "Excellent customer support and a great product. Five stars!"
    },
    {
      name: "Emily Davis",
      comment: "I can't say enough good things about this place. Truly exceptional!"
    },
    {
      name: "Michael Wilson",
      comment: "The team was professional and attentive. I felt valued as a customer."
    },
    {
      name: "Sarah Miller",
      comment: "Amazing experience! The staff went above and beyond to help me."
    },
    {
      name: "David Garcia",
      comment: "Quality service and a friendly atmosphere. I will be back!"
    },
    {
      name: "Laura Martinez",
      comment: "I loved every moment! The attention to detail was impressive."
    },
    {
      name: "James Anderson",
      comment: "A top-notch experience! I highly recommend this to everyone."
    }
  ];
  
  return (
    <>
      <div className="w-full h-auto  bg-gradient-to-t from-sky-400 relative to-sky-200 py-16 hero-section">
        <div className="max-w-screen-2xl mx-auto h-full px-8">
          <div className="w-full h-full bg-transparent grid gap-4 grid-cols-1 lg:grid-cols-3 ">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h2 className="text-primaryText text-2xl lg:text-4xl font-semibold mb-2">
                  Build the skills to secure your career
                </h2>
                <p className="text-primaryText ">
                  Learn the skills you need to succeed in the modern world. Our
                  courses are designed to help you develop the skills you need
                  to succeed in the modern world.
                </p>
              </div>
            </div>
            <div className="hidden justify-center items-end lg:flex">
              <img src="/banner.webp" alt="banner" className="object-contain" />
            </div>
            <div className="flex justify-center items-center mb-10">
              <div className="bg-white rounded-xl p-6 w-full relative before:absolute before:w-full before:h-full before:content-[''] before:bg-white before:rounded-xl before:-bottom-2 before:-right-2 before:left-2 before:top-2 before:-z-[1] after:absolute after:w-full after:h-full after:content-[''] after:bg-white after:rounded-xl after:-bottom-4 after:-right-4 after:left-4 after:top-4 after:-z-[2]">
                <div className="rounded-xl bg-gradient-to-t from-sky-400 to-sky-200 relative w-full overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-sky-900">
                      Resume your learning..
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    7 Unit(s)
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    1 Exam(s)
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm mt-1">
                    It is a long established fact that a reader will be
                    distracted.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    
                  </div>
                  <div className="flex items-center gap-2">
                    
                    <Link href="/my-learning" className="text-violet-600 hover:text-violet-700">
                      Go to my learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L120,144C240,128,480,96,720,106.7C960,117,1200,171,1320,197.3L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-auto bg-white">
        <div className="max-w-screen-2xl mx-auto h-full px-8">
          <div className="w-full h-full container mx-auto py-10">
            <h2 className="text-primaryText text-2xl lg:text-4xl font-semibold mb-4 text-center">
              Popular Courses
            </h2>
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
              <div className="w-full h-full bg-gray-100 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-400">
                <p className="text-primaryText text-lg font-semibold">
                  Angular Best Practices
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Learn the best practices for Angular development.
                </p>
                <p className="text-lg font-semibold text-blue-600">$199.00</p>
              </div>
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
