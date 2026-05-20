"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // 🔥 Fake Google login (backend na thakle UI ready)
  const handleGoogleLogin = () => {
    toast.success("Google login successful");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded text-white border border-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded text-white border border-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 py-3 rounded font-semibold"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-blue-500 py-3 rounded font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-red-400">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}