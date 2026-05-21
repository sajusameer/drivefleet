"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateCar() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    price: "",
    description: "",
    availability: "",
    image: "",
    carType: "",
    location: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Updated successfully");
      router.push("/my-added-cars");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Update Car</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input name="price" value={form.price} onChange={handleChange} className="text-black p-2 w-full" />
        <input name="image" value={form.image} onChange={handleChange} className="text-black p-2 w-full" />
        <input name="carType" value={form.carType} onChange={handleChange} className="text-black p-2 w-full" />
        <input name="location" value={form.location} onChange={handleChange} className="text-black p-2 w-full" />
        <input name="availability" value={form.availability} onChange={handleChange} className="text-black p-2 w-full" />

        <textarea name="description" value={form.description} onChange={handleChange} className="text-black p-2 w-full" />

        <button className="bg-green-600 px-6 py-3">
          Update
        </button>

      </form>
    </div>
  );
}