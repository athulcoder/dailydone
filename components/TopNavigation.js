import { fetchUser } from "@/utils/fetchUser";
import { getTodaysDate } from "@/utils/formatDate";

import Image from "next/image";

async function TopNavigation() {
  const { username, fullName, avatar } = await fetchUser();

  return (
    <div className=" max-lg:h-[60px] max-lg:px-3 w-full flex max-lg:justify-between items-center py-3  fixed top-0 z-50 bg-bg-secondary text-text-primary">
      {/* <span className="hidden font-bold font-sans min-lg:inline text-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {getTodaysDate()}
      </span> */}

      <div className="flex gap-1 items-center">
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full  min-lg:hidden"
        />
        <span className=" font-bold  font-sans lg:hidden xl:hidden text-xl">
          DailyDone
        </span>
      </div>

      <div className="flex gap-1 min-lg:mr-5">
        <p className="flex flex-col ">
          <span className=" text-sm">{fullName}</span>
          <span className="text-text-secondary text-xs text-right">
            @{username}
          </span>
        </p>
        <div className="relative w-[40px] h-[40px] min-lg:w-[45px] min-lg:h-[45px] rounded-full overflow-hidden border-1 border-loading-card-text ml-3">
          <Image
            src={avatar === "default" ? "/user.png" : avatar}
            alt=""
            width={45}
            height={45}
            className="rounded-full "
          />
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
