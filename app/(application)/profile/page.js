import { cookies } from "next/headers";
import ProfileClient from "./profileClient";
import { fetchUser } from "@/utils/fetchUser";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;

  const user = await fetchUser();
  if (!user) {
    return (
      <div className="p-6 text-text-secondary text-center">
        You need to log in.
      </div>
    );
  }

  return <ProfileClient user={user} />;
}
