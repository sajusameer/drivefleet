// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";

// export default function MyBookingsPage() {

//   const { data: session } =
//     authClient.useSession();

//   const [bookings, setBookings] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   // =========================
//   // FETCH BOOKINGS
//   // =========================

//   useEffect(() => {

//     if (!session?.user?.email)
//       return;

//     const fetchBookings =
//       async () => {

//         try {

//           const res = await fetch(
//             `http://localhost:5000/my-bookings/${session.user.email}`
//           );

//           const data =
//             await res.json();

//           setBookings(data);

//         } catch (error) {

//           console.log(error);

//         } finally {

//           setLoading(false);

//         }

//       };

//     fetchBookings();

//   }, [session]);


// //   booking update


//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {

//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">

//         Loading...

//       </div>
//     );

//   }

//   return (
//     <section className="min-h-screen bg-[#050505] text-white py-28 px-6">

//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}

//         <div className="mb-14 text-center">

//           <p className="text-[#ea001e] uppercase tracking-[5px] mb-3">

//             Dashboard

//           </p>

//           <h1 className="text-5xl font-bold">

//             My Bookings

//           </h1>

//         </div>

//         {/* EMPTY */}

//         {bookings.length === 0 && (

//           <div className="bg-[#111111] border border-white/10 rounded-3xl p-14 text-center">

//             <h2 className="text-3xl font-bold mb-4">

//               No Bookings Yet

//             </h2>

//             <p className="text-gray-400">

//               You have not booked any cars.

//             </p>

//           </div>

//         )}

//         {/* GRID */}

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {bookings.map((booking) => (

//             <div
//               key={booking._id}
//               className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden"
//             >

//               {/* IMAGE */}

//               <img
//                 src={booking.carImage}
//                 alt={booking.carName}
//                 className="h-64 w-full object-cover"
//               />

//               {/* CONTENT */}

//               <div className="p-6">

//                 <h2 className="text-2xl font-bold mb-4">

//                   {booking.carName}

//                 </h2>

//                 <div className="space-y-3 text-gray-400 mb-6">

//                   <p>
//                     Booking Date:
//                     {" "}
//                     {booking.bookingDate}
//                   </p>

//                   <p>
//                     Driver Needed:
//                     {" "}
//                     {booking.driverNeeded}
//                   </p>

//                   <p>
//                     Total Price:
//                     {" "}
//                     ${booking.price}
//                   </p>

//                   <p>
//                     Note:
//                     {" "}
//                     {booking.specialNote || "N/A"}
//                   </p>

//                 </div>

//                 <button className="w-full bg-[#ea001e] py-3 rounded-xl font-semibold">

//                   Booked

//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// } 
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH BOOKINGS
  // =========================
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/my-bookings/${session.user.email}`
        );

        const data = await res.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.email]);

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14 text-center">
          <p className="text-[#ea001e] uppercase tracking-[5px] mb-3">
            Dashboard
          </p>
          <h1 className="text-5xl font-bold">My Bookings</h1>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-3xl p-14 text-center">
            <h2 className="text-3xl font-bold mb-4">No Bookings Yet</h2>
            <p className="text-gray-400">
              You have not booked any cars.
            </p>
          </div>
        ) : (
          // GRID
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] transition"
              >
                {/* IMAGE */}
                <img
                  src={booking.carImage || "/placeholder.jpg"}
                  alt={booking.carName || "Car"}
                  className="h-64 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {booking.carName}
                  </h2>

                  <div className="space-y-2 text-gray-400 mb-6 text-sm">
                    <p>
                      <span className="text-white">Booking Date:</span>{" "}
                      {booking.bookingDate || "N/A"}
                    </p>

                    <p>
                      <span className="text-white">Driver:</span>{" "}
                      {booking.driverNeeded ? "Yes" : "No"}
                    </p>

                    <p>
                      <span className="text-white">Total:</span> $
                      {booking.price || 0}
                    </p>

                    <p>
                      <span className="text-white">Note:</span>{" "}
                      {booking.specialNote || "N/A"}
                    </p>
                  </div>

                  <button
                    disabled
                    className="w-full bg-[#ea001e]/80 py-3 rounded-xl font-semibold cursor-not-allowed"
                  >
                    Booked
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}