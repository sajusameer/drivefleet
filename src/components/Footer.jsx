import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-white/10 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* LOGO */}
        <div>

          <h2 className="text-3xl font-bold mb-4">
            <span className="text-red-500">
              Drive
            </span>
            Fleet
          </h2>

          <p className="text-gray-400 leading-7">
            Premium luxury car rental platform with
            top-class vehicles and seamless booking experience.
          </p>

        </div>

        {/* LINKS */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Useful Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link href="/" className="hover:text-red-500 transition">
              Home
            </Link>

            <Link href="/explore-cars" className="hover:text-red-500 transition">
              Explore Cars
            </Link>

            <Link href="/add-car" className="hover:text-red-500 transition">
              Add Car
            </Link>

            <Link href="/my-bookings" className="hover:text-red-500 transition">
              My Bookings
            </Link>

          </div>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact Info
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <p>+880 1234-567890</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <p>support@drivefleet.com</p>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <p>Dhaka, Bangladesh</p>
            </div>

          </div>

        </div>

        {/* SOCIAL */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <div className="flex items-center gap-4">

            <a
              href="#"
              className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center hover:bg-red-500 transition"
            >
             <FaFacebook />
            </a>

            <a
              href="#"
              className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center hover:bg-red-500 transition"
            >
              <ImInstagram/>
            </a>

            <a
              href="#"
              className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center hover:bg-red-500 transition"
            >
              <BsTwitter />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="border-t border-white/10 py-6 text-center text-gray-500">

        © 2026 DriveFleet. All rights reserved.

      </div>

    </footer>
  );
}