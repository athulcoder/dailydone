"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/");
    } else {
      setError(data.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <h2 className="text-sm font-light text-center text-red-500">{error}</h2>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-gray-500 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm text-gray-500 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            required
          />
        </div>

        {loading ? (
          <LoadingAnimation />
        ) : (
          <button
            type="submit"
            className="w-full py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all text-sm"
          >
            Login
          </button>
        )}

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
