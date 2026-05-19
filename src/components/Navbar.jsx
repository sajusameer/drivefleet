"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, CarFront } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function MainNavbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Explore Cars",
      href: "/explore-cars",
    },
    {
      name: "Add Car",
      href: "/add-car",
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
    },
  ];

  return (
    <header className="w-full border-b border-white/10 bg-[#0f0e0b] fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <CarFront
              size={32}
              className="text-[#ea001e]"
            />

            <h1 className="text-3xl font-bold text-white">
              DriveFleet
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-12 text-white">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#ea001e] transition duration-300"
              >
                {link.name}
              </Link>
            ))}

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            <ThemeToggle />

            <button className="hidden lg:block bg-[#ea001e] text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
              Login
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="text-white lg:hidden"
            >
              {open ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-[#111111] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[500px] py-6"
            : "max-h-0"
        }`}
      >

        <div className="px-6 flex flex-col gap-6">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#ea001e] transition text-lg"
            >
              {link.name}
            </Link>
          ))}

          <button className="bg-[#ea001e] text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition w-full">
            Login
          </button>

        </div>

      </div>

    </header>
  );
}