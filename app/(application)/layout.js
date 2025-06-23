import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "@/components/TopNavigation";
import { TodoProvider } from "@/contexts/todoProvider";
import { ToastProvider } from "@/contexts/toastProvider";

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
        url: "https://raw.githubusercontent.com/athulcoder/dailydone/refs/heads/main/public/logo.png",
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
    images: [
      "https://raw.githubusercontent.com/athulcoder/dailydone/refs/heads/main/public/logo.png",
    ],
    creator: "@athulcoder",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex  flex-col-reverse  lg:flex-row xl:flex-row h-screen w-full  bg-bg">
        {/* Left  in large screens and it is bottom in mobile devices */}
        <div className="  max-lg:items-center  max-lg:justify-center max-lg:flex max-lg:flex-row-reverse max-lg:w-full max-lg:h-[60px] max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-50 max-lg:shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.1)] lg:block xl:block lg:w-[15%] xl:w-[12%] lg:h-screen xl:h-screen p-2 min-lg:shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] bg-bg-secondary text-text-primary">
          <Link
            href="/"
            className="flex gap-3 items-center justify-center lg:justify-start xl:justify-start"
          >
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full hidden min-lg:block"
            />
            <span className="text-md font-bold text-text-primary hidden lg:block xl:block ">
              DailyDone
            </span>
          </Link>

          <SideNavigation />
        </div>

        {/* Right */}
        <div className="max-lg:flex max-lg:flex-col max-lg:justify-between  w-full lg:w-[85%] xl:w-[88%]  h-screen lg:overflow-scroll xl:overflow-scroll ">
          <TopNavigation />
          <div className="max-lg:pb-[60px] pt-[80px] bg-bg min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
