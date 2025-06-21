"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { getUserProfile } from "@/lib/userProfile";
import { convertDateforUser } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

export default function ProfileClient({ user }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [themeDark, setThemeDark] = useState(false);
  const accountCreated = convertDateforUser(user.createdAt);

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // State for profile pics
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState();
  // Profile pic functions

  // defining file as global variable
  let selectedProfile;
  const handlePreview = (e) => {
    selectedProfile = e.target.files?.[0];

    if (!selectedProfile) return;

    setPreviewUrl(URL.createObjectURL(selectedProfile));
    setSelectedAvatar(selectedProfile);
  };

  const handleSaveProfile = async () => {
    if (selectedAvatar) {
      const formData = new FormData();
      formData.append("avatar", selectedAvatar);
      console.log(formData);
      setPreviewUrl("loading");

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          setAvatar(data.avatarUrl);
          setPreviewUrl("");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        setAvatar(user.avatar);
        setPreviewUrl("");
      }
    }
  };

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
    <div className="min-h-screen w-full px-4 py-8 md:px-16 md:py-8 text-text-primary pb-[120px]">
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
            {previewUrl === "loading" ? (
              <>
                <div className="w-full h-full animate-pulse bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200" />
              </>
            ) : previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src={avatar == "default" ? "/user.png" : avatar}
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-text-secondary mb-3">{username}</p>

            <input
              id="file-uploader"
              type="file"
              accept="image/*"
              onChange={handlePreview}
              className="mt-3 text-sm text-blue-600 hover:underline hidden"
            />
            {previewUrl === "loading" ? (
              <div className="text-sm text-text-third flex items-center space-x-1">
                <span>Uploading</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </div>
            ) : previewUrl ? (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleSaveProfile()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-1.5 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setPreviewUrl("")}
                  className="text-sm text-gray-600 px-4 py-1.5 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-uploader"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-1.5 rounded-lg"
              >
                Change Profile
              </label>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
