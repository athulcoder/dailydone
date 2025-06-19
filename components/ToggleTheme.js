"use client";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

function ToggleTheme() {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    let html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      setTheme("light");
    } else {
      setTheme("dark");
      html.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={changeTheme}
      className="flex gap-2 hover:bg-hover-nav w-full p-3 rounded-2xl cursor-pointer "
      key="chnageTheme"
    >
      {theme === "light" ? <Moon /> : <Sun />}
      <span className="hidden lg:block xl:block"> {theme} mode</span>
    </button>
  );
}

export default ToggleTheme;
