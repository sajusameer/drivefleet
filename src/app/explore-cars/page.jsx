"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExploreCars() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH + FILTER
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // =========================
  // FETCH CARS
  // =========================

  useEffect(() => {

    const fetchCars = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars?search=${search}&type=${type}`
        );

        const data = await res.json();

        setCars(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchCars();

  }, [search, type]);

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-14">

          <p className="text-red-500 tracking-[6px] uppercase">
            Premium Collection
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Explore Cars
          </h1>

        </div>

        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-5 mb-12">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search by car name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-red-500"
          />

          {/* FILTER */}

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-red-500"
          >

            <option value="">
              All Types
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Sedan">
              Sedan
            </option>

            <option value="Luxury">
              Luxury
            </option>

            <option value="Hatchback">
              Hatchback
            </option>

          </select>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="flex items-center justify-center py-20">

            <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        )}

        {/* EMPTY */}

        {!loading && cars.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold mb-3">
              No Cars Found
            </h2>

            <p className="text-gray-400">
              Try different search or filter
            </p>

          </div>

        )}

        {/* GRID */}

        {!loading && cars.length > 0 && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {cars.map((car) => (

              <div
                key={car._id}
                className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500 transition duration-500"
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={car.image}
                    alt={car.carName}
                    className="h-64 w-full object-cover hover:scale-110 transition duration-700"
                  />

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-2xl font-bold">
                      {car.carName}
                    </h2>

                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      {car.carType}
                    </span>

                  </div>

                  <div className="space-y-2 text-gray-400 mb-6">

                    <p>
                      Seats: {car.seats}
                    </p>

                    <p>
                      Location: {car.location}
                    </p>

                    <p>
                      Availability: {car.availability}
                    </p>

                    {/* <p>
                      Bookings: {car.booking_count || 0}
                    </p> */}
                    {/* <p>
                    Booked:
                    {" "}
                    {car.booking_count || 0}
                    {" "}times
                  </p> */}
                  <p>
                    Booked: {Number(car.booking_count ?? 0)} times
                  </p>

                  </div>

                  <div className="flex items-center justify-between">

                    <h3 className="text-3xl font-bold text-red-500">

                      ${car.price}

                      <span className="text-base text-gray-400">
                        /day
                      </span>

                    </h3>

                    <Link
                      href={`/cars/${car._id}`}
                      className="bg-red-500 px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}