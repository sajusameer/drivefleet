"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-[#050505] flex items-center">

      {/* BG IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* LEFT SHAPE */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 z-10 opacity-80"
      >
        <Image
            src="/shape.png"
            alt="shape"
            width={150}
            height={900}
            priority
            className="h-screen w-auto object-contain pointer-events-none select-none"
            />
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">

        <div className="grid lg:grid-cols-2 items-center gap-10 min-h-screen">

          {/* LEFT */}
          <div className="max-w-2xl">

            <p className="text-[#ea001e] uppercase tracking-[6px] mb-5 text-sm font-semibold">
              Premium Car Rental
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white">
              Find Your
              <span className="text-[#ea001e]">
                {" "}Dream Car
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-8 mb-10">
              Luxury vehicles for business trips,
              vacations, weddings and unforgettable
              driving experiences.
            </p>

            <div className="flex flex-wrap gap-5">

              <button className="bg-[#ea001e] hover:bg-red-700 transition text-white px-8 py-4 rounded-md font-semibold">
                Explore Cars
              </button>

              <button className="border border-[#ea001e] text-[#ea001e] px-8 py-4 rounded-md font-semibold hover:bg-[#ea001e] hover:text-white transition">
                Learn More
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            animate={{
            //   y: [30, 0, 20],
              x: [0, -20, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex justify-center"
          >
            <Image
              src="/img.png"
              alt="car"
              width={850}
              height={500}
              priority
              className="w-full max-w-3xl object-contain"
            />
          </motion.div>

        </div>

      </div>

    </section>
  );
}