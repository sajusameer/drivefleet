"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD VALIDATION
  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    return hasUpper && hasLower && hasLength;
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // VALIDATION
      if (!validatePassword(form.password)) {
        toast.error(
          "Password must contain uppercase, lowercase and minimum 6 characters"
        );
        setLoading(false);
        return;
      }

      const { error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || undefined,
      });

      if (error) {
        toast.error(error?.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Registration successful");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE REGISTER
  const handleGoogleRegister = async () => {
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google sign up failed");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-24">

      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-[#ea001e] uppercase tracking-[6px] mb-3">
            Join DriveFleet
          </p>

          <h1 className="text-4xl font-bold text-white">
            Register
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#ea001e]"
            />
          </div>

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

          {/* PHOTO */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Photo URL
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter photo URL (optional)"
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

            <p className="text-xs text-gray-500 mt-2">
              Must contain uppercase, lowercase & minimum 6 characters
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ea001e] hover:bg-red-700 transition text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full border border-white/10 hover:border-[#ea001e] transition text-white py-4 rounded-xl font-medium disabled:opacity-50"
        >
          Continue with Google
        </button>

        {/* LOGIN */}
        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-[#ea001e] hover:underline">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}