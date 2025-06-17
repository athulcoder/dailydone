import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username } = await req.json();

  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (!user)
      return NextResponse.json({
        success: true,
        message: "Username available",
      });

    return NextResponse.json({ success: false, message: "Username taken" });
  } catch (error) {
    console.log("Username error :", error);
  }
}
