"use client";
import MobileTodoCard from "@/components/MobileTodoCard";
import TodoDataGrid from "@/components/TodoDataGrid";

import { useTodos } from "@/contexts/todoProvider";
import { convertDateforUser } from "@/utils/formatDate";
// import { fetchUser } from "@/utils/fetchUser";

import React, { useState } from "react";

function DashBoardClient({ user }) {
  // const { username, fullName } = fetchUser();

  const { todos } = useTodos();
  const [selectedDate, setSelectedDate] = useState(
    convertDateforUser(new Date() || "2020-12-02")
  );

  const [filter, setFilter] = useState("all");

  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const FilteredTodos = todos.filter((todo) => {
    const matchesStatus =
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.isDone
        : !todo.isDone;

    const matchesDate =
      selectedDate === ""
        ? true
        : selectedDate === convertDateforUser(todo.dueDate);

    return matchesStatus && matchesDate;
  });
  return (
    <div className="">
      <div className="flex mb-3">
        <p>
          <span className="text-blue-600 font-light text-xl lg:font-bold xl:font-bold lg:text-2xl xl:text-2xl">
            Hi {user.fullName?.split(" ")[0] || "Guest"}
          </span>
        </p>
      </div>

      <span className="text-lg font-light font-sans text-[#989898] ">
        Tasks
      </span>

      {/* Cards */}

      <div>
        <TodoDataGrid />

        {/* Task Cards */}
        <div className="flex gap-4 mx-3 ">
          <div className="ring-1 ring-[#d3d3d3] p-2 rounded-2xl">
            <input
              type="date"
              onChange={handleSelectedDate}
              className="border-0 outline-0"
              value={selectedDate}
            ></input>
          </div>

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
          {FilteredTodos.length > 0 ? (
            FilteredTodos.map((todo) => (
              <MobileTodoCard key={todo._id} todo={todo}></MobileTodoCard>
            ))
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardClient;
