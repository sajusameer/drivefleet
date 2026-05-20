"use client";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/my-bookings/test@gmail.com")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid gap-6">

        {bookings.map((b) => (
          <div key={b._id} className="bg-[#111] p-5 rounded">

            <h2>{b.carName}</h2>
            <p>Total: ${b.totalPrice}</p>
            <p>Date: {b.bookingDate}</p>

          </div>
        ))}

      </div>
    </div>
  );
}