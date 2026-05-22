"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function CarDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const [car, setCar] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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
      .then((data) => {

        setCar(data);

        setLoading(false);

      });

  }, [id]);

  // =========================
  // BOOKING
  // =========================

  const handleBooking = async () => {

    // LOGIN CHECK

    if (!session?.user) {

      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }

    // CAR CHECK

    if (!car) {

      toast.error("Car not found");

      return;
    }

    try {

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

        toast.success(
          "Booking Successful"
        );

        router.push(
          "/my-bookings"
        );

      } else {

        toast.error(
          "Booking failed"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">

        Loading...

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* IMAGE */}

        <div>

          <img
            src={car.image}
            alt={car.carName}
            className="w-full h-[500px] object-cover rounded-3xl"
          />

        </div>

        {/* DETAILS */}

        <div>

          <p className="text-red-500 uppercase tracking-[5px] mb-3">
            Premium Car
          </p>

          <h1 className="text-5xl font-bold mb-6">
            {car.carName}
          </h1>

          <div className="space-y-4 text-gray-300 mb-8">

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

            <p>
              Booking Count:
              {" "}
              {car.booking_count || 0}
            </p>

          </div>

          <p className="text-gray-400 leading-8 mb-8">
            {car.description}
          </p>

          <h2 className="text-4xl font-bold text-red-500 mb-10">

            ${car.price}

            <span className="text-lg text-gray-400">
              /day
            </span>

          </h2>

          {/* BOOKING FORM */}

          <div className="space-y-5">

            <select
              value={driverNeeded}
              onChange={(e) =>
                setDriverNeeded(
                  e.target.value
                )
              }
              className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4"
            >

              <option>
                No
              </option>

              <option>
                Yes
              </option>

            </select>

            <textarea
              rows="5"
              placeholder="Special Note"
              value={specialNote}
              onChange={(e) =>
                setSpecialNote(
                  e.target.value
                )
              }
              className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4"
            />

            <button
              onClick={handleBooking}
              className="w-full bg-red-500 hover:bg-red-700 transition py-5 rounded-2xl font-bold text-lg"
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}