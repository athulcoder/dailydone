import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function fetchUser() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;

  const res = await fetch("/api/user", {
    headers: {
      Cookie: `sessionid=${sessionid}`,
    },
  });

  const data = await res.json();

  if (!data.success) return;

  const user = data.data;

  return user;
}
