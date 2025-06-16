"use client";
import MobileTodoCard from "@/components/MobileTodoCard";
import TodoDataGrid from "@/components/TodoDataGrid";
import TodoTable from "@/components/TodoTable";
import { useTodos } from "@/contexts/todoProvider";

import React, { useState } from "react";

function DashBoard() {
  const { todos } = useTodos();

  const [filter, setFilter] = useState("all");

  const FilterTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "pending") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
  });
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

      {/* Task Cards */}
      <div className="flex gap-4 mx-3 ">
        <select className="ring-1 ring-[#d3d3d3] p-2 rounded-2xl">
          <option>Today</option>
          <option>Tommorow</option>
        </select>

        <select
          className="ring-1 ring-[#d3d3d3] p-2 rounded-2xl"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className=" flex flex-col justify-around gap-3 m-3  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FilterTodos.map((todo) => {
          return <MobileTodoCard todo={todo} key={todo.id}></MobileTodoCard>;
        })}
      </div>

      {/* <TodoTable /> */}
    </div>
  );
}

export default DashBoard;
