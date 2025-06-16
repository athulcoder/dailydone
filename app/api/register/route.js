import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { fullName, username, email, password } = await req.json();

  //   Check all fields are available
  if (!fullName || !username || !email || !password) {
    return Response.json({ error: "All Feilds are required" });
  }
  await connectDB();

  let userExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (userExist) return Response.json({ error: "User already Exists" });

  //   hash password

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    username,
    email,
    password: hashPassword,
  });

  newUser.save();
  // token for next auth
  const token = await signToken({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    email: newUser.email,
  });
  const response = NextResponse.json(
    {
      success: true,
      message: "User Created Successfully",
      user: {
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
      },
    },
    { status: 201 }
  );

  response.cookies.set("sessionid", token);

  return response;
}
