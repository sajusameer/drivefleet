"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {

  const router = useRouter();

  const handleRegister =
    async (e) => {

      e.preventDefault();

      const form = e.target;

      const name = form.name.value;

      const email = form.email.value;

      const image =
        form.image.value;

      const password =
        form.password.value;

      const result =
        await authClient.signUp.email({
          email,
          password,
          name,
          image,
        });

      if (result.error) {

        toast.error(result.error.message);

        return;
      }

      toast.success(
        "Registration successful"
      );

      router.push("/");
    };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <input
            type="text"
            name="image"
            placeholder="Photo URL"
            required
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <button className="w-full bg-[#ea001e] py-4 rounded-xl font-semibold hover:bg-red-700 transition">

            Register

          </button>

        </form>

        <p className="text-center mt-6 text-gray-400">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-[#ea001e]"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}