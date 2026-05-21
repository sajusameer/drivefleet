"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CarDetailsPage() {

  const params = useParams();
  const id = params.id;

  const { data: session } =
    authClient.useSession();

  const [car, setCar] =
    useState(null);

  const [driverNeeded, setDriverNeeded] =
    useState("No");

  const [specialNote, setSpecialNote] =
    useState("");

  // =========================
  // FETCH CAR
  // =========================

  useEffect(() => {

    fetch(
      `http://localhost:5000/cars/${id}`
    )
      .then((res) => res.json())
      .then((data) => setCar(data));

  }, [id]);

  // =========================
  // BOOK NOW
  // =========================

  const handleBooking = async () => {

    if (!session?.user) {

      alert("Please login first");
      return;

    }

    const bookingData = {

      carId: car._id,
      carName: car.carName,
      carImage: car.image,
      price: car.price,

      bookingDate:
        new Date().toLocaleDateString(),

      driverNeeded,
      specialNote,

      userEmail:
        session.user.email,

      userName:
        session.user.name,

    };

    const res = await fetch(
      "http://localhost:5000/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          bookingData
        ),
      }
    );

    const data = await res.json();

    if (data.insertedId) {

      alert("Booking Successful");

    }

  };

  // =========================
  // LOADING
  // =========================

  if (!car) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );

  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* IMAGE */}

        <div>

          <img
            src={car.image}
            alt={car.carName}
            className="w-full rounded-3xl h-[500px] object-cover"
          />

        </div>

        {/* CONTENT */}

        <div>

          <p className="text-[#ea001e] uppercase tracking-[5px] mb-1">
            Luxury Vehicle
          </p>

          <h1 className="text-3xl font-bold mb-1">
            {car.carName}
          </h1>

          <p className="text-gray-400 leading-8 mb-2">
            {car.description}
          </p>

          <div className="space-y-1 mb-4 text-gray-300">

            <p>
              Type: {car.carType}
            </p>

            <p>
              Seats: {car.seats}
            </p>

            <p>
              Location: {car.location}
            </p>

            <p>
              Availability:
              {" "}
              {car.availability}
            </p>

          </div>

          <h2 className="text-4xl font-bold text-[#ea001e] mb-10">
            ${car.price}
            <span className="text-lg text-gray-400">
              /day
            </span>
          </h2>

          {/* BOOKING FORM */}

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-5">

            <h2 className="text-2xl font-bold">
              Book This Car
            </h2>

            {/* DRIVER */}

            <div>

              <label className="block mb-2 text-gray-400">
                Driver Needed?
              </label>

              <select
                value={driverNeeded}
                onChange={(e) =>
                  setDriverNeeded(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/10 rounded-xl p-4"
              >

                <option>
                  Yes
                </option>

                <option>
                  No
                </option>

              </select>

            </div>

            {/* NOTE */}

            <div>

              <label className="block mb-1 text-gray-400">
                Special Note
              </label>

              <textarea
                rows="2"
                value={specialNote}
                onChange={(e) =>
                  setSpecialNote(
                    e.target.value
                  )
                }
                placeholder="Any special request..."
                className="w-full bg-black border border-white/10 rounded-xl p-4"
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={handleBooking}
              className="w-full bg-[#ea001e] hover:bg-red-700 transition py-4 rounded-2xl font-semibold text-lg"
            >

              Book Now

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}