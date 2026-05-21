"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const handleLogin = async (e) => {

    e.preventDefault();

    const form = e.target;

    const email = form.email.value;

    const password =
      form.password.value;

    const result =
      await authClient.signIn.email({
        email,
        password,
      });

    if (result.error) {

      toast.error(result.error.message);

      return;
    }

    toast.success(
      "Login successful"
    );

    router.push("/");
  };

 const handleGoogleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

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

            Login

          </button>

        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white text-black py-4 rounded-xl font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-400">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="text-[#ea001e]"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}