import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export function fetchUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionid")?.value;

  if (!token) redirect("/login");
  const decoded = verifyToken(token);

  if (!decoded) redirect("/login");

  return decoded;
}
