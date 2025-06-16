"use client";
import TodoDataGrid from "@/components/TodoDataGrid";
import TodoTable from "@/components/TodoTable";

import React from "react";

function DashBoard() {
  // const { todos, deleteTodo } = useTodos();
  return (
    <div className="">
      {/* Wish box */}
      <div className="flex mb-3">
        <p>
          <span className="text-yellow-400 font-light text-xl lg:font-bold xl:font-bold lg:text-2xl xl:text-2xl">
            Good morning John !
          </span>
        </p>
      </div>

      <span className="text-lg font-light font-sans text-[#989898] ">
        Tasks
      </span>

      {/* Cards */}

      <TodoDataGrid />

      {/* Task table */}
      <span className="text-lg font-light font-sans text-[#989898]">Table</span>

      <TodoTable />
    </div>
  );
}

export default DashBoard;
