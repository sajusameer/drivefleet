"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Menu,
  X,
  CarFront,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import ThemeToggle from "./ThemeToggle";

export default function MainNavbar() {

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [dropdown, setDropdown] =
    useState(false);

  const dropdownRef =
    useRef(null);

  // =========================
  // SESSION
  // =========================

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // =========================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // =========================

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {
          setDropdown(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // =========================
  // LOGOUT
  // =========================

  // const handleLogout =
  //   async () => {

  //     try {

  //       setDropdown(false);

  //       await authClient.signOut();

  //       router.push("/login");

  //       router.refresh();

  //     } catch (error) {

  //       console.log(error);

  //     }

  //   };

  const handleLogout = async () => {
  try {

    setDropdown(false);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });

  } catch (error) {

    console.log(error);

  }
};

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

  // =========================
  // FALLBACK AVATAR
  // =========================

  const avatarFallback =
    "/avatar.png";

  return (

    <header className="w-full border-b border-white/10 bg-[#0f0e0b]/95 backdrop-blur-md fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* =========================
              LOGO
          ========================= */}

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

          {/* =========================
              DESKTOP NAV
          ========================= */}

          <nav className="hidden lg:flex items-center gap-10 text-white">

            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#ea001e] transition duration-300"
              >
                {link.name}
              </Link>

            ))}

            {session && (
              <>
                <Link
                  href="/add-car"
                  className="hover:text-[#ea001e] transition duration-300"
                >
                  Add Car
                </Link>

                <Link
                  href="/my-bookings"
                  className="hover:text-[#ea001e] transition duration-300"
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
                LOADING
            ========================= */}

            {isPending ? (

              <div className="w-10 h-10 rounded-full border-2 border-[#ea001e] border-t-transparent animate-spin" />

            ) : session ? (

              // =========================
              // USER DROPDOWN
              // =========================

              <div
                className="relative"
                ref={dropdownRef}
              >

                <button
                  onClick={() =>
                    setDropdown(
                      !dropdown
                    )
                  }
                  className="flex items-center gap-3"
                >

                  <Image
                    src={
                      session?.user
                        ?.image ||
                      avatarFallback
                    }
                    alt="profile"
                    width={42}
                    height={42}
                    className="rounded-full border-2 border-[#ea001e] object-cover"
                  />

                  <ChevronDown
                    size={18}
                    className={`text-white transition duration-300 ${
                      dropdown
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {/* =========================
                    DROPDOWN MENU
                ========================= */}

                {dropdown && (

                  <div className="absolute right-0 mt-4 w-64 bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                    {/* USER INFO */}

                    <div className="p-5 border-b border-white/10">

                      <h3 className="text-white font-semibold text-lg">
                        {
                          session.user
                            .name
                        }
                      </h3>

                      <p className="text-sm text-gray-400 truncate mt-1">
                        {
                          session.user
                            .email
                        }
                      </p>

                    </div>

                    {/* MENU */}

                    <div className="flex flex-col">

                      <Link
                        href="/add-car"
                        onClick={() =>
                          setDropdown(
                            false
                          )
                        }
                        className="px-5 py-4 text-white hover:bg-[#ea001e] transition"
                      >
                        Add Car
                      </Link>

                      <Link
                        href="/my-bookings"
                        onClick={() =>
                          setDropdown(
                            false
                          )
                        }
                        className="px-5 py-4 text-white hover:bg-[#ea001e] transition"
                      >
                        My Bookings
                      </Link>

                      <Link
                        href="/my-added-cars"
                        onClick={() =>
                          setDropdown(
                            false
                          )
                        }
                        className="px-5 py-4 text-white hover:bg-[#ea001e] transition"
                      >
                        My Added Cars
                      </Link>

                      <button
                        onClick={
                          handleLogout
                        }
                        className="px-5 py-4 text-left text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        Logout
                      </button>

                    </div>

                  </div>

                )}

              </div>

            ) : (

              // =========================
              // LOGIN REGISTER BUTTONS
              // =========================

              <div className="hidden lg:flex items-center gap-4">

                <Link
                  href="/login"
                  className="bg-[#ea001e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition duration-300"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="border border-[#ea001e] text-[#ea001e] px-6 py-3 rounded-xl font-semibold hover:bg-[#ea001e] hover:text-white transition duration-300"
                >
                  Register
                </Link>

              </div>

            )}

            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}

            <button
              onClick={() =>
                setOpen(!open)
              }
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

      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={`lg:hidden bg-[#111111] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[700px] py-6"
            : "max-h-0"
        }`}
      >

        <div className="px-6 flex flex-col gap-5">

          {/* NAV LINKS */}

          {navLinks.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                setOpen(false)
              }
              className="text-white hover:text-[#ea001e] transition"
            >
              {link.name}
            </Link>

          ))}

          {/* AUTH LINKS */}

          {session ? (

            <>
              <Link
                href="/add-car"
                onClick={() =>
                  setOpen(false)
                }
                className="text-white hover:text-[#ea001e]"
              >
                Add Car
              </Link>

              <Link
                href="/my-bookings"
                onClick={() =>
                  setOpen(false)
                }
                className="text-white hover:text-[#ea001e]"
              >
                My Bookings
              </Link>

              <Link
                href="/my-added-cars"
                onClick={() =>
                  setOpen(false)
                }
                className="text-white hover:text-[#ea001e]"
              >
                My Added Cars
              </Link>

              <button
                onClick={
                  handleLogout
                }
                className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link
                href="/login"
                onClick={() =>
                  setOpen(false)
                }
                className="bg-[#ea001e] text-white px-5 py-3 rounded-xl text-center font-semibold"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() =>
                  setOpen(false)
                }
                className="border border-[#ea001e] text-[#ea001e] px-5 py-3 rounded-xl text-center font-semibold hover:bg-[#ea001e] hover:text-white transition"
              >
                Register
              </Link>
            </>

          )}

        </div>

      </div>

    </header>
  );
}