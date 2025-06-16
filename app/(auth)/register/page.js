"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/register`, {
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
      alert(data.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="text-sm text-gray-500 font-medium"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="username"
            className="text-sm text-gray-500 font-medium"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            required
          />
        </div>

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
            placeholder="Create a password"
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
            Sign up
          </button>
        )}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
