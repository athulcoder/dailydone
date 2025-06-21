import { NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import crypto from "crypto";
import path from "path";
import { uploadToCloudinary } from "@/utils/cloudinary.js";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";

export async function POST(req) {
  const sessionid = req.cookies.get("sessionid")?.value;

  if (!sessionid)
    return NextResponse({
      success: false,
      message: "user is not authenticated to change profile",
    });

  const currentUser = await verifyToken(sessionid);

  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("avatar");

    if (!file || typeof file === "string") {
      console.log(req);
      console.log(file, typeof file);
      return NextResponse.json(
        { success: false, message: "not a valid file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${currentUser.username}${path.extname(file.name)}`;

    // Direcly uploads to cloudinary
    const result = await uploadToCloudinary(buffer, filename);

    const avatar = result.secure_url;

    console.log(currentUser);
    const updatedUser = await User.findOneAndUpdate(
      { email: currentUser.email },
      { avatar },
      { new: true, lean: true }
    );

    const { password, _v, ...safeUser } = updatedUser;

    return NextResponse.json({
      success: true,
      message: "file uploaded",
      avatarUrl: result.secure_url,
      user: safeUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
