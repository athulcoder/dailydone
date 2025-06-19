"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("@johndoe");
  const [email] = useState("john@example.com");
  const [phone, setPhone] = useState("+1234567890");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(28);
  const [themeDark, setThemeDark] = useState(false);
  const accountCreated = "2023-04-21";

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const saveChange = (setValue) => {
    setValue(tempValue);
    setEditingField(null);
  };

  const cancelChange = () => {
    setEditingField(null);
    setTempValue("");
  };

  const renderField = (
    label,
    fieldName,
    value,
    setValue,
    type = "text",
    options = []
  ) => (
    <div className="space-y-2">
      <label className="block text-sm text-text-secondary">{label}</label>
      {editingField === fieldName ? (
        <>
          {type === "select" ? (
            <select
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              autoFocus
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={tempValue}
              onChange={(e) =>
                setTempValue(
                  type === "number" ? +e.target.value : e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              autoFocus
            />
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => saveChange(setValue)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-1.5 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={cancelChange}
              className="text-sm text-gray-600 px-4 py-1.5 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <p className="flex-1">{value}</p>
          <button
            onClick={() => startEditing(fieldName, value)}
            className="text-text-secondary hover:text-blue-500"
          >
            <Edit2 size={16} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-16 md:py-12 text-text-primary">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <button className="border border-red-500 text-red-500 px-4 py-1.5 text-sm md:text-base md:px-5 md:py-2 rounded-xl">
            Logout
          </button>
        </div>

        {/* Profile Picture */}
        <div className="bg-data-card border border-border-primary p-6 rounded-xl shadow-sm flex flex-col items-center gap-4 text-center md:flex-row md:justify-start md:text-left">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-text-secondary">
            <Image
              src="/default-profile.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-text-secondary">{username}</p>
            <button className="mt-3 text-sm text-blue-600 hover:underline">
              Change Picture
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-data-card border border-border-primary p-6 rounded-xl shadow-sm space-y-6">
          <h3 className="font-semibold text-lg text-text-secondary">
            Basic Info
          </h3>
          {renderField("Full Name", "name", name, setName)}
          {renderField("Username", "username", username, setUsername)}
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Email
            </label>
            <p>{email}</p>
          </div>
        </div>

        {/* Contact & Personal Info */}
        <div className="bg-data-card border border-border-primary p-6 rounded-xl shadow-sm space-y-6">
          <h3 className="font-semibold text-lg text-text-secondary">
            Contact & Personal
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {renderField("Phone", "phone", phone, setPhone)}
            {renderField("Gender", "gender", gender, setGender, "select", [
              "male",
              "female",
              "other",
            ])}
            {renderField("Age", "age", age, setAge, "number")}
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Account Created
              </label>
              <p>{accountCreated}</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-data-card border border-border-primary p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-semibold text-lg text-text-secondary">
            Security
          </h3>
          <div className="flex justify-between items-center">
            <span>Reset Password</span>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm md:text-base px-4 py-1.5 md:px-5 md:py-2 rounded-xl">
              Reset
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-data-card border border-border-primary p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-semibold text-lg text-text-secondary">
            Preferences
          </h3>
          <div className="flex justify-between items-center">
            <span>Dark Theme</span>
            <button
              onClick={() => setThemeDark(!themeDark)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                themeDark ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  themeDark ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
