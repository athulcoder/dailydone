"use client";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

function ToggleTheme() {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const defaultTheme = localStorage.getItem("theme") || "dark";
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]); //

  const changeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={changeTheme}
      className="flex gap-2 hover:bg-hover-nav w-full p-3 rounded-2xl cursor-pointer "
      key="chnageTheme"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
      <span className="hidden lg:block xl:block">Mode</span>
    </button>
  );
}

export default ToggleTheme;
