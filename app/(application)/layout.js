import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "@/components/TopNavigation";
import { TodoProvider } from "@/contexts/todoProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full">
          {/* Left */}
          <div className="w-[16%] sm:w-[10%] md:w-[8%] lg:w-[15%] xl:w-[12%]   h-screen p-2">
            <Link
              href="/"
              className="flex gap-3 items-center justify-center lg:justify-start xl:justify-start"
            >
              <Image
                src="/logo.png"
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-sm text-black hidden lg:block xl:block ">
                DailyDone
              </span>
            </Link>

            <SideNavigation />
          </div>

          {/* Right */}
          <div className="w-[84%] sm:w-[90%] md:w-[92%] lg:w-[85%] xl:w-[88%]  h-screen overflow-scroll">
            <TopNavigation />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
