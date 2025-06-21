import mongoose from "mongoose";

let isConnected = false;

const DB_NAME = "dailydone-db";

export async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    isConnected = true;
    console.log(" MongoDB connected to ", conn.connection.host);
  } catch (error) {
    console.log("Mongoose connection failed:", error);
  }
}
