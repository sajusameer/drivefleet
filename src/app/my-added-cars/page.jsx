"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyAddedCars() {

  const [cars, setCars] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // TEMP USER EMAIL
  const userEmail =
    "demo@gmail.com";

  // =========================
  // FETCH MY CARS
  // =========================

  useEffect(() => {

    fetch(
      `http://localhost:5000/my-cars/${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {

        setCars(data);

        setLoading(false);

      });

  }, []);

  // =========================
  // DELETE CAR
  // =========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this car?"
        );

      if (!confirmDelete) return;

      const res = await fetch(
        `http://localhost:5000/cars/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {

        const remainingCars =
          cars.filter(
            (car) =>
              car._id !== id
          );

        setCars(
          remainingCars
        );

      }

    };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white text-2xl">

        Loading...

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="mb-14">

          <p className="text-[#ea001e] uppercase tracking-[5px] mb-3">
            Dashboard
          </p>

          <h1 className="text-5xl font-bold">
            My Added Cars
          </h1>

        </div>

        {/* EMPTY STATE */}

        {cars.length === 0 && (

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-14 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Cars Added Yet
            </h2>

            <p className="text-gray-400 mb-8">
              Add your first luxury car listing.
            </p>

            <Link
              href="/add-car"
              className="bg-[#ea001e] px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Add Car
            </Link>

          </div>

        )}

        {/* CARS GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cars.map((car) => (

            <div
              key={car._id}
              className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#ea001e] transition duration-500"
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

                  <span className="bg-[#ea001e]/20 text-[#ea001e] px-3 py-1 rounded-full text-sm">
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
                    Status: {car.availability}
                  </p>

                </div>

                <div className="flex items-center justify-between mb-6">

                  <h3 className="text-3xl font-bold text-[#ea001e]">
                    ${car.price}
                    <span className="text-base text-gray-400">
                      /day
                    </span>
                  </h3>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4">

                  <Link
                    href={`/update-car/${car._id}`}
                    className="flex-1 bg-[#ea001e] text-center py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        car._id
                      )
                    }
                    className="flex-1 border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}