import { fetchUser } from "@/utils/fetchUser";
import { getTodaysDate } from "@/utils/formatDate";

import Image from "next/image";

async function TopNavigation() {
  const { username, fullName } = await fetchUser();

  return (
    <div className="w-full flex justify-between items-center py-3 lg:justify-between xl:justify-between sticky top-0 z-50 bg-white">
      <span className="hidden font-bold font-sans lg:block xl:block text-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {getTodaysDate()}
      </span>

      <span className=" font-bold text-black font-sans lg:hidden xl:hidden text-xl">
        DailyDone
      </span>

      <div className="flex gap-1 mr-5">
        <p className="flex flex-col ">
          <span className="text-black text-sm">{fullName}</span>
          <span className="text-[#696666] text-xs text-right">@{username}</span>
        </p>
        <Image
          src="/user.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full ml-3"
        />
      </div>
    </div>
  );
}

export default TopNavigation;
