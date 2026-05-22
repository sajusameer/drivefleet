"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateCarPage() {

  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    price: "",
    description: "",
    availability: "Available",
    image: "",
    carType: "SUV",
    location: "",
  });

  // =========================
  // FETCH CAR
  // =========================

  useEffect(() => {

    if (!id) return;

    const fetchCar = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`
        );

        const data = await res.json();

        setForm({
          price: data.price || "",
          description: data.description || "",
          availability:
            data.availability || "Available",
          image: data.image || "",
          carType: data.carType || "SUV",
          location: data.location || "",
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchCar();

  }, [id]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // HANDLE UPDATE
  // =========================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (
        data.modifiedCount > 0
      ) {

        alert(
          "Car Updated Successfully"
        );

        router.push(
          "/my-added-cars"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white text-3xl">

        Loading...

      </div>
    );

  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-5xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-10">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-[#ea001e] uppercase tracking-[6px] mb-3">

            Dashboard

          </p>

          <h1 className="text-5xl font-bold">

            Update Car

          </h1>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleUpdate}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* PRICE */}

          <div>

            <label className="block text-gray-400 mb-2">
              Daily Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            />

          </div>

          {/* IMAGE */}

          <div>

            <label className="block text-gray-400 mb-2">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            />

          </div>

          {/* TYPE */}

          <div>

            <label className="block text-gray-400 mb-2">
              Car Type
            </label>

            <select
              name="carType"
              value={form.carType}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            >

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

          {/* LOCATION */}

          <div>

            <label className="block text-gray-400 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            />

          </div>

          {/* AVAILABILITY */}

          <div>

            <label className="block text-gray-400 mb-2">
              Availability
            </label>

            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            >

              <option value="Available">
                Available
              </option>

              <option value="Unavailable">
                Unavailable
              </option>

            </select>

          </div>

          {/* EMPTY */}

          <div></div>

          {/* DESCRIPTION */}

          <div className="md:col-span-2">

            <label className="block text-gray-400 mb-2">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#ea001e]"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="md:col-span-2 bg-[#ea001e] hover:bg-red-700 transition py-5 rounded-2xl text-lg font-semibold"
          >

            Update Car

          </button>

        </form>

      </div>

    </section>
  );
}