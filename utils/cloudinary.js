import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(localPath, folder = "profile-pics") {
  const filename = path.basename(localPath, path.extname(localPath)); // '3478e1a1-avatar'

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      public_id: filename,
      overwrite: false,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}
