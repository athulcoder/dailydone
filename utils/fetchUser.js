import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function fetchUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionid")?.value;

  if (!token) redirect("/");
  const decoded = await verifyToken(token);

  if (!decoded) redirect("/login");

  return decoded;
}
