"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  CarFront,
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  LogOut,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function MainNavbar() {

  const [open, setOpen] = useState(false);

  // =========================
  // TEMP USER
  // =========================

  const user = true;

  // const user = false;

  // =========================
  // NAV LINKS
  // =========================

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Explore Cars",
      href: "/explore-cars",
    },
  ];

  return (
    <header className="w-full border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur-md fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* =========================
              LOGO
          ========================= */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-[#ea001e] flex items-center justify-center shadow-lg shadow-red-500/20">
              <CarFront
                size={24}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-black text-white leading-none">
                DriveFleet
              </h1>

              <p className="text-xs tracking-[4px] text-gray-500 uppercase mt-1">
                Luxury Cars
              </p>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAV
          ========================= */}

          <nav className="hidden lg:flex items-center gap-10 text-white">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#ea001e] transition duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href="/add-car"
                  className="hover:text-[#ea001e] transition duration-300 font-medium"
                >
                  Add Car
                </Link>

                <Link
                  href="/my-bookings"
                  className="hover:text-[#ea001e] transition duration-300 font-medium"
                >
                  My Bookings
                </Link>
              </>
            )}

          </nav>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="flex items-center gap-5">

            <ThemeToggle />

            {/* =========================
                USER DROPDOWN
            ========================= */}

            {user ? (

              <div className="relative group hidden lg:block">

                {/* PROFILE */}

                <div className="flex items-center gap-3 cursor-pointer">

                  <img
                    src="https://i.ibb.co/4pDNDk1/avatar.png"
                    alt="user"
                    className="w-11 h-11 rounded-full border-2 border-[#ea001e] object-cover"
                  />

                </div>

                {/* DROPDOWN */}

                <div className="absolute right-0 top-16 w-64 bg-[#111111] border border-white/10 rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">

                  <Link
                    href="/add-car"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ea001e] transition text-white"
                  >
                    <PlusCircle size={20} />
                    Add Car
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ea001e] transition text-white"
                  >
                    <CalendarDays size={20} />
                    My Bookings
                  </Link>

                  <Link
                    href="/my-added-cars"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ea001e] transition text-white"
                  >
                    <LayoutDashboard size={20} />
                    My Added Cars
                  </Link>

                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ea001e] transition text-white"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>

                </div>

              </div>

            ) : (

              <Link
                href="/login"
                className="hidden lg:flex bg-[#ea001e] text-white px-7 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Login
              </Link>

            )}

            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}

            <button
              onClick={() => setOpen(!open)}
              className="text-white lg:hidden"
            >
              {open ? (
                <X size={32} />
              ) : (
                <Menu size={32} />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#111111] border-t border-white/10 ${
          open
            ? "max-h-[700px] py-6"
            : "max-h-0"
        }`}
      >

        <div className="px-6 flex flex-col gap-5">

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

          {user ? (
            <>

              <Link
                href="/add-car"
                className="text-white hover:text-[#ea001e] transition text-lg"
              >
                Add Car
              </Link>

              <Link
                href="/my-bookings"
                className="text-white hover:text-[#ea001e] transition text-lg"
              >
                My Bookings
              </Link>

              <Link
                href="/my-added-cars"
                className="text-white hover:text-[#ea001e] transition text-lg"
              >
                My Added Cars
              </Link>

              <button className="bg-[#ea001e] text-white px-6 py-3 rounded-xl font-semibold mt-2">
                Logout
              </button>

            </>
          ) : (
            <Link
              href="/login"
              className="bg-[#ea001e] text-white px-6 py-3 rounded-xl font-semibold text-center"
            >
              Login
            </Link>
          )}

        </div>

      </div>

    </header>
  );
}