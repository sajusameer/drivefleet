"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN EMAIL/PASSWORD
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error?.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-24">

      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-[#ea001e] uppercase tracking-[6px] mb-3">
            Welcome Back
          </p>

          <h1 className="text-4xl font-bold text-white">
            Login
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#ea001e]"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#ea001e]"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ea001e] hover:bg-red-700 transition text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-white/10 hover:border-[#ea001e] transition text-white py-4 rounded-xl font-medium disabled:opacity-50"
        >
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-gray-400 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#ea001e] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}