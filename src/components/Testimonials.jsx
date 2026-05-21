"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marianna Frazoni",
    role: "Luxury Car Buyer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    review:
      "Exceptional service and premium quality vehicles. Their professionalism and customer support exceeded all expectations. Buying my dream car was smooth, fast, and completely stress-free.",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Sports Car Enthusiast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    review:
      "Amazing experience from beginning to end. The staff was friendly, knowledgeable, and helped me choose the perfect sports car within my budget.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(
      current === 0
        ? testimonials.length - 1
        : current - 1
    );
  };

  const nextSlide = () => {
    setCurrent(
      current === testimonials.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <section className="w-full bg-[#f3f3f3] py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative">

        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="w-10 h-[6px] bg-[#ea001e] rounded-full" />

          <h2 className="text-3xl md:text-6xl font-bold text-[#07112b]">
            What Clients Say About Us
          </h2>

          <div className="w-10 h-[6px] bg-[#ea001e] rounded-full" />
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[#07112b] hover:text-[#ea001e] transition"
        >
          <ChevronLeft size={42} />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#07112b] hover:text-[#ea001e] transition"
        >
          <ChevronRight size={42} />
        </button>

        {/* Content */}
        <div className="duration-500 transition-all">
          <p className="max-w-4xl mx-auto text-lg md:text-3xl italic text-gray-600 leading-relaxed">
            “{testimonials[current].review}”
          </p>

          {/* User */}
          <div className="mt-14 flex flex-col items-center">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#ea001e]"
            />

            <h3 className="mt-5 text-2xl md:text-4xl font-bold text-[#07112b]">
              {testimonials[current].name}
            </h3>

            <p className="text-gray-500 mt-1">
              {testimonials[current].role}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={`${
                    i < 4
                      ? "fill-[#ea001e] text-[#ea001e]"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    current === index
                      ? "bg-[#ea001e] w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}