import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    avatar: { type: String, default: "default" },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: " " },
    gender: { type: String, default: " " },
    age: { type: Number, default: null },
    password: { type: String, required: true },
  },

  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
