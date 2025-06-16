import React from "react";
import DashBoardClient from "./DashboardClient";
import { fetchUser } from "@/utils/fetchUser";

async function DashBoard() {
  const user = await fetchUser();
  return <DashBoardClient user={user}></DashBoardClient>;
}

export default DashBoard;
