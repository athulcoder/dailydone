import React from "react";
import { Pencil, Lock } from "lucide-react";

export default function ProfilePage() {
  const user = {
    avatar: "https://i.pravatar.cc/150?img=5",
    fullName: "Rohit Sharma",
    username: "rohit_07",
    email: "rohit@example.com",
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 lg:mt-10 lg:p-6 lg:bg-white lg:rounded-2xl lg:shadow-md">
      {/* Avatar Section */}
      <div className="flex items-center justify-center relative mb-6">
        <img
          src={user.avatar || "/avatar-placeholder.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow"
        />
        <button className="absolute bottom-0 right-1 bg-white p-1 rounded-full shadow hover:bg-indigo-100 transition">
          <Pencil className="w-4 h-4 text-indigo-600" />
        </button>
      </div>

      {/* User Info */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-500 text-sm">@{user.username}</p>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 px-6 lg:px-0">
        <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
          <Pencil size={18} /> Edit Profile
        </button>

        <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
          <Lock size={18} /> Change Password
        </button>
      </div>
    </div>
  );
}
