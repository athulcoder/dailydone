import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "@/components/TopNavigation";
import { TodoProvider } from "@/contexts/todoProvider";

export const metadata = {
  title: {
    default: "DailyDone ",
    template: "%s | DailyDone",
  },
  description:
    "DailyDone is India’s homegrown productivity app  built by Athul Sabu to help you stay focused, organised, and on track every single day.",
  keywords: [
    "DailyDone",
    "To-Do App India",
    "Indian Productivity App",
    "Task Manager",
    "Made in India",
    "Athul Sabu",
    "Next.js 15",
  ],
  authors: [
    { name: "Athul Sabu", url: "https://dailydone-alpha.vercel.app/register" },
  ],
  creator: "Athul Sabu",
  metadataBase: new URL("https://dailydone-alpha.vercel.app/login"),
  openGraph: {
    title: "DailyDone Made in India. Built for Focus.",
    description:
      "DailyDone is a lightweight, fast, and clean Indian task tracker to help you focus and finish daily goals  built by Athul Sabu.",
    url: "https://www.linkedin.com/in/athul-sabu-84360a261/",
    siteName: "DailyDone",
    images: [
      {
        url: "https://athulcoder.github.io/assets/athulsabu--_Sm7nK8.jpg",
        width: 1200,
        height: 630,
        alt: "Screenshot of DailyDone – Made in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyDone",
    description: "Your clean, daily productivity companion  by Athul Sabu.",
    images: ["https://athulcoder.github.io/assets/athulsabu--_Sm7nK8.jpg"],
    creator: "@athulcoder",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full gap-3">
          {/* Left */}
          <div className="w-[16%] sm:w-[10%] md:w-[8%] lg:w-[15%] xl:w-[12%] h-screen p-2 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] bg-[#fbfbfb]">
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
              <span className="text-md font-bold text-black hidden lg:block xl:block ">
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
