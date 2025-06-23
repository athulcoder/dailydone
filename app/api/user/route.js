import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const sessionid = await req.cookies.get("sessionid")?.value;

  if (!sessionid) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const userData = await verifyToken(sessionid);

    const user = await User.findOne({
      email: userData.email,
      username: userData.username,
    }).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { password, _v, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: "User details retrieved",
      data: safeUser,
    });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const cookieStore = cookies();
  const sessionid = (await cookieStore).get("sessionid")?.value;

  if (!sessionid)
    return NextResponse.json({ success: false, message: "User not found" });

  await connectDB();
  // using sessionid we are getting the users email
  const { field, value } = await req.json();

  // dynamic update object
  const update = { $set: { [field]: value } };

  const { email } = await verifyToken(sessionid);

  const updatedUser = await User.findOneAndUpdate({ email }, update, {
    new: true,
  }).lean();

  console.log(updatedUser, update);

  const { password, _v, ...safeUser } = updatedUser;

  return NextResponse.json({
    success: true,
    message: `${field} updated`.toLowerCase(),
    data: safeUser,
  });
}
