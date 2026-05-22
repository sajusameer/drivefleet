import Link from "next/link";

export default function NotFound() {

  return (
    <section className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        <h1 className="text-8xl font-black text-red-500 mb-6">
          404
        </h1>

        <h2 className="text-4xl font-bold mb-5">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-lg leading-8 mb-10">
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>

        <Link
          href="/"
          className="bg-red-500 hover:bg-red-700 transition px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Back To Home
        </Link>

      </div>

    </section>
  );
}