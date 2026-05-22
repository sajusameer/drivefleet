"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AvailableCars() {

  const [cars, setCars] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH AVAILABLE CARS
  // =========================

  useEffect(() => {

    fetch(
      "http://localhost:5000/cars"
    )
      .then((res) => res.json())
      .then((data) => {

        // ONLY AVAILABLE CARS
        const availableCars =
          data
            .filter(
              (car) =>
                car.availability ===
                "Available"
            )
            .slice(0, 6);

        setCars(availableCars);

        setLoading(false);

      })
      .catch((error) => {

        console.log(error);

        setLoading(false);

      });

  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <section className="min-h-screen bg-[#050505] flex items-center justify-center">

        <h1 className="text-white text-3xl">
          Loading Cars...
        </h1>

      </section>
    );
  }

  return (
    <section className="bg-[#050505] text-white py-4 px-6">

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}

        <div className="text-center mb-16">

          <p className="text-[#ea001e] uppercase tracking-[6px] mb-4">
            Premium Collection
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Available Cars
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-8">
            Explore our premium luxury car collection
            with modern features, comfort, and top-tier performance.
          </p>

        </div>

        {/* EMPTY STATE */}

        {cars.length === 0 && (

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-14 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Available Cars
            </h2>

            <p className="text-gray-400">
              Cars will appear here once available.
            </p>

          </div>

        )}

        {/* CARS GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cars.map((car) => (

            <div
              key={car._id}
              className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#ea001e] transition duration-500 group"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={car.image}
                  alt={car.carName}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                {/* TOP */}

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-2xl font-bold">
                    {car.carName}
                  </h2>

                  <span className="bg-[#ea001e]/20 text-[#ea001e] px-3 py-1 rounded-full text-sm">
                    {car.carType}
                  </span>

                </div>

                {/* DETAILS */}

                <div className="space-y-3 text-gray-400 mb-6">

                  <p>
                    Seats: {car.seats}
                  </p>

                  <p>
                    Location: {car.location}
                  </p>

                  <p>
                    Status: {car.availability}
                  </p>

                  <p>
                    Booking Count: {car.booking_count || 0}
                  </p>

                </div>

                {/* PRICE */}

                <div className="flex items-center justify-between mb-6">

                  <h3 className="text-3xl font-bold text-[#ea001e]">

                    ${car.price}

                    <span className="text-base text-gray-400">
                      /day
                    </span>

                  </h3>

                </div>

                {/* BUTTON */}

                <Link
                 href={`/cars/${car._id}`}
                  className="block text-center bg-[#ea001e] py-4 rounded-2xl font-semibold hover:bg-red-700 transition"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}