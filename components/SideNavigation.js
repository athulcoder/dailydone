import {
  CirclePlus,
  Edit2,
  Edit3,
  Home,
  House,
  Settings,
  User,
} from "lucide-react";

import Link from "next/link";
const navlinks = [
  {
    title: "Home",
    href: "/",
    icon: <House />,
  },
  // {
  //   title: "Profile",
  //   href: "/profile",
  //   icon: <User />,
  // },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: <Settings />,
  // },
  // {
  //   title: "Add new",
  //   href: "/",
  //   icon: <CirclePlus />,
  // },
];

import React from "react";

function SideNavigation() {
  return (
    <nav className="flex flex-col gap-6 items-center mt-5 lg:items-start">
      {navlinks.map((item) => {
        return (
          <Link
            href={item.href}
            className="flex gap-2 hover:bg-[#f4f3f3] w-full p-3 rounded-2xl  "
            key={item.title}
          >
            {item.icon}
            <span className="hidden lg:block xl:block">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default SideNavigation;
