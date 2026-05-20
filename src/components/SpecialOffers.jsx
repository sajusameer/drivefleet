"use client";

import {
  ShieldCheck,
  Headset,
  CarFront,
  BriefcaseBusiness,
  Users,
  UserRoundCog,
} from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure Car Booking",
    description:
      "Book your favorite cars with complete payment protection and trusted rental service.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help you anytime during your rental journey.",
  },
  {
    icon: CarFront,
    title: "Luxury & Sports Car Rental",
    description:
      "Choose from premium luxury sedans, SUVs, and high-performance sports cars.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Corporate Rental Services",
    description:
      "Professional car rental solutions for business meetings, events, and corporate travel.",
  },
  {
    icon: Users,
    title: "Flexible Car Sharing",
    description:
      "Enjoy convenient and affordable car-sharing options for daily and long-term trips.",
  },
  {
    icon: UserRoundCog,
    title: "Private Chauffeur Service",
    description:
      "Travel comfortably with experienced chauffeurs for airport transfers and VIP rides.",
  },
];

export default function SpecialOffers() {
  return (
    <section className="bg-[#f4f4f4] py-24 px-4 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}

        <div className="flex items-center justify-center gap-5 mb-20">

          <div className="w-8 h-[5px] rounded-full bg-[#ea001e]" />

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#071126] tracking-wide">

            Special Offers

          </h2>

          <div className="w-8 h-[5px] rounded-full bg-[#ea001e]" />

        </div>

        {/* SERVICES */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="text-center group"
              >

                {/* ICON */}

                <div className="flex justify-center mb-6">

                  <div className="transition-all duration-300 group-hover:scale-110">

                    <Icon
                      size={55}
                      strokeWidth={1.8}
                      className="text-[#ea001e]"
                    />

                  </div>

                </div>

                {/* TITLE */}

                <h3 className="text-[30px] leading-tight font-extrabold text-[#071126] mb-5">

                  {service.title}

                </h3>

                {/* DESCRIPTION */}

                <p className="text-gray-600 text-lg leading-9 max-w-sm mx-auto">

                  {service.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}