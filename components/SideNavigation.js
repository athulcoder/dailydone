import { handlelogout } from "@/utils/logout";
import {
  CirclePlus,
  Edit2,
  Edit3,
  Home,
  House,
  LogOut,
  LogOutIcon,
  Settings,
  User,
  UserCircle2,
} from "lucide-react";

import Link from "next/link";
const navlinks = [
  {
    title: "Home",
    href: "/",
    icon: <House />,
  },

  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: <Settings />,
  // },
  // {
  //   title: "Profile",
  //   href: "/profile",
  //   icon: <UserCircle2 />,
  // },
];

import React from "react";
import ToggleTheme from "./ToggleTheme";

function SideNavigation() {
  return (
    <nav className=" max-lg:flex  min-lg:flex min-lg:flex-col gap-6 items-center min-lg:mt-5 lg:items-start">
      <ToggleTheme />
      {navlinks.map((item) => {
        return (
          <Link
            href={item.href}
            className="flex gap-2 hover:bg-hover-nav w-full p-3 rounded-2xl  "
            key={item.title}
          >
            {item.icon}
            <span className="hidden lg:block xl:block">{item.title}</span>
          </Link>
        );
      })}

      <button
        onClick={handlelogout}
        className="flex gap-2 hover:bg-hover-nav w-full p-3 rounded-2xl cursor-pointer "
        key="logout"
      >
        <LogOutIcon />
        <span className="hidden lg:block xl:block">Logout</span>
      </button>
    </nav>
  );
}

export default SideNavigation;
