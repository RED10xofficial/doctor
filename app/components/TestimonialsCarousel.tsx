'use client';

import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/app/components/emblaCarousel";

interface Testimonial {
  name: string;
  comment: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  options: EmblaOptionsType;
}

export default function TestimonialsCarousel({ testimonials, options }: TestimonialsCarouselProps) {
  return (
    <div className="w-full grid relative">
      <div className="absolute left-0 w-56 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 w-56 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
      <EmblaCarousel slides={testimonials} options={options} />
    </div>
  );
} 