import { notFound } from "next/navigation";

async function getCar(id) {
  try {
    const res = await fetch(
      `http://localhost:5000/cars/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();

  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function CarDetails({ params }) {

  const { id } = await params;

  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-20 px-4 md:px-8 mt-8">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}

        <div className="relative">

          <img
            src={car.image}
            alt={car.carName}
            className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-white/10"
          />

          <div className="absolute top-5 left-5 bg-red-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {car.availability}
          </div>

        </div>

        {/* CONTENT */}

        <div>

          <p className="text-red-500 uppercase tracking-[4px] font-semibold mb-3">
            Premium Car
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            {car.carName}
          </h1>

          <p className="text-gray-400 text-lg leading-8 mb-8">
            {car.description}
          </p>

          {/* INFO CARDS */}

          <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-1">
                Car Type
              </p>

              <h3 className="text-xl font-bold">
                {car.carType}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-1">
                Seats
              </p>

              <h3 className="text-xl font-bold">
                {car.seats}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-1">
                Location
              </p>

              <h3 className="text-xl font-bold">
                {car.location}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-1">
                Status
              </p>

              <h3 className="text-xl font-bold text-green-400">
                {car.availability}
              </h3>
            </div>

          </div>

          {/* PRICE */}

          <div className="flex items-center gap-3 mb-8">

            <h2 className="text-5xl font-extrabold text-red-500">
              ${car.price}
            </h2>

            <span className="text-gray-400 text-xl">
              / day
            </span>

          </div>

          {/* BUTTON */}

          <button className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105">

            Book Now

          </button>

        </div>

      </div>

    </section>
  );
}