import { cookies } from "next/headers";
import ProfileClient from "./profileClient";
import { fetchUser } from "@/utils/fetchUser";

export default async function ProfilePage() {
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
