import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { email, password } = await req.json();

  // check email exists
  await connectDB();
  let user = await User.findOne({ email });

  if (!user)
    return new Response(
      JSON.stringify({ success: false, message: "Email is not registered" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  // Check password
  const hashPassword = user.password;

  const checkUser = await bcrypt.compare(password, hashPassword);

  if (!checkUser) {
    return NextResponse.json({
      success: false,
      message: "password is invalid",
    });
  }

  const token = signToken({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  });
  const response = NextResponse.json(
    {
      success: true,
      message: "User logging was successfull",
      user: {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    },
    { status: 200 }
  );

  response.cookies.set("sessionid", token);

  return response;
}
