import { cookies } from "next/headers";
import ProfileClient from "./profileClient";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;
  let user = null;
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      headers: {
        Cookie: `sessionid=${sessionid}`,
      },
    });

    const data = await res.json();

    if (!data.success) return;

    user = data.data;
  } catch (error) {}

  if (!user) {
    return <div className="p-6">You need to log in.</div>;
  }

  return <ProfileClient user={user} />;
}
