import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email_username, password } = await req.json();

    await connectDB();
    const user = await User.findOne({
      $or: [{ email: email_username }, { username: email_username }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email is not registered" },
        { status: 400 }
      );
    }

    const hashPassword = user.password;
    const checkUser = await bcrypt.compare(password, hashPassword);

    if (!checkUser) {
      return NextResponse.json(
        { success: false, message: "Password is invalid !" },
        { status: 401 }
      );
    }

    const token = await signToken({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "User login was successful",
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
  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
