"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Password validation
  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    return hasUpper && hasLower && isLongEnough;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must have uppercase, lowercase and min 6 characters"
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // 🔥 Fake Google login UI
  const handleGoogleLogin = () => {
    toast.success("Google registration successful");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 rounded text-white border border-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded text-white border border-white"
            required
          />

          <input
            name="photo"
            placeholder="Photo URL"
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
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-blue-500 py-3 rounded font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}