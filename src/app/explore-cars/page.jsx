import Link from "next/link";

async function getCars() {
  try {
    const res = await fetch("http://localhost:5000/cars", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function ExploreCars() {
  const cars = await getCars();

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-red-500 tracking-[6px] uppercase">
            Premium Collection
          </p>
          <h1 className="text-5xl font-bold mt-2">Explore Cars</h1>
        </div>

        {/* GRID */}
        {cars.length === 0 ? (
          <p className="text-gray-400 text-center">No cars found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500 transition"
              >

                <img
                  src={car.image}
                  alt={car.carName}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">
                      {car.carName}
                    </h2>

                    <span className="text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded-full">
                      {car.carType}
                    </span>
                  </div>

                  <div className="text-gray-400 text-sm space-y-1 mb-4">
                    <p>Seats: {car.seats}</p>
                    <p>Location: {car.location}</p>
                    <p>Status: {car.availability}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-red-500 text-xl font-bold">
                      ${car.price}/day
                    </p>

                    <Link
                      href={`/cars/${car._id}`}
                      className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
                    >
                      Details
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