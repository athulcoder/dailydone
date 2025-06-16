"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}
