"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white text-center">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="DailyDone Logo"
        width={80}
        height={80}
        className="mb-6"
        priority
      />

      {/* Headline */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-base md:text-lg mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist. It might have been
        removed or renamed.
      </p>

      {/* Go back button */}
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-blue-700 transition"
      >
        ← Go back to Home
      </Link>
    </div>
  );
}
