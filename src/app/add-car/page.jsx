"use client";

import { useRouter } from "next/navigation";

export default function AddCarPage() {

  const router = useRouter();

  const handleAddCar = async (e) => {

    e.preventDefault();

    const form = e.target;

    const carData = {
      carName: form.carName.value,
      price: form.price.value,
      carType: form.carType.value,
      image: form.image.value,
      seats: form.seats.value,
      location: form.location.value,
      description: form.description.value,
      availability: form.availability.value,
    };

    const res = await fetch(
      "http://localhost:5000/cars",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(carData),
      }
    );

    const data = await res.json();

    if (data.insertedId) {

      alert("Car Added");

      router.push(
        "/explore-cars"
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

      <div className="max-w-4xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-10">

        <h1 className="text-5xl font-bold mb-10">
          Add New Car
        </h1>

        <form
          onSubmit={handleAddCar}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="carName"
            placeholder="Car Name"
            className="bg-black border border-white/10 rounded-xl p-4"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Daily Rent Price"
            className="bg-black border border-white/10 rounded-xl p-4"
            required
          />

          <select
            name="carType"
            className="bg-black border border-white/10 rounded-xl p-4"
          >
            <option>SUV</option>
            <option>Sedan</option>
            <option>Luxury</option>
            <option>Hatchback</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="bg-black border border-white/10 rounded-xl p-4"
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Seat Capacity"
            className="bg-black border border-white/10 rounded-xl p-4"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Pickup Location"
            className="bg-black border border-white/10 rounded-xl p-4"
            required
          />

          <select
            name="availability"
            className="bg-black border border-white/10 rounded-xl p-4"
          >
            <option>
              Available
            </option>

            <option>
              Unavailable
            </option>
          </select>

          <div></div>

          <textarea
            name="description"
            rows="6"
            placeholder="Description"
            className="bg-black border border-white/10 rounded-xl p-4 md:col-span-2"
          />

          <button className="bg-[#ea001e] py-5 rounded-2xl font-semibold md:col-span-2 hover:bg-red-700 transition">
            Add Car
          </button>

        </form>

      </div>

    </section>
  );
}