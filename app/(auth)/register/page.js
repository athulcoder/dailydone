"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingAnimation from "@/components/LoadingAnimation";
import Image from "next/image";
import { handleUsernameCheck } from "@/utils/usernameCheck";
import {
  BadgeAlertIcon,
  BadgeXIcon,
  CheckCircle2,
  OctagonX,
  TriangleAlert,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [usernameStatus, setUsernameStatus] = useState(3);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name == "username") {
      const uname = e.target.value;

      if (uname.length > 2) {
        const data = await handleUsernameCheck(uname);
        if (data.success) setUsernameStatus(1);
        else setUsernameStatus(2);
      } else {
        setUsernameStatus(3);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password.length < 6) {
      setError("weak password used");
      setLoading(false);
    }
    if (formData.username.length < 3) {
      setError("username should have atleast 3 characters");
      setLoading(false);
    } else {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/");
      } else {
        setError(data.message);
      }

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 flex items-center justify-center bg-gray-100 px-4 ">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-md md:shadow-xl overflow-hidden">
        {/* Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white">
          <Image
            src="/logo.png"
            alt="DailyDone Logo"
            width={100}
            height={100}
            className="w-20 md:w-28 h-20 md:h-28 mb-4"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome to DailyDone
          </h1>
          <p className="text-center text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
            Organize your tasks, stay focused, and boost productivity with
            DailyDone — your personal productivity companion.
          </p>
        </div>

        {/* Register Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white shadow-sm md:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Register
            </h2>
            <span className="text-sm font-light text-center text-red-500 block">
              {error}
            </span>

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
                className="text-sm text-gray-500 font-medium flex gap-3 items-center"
              >
                Username
                {usernameStatus === 1 ? (
                  <span className="text-green-700 flex gap-1 font-sans items-center text-xs">
                    {" "}
                    <CheckCircle2 className="w-4" /> username available
                  </span>
                ) : usernameStatus === 3 ? (
                  <span className="hidden">hi</span>
                ) : (
                  <span className="text-red-400 font-sans flex gap-1 items-center text-xs">
                    {" "}
                    <OctagonX className="w-4" /> username taken
                  </span>
                )}
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
              <label
                htmlFor="email"
                className="text-sm text-gray-500 font-medium"
              >
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
                className="w-full py-2.5 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all text-sm"
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
      </div>
    </div>
  );
}
