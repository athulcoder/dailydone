import React from "react";
import { TodoProvider } from "@/contexts/todoProvider";
function DashboardLayout({ children }) {
  return (
    <TodoProvider>
      <div>{children}</div>;
    </TodoProvider>
  );
}

export default DashboardLayout;
