"use client";
import { redirect } from "next/navigation";

export async function handlelogout() {
  const res = await fetch("api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  redirect("/login");
}
