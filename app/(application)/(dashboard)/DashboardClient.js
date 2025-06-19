"use client";
import AddNewTodo from "@/components/AddNewTodo";
import MobileTodoCard from "@/components/MobileTodoCard";
import TodoDataGrid from "@/components/TodoDataGrid";
import TodoSkeleton from "@/components/TodoSkeleton";

import { useTodos } from "@/contexts/todoProvider";
import { convertDateforUser } from "@/utils/formatDate";
import { wishUser } from "@/utils/wishUser";
// import { fetchUser } from "@/utils/fetchUser";

import React, { useState } from "react";

function DashBoardClient({ user }) {
  // const { username, fullName } = fetchUser();

  const { todos, loading } = useTodos();
  const [addNew, setAddNew] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    convertDateforUser(new Date() || "")
  );

  const [filter, setFilter] = useState("all");

  // add new todo if no todos in menu
  const handleAddNewTodo = () => {
    setAddNew(true);
  };

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

  if (addNew) return <AddNewTodo onClose={() => setAddNew(false)} />;
  return (
    <div className="">
      <div className="flex mb-3 px-4">
        <p>
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold text-2xl lg:text-2xl xl:text-2xl">
            {wishUser(user.fullName)}
          </span>
        </p>
      </div>
      <span className="text-lg  font-sans text-text-secondary px-4 font-bold">
        Tasks
      </span>
      {/* Cards */}
      <div>
        <TodoDataGrid />

        {/* Task Cards */}
        <div className="flex gap-4 mx-3 ">
          <div className="ring-1 ring-border-primary p-2 rounded-2xl text-text-secondary bg-bg-secondary">
            <input
              type="date"
              onChange={handleSelectedDate}
              className="border-0 outline-0"
              value={selectedDate}
            ></input>
          </div>

          <select
            className="ring-1 ring-border-primary p-2 rounded-2xl text-text-secondary bg-bg-secondary"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all" className="">
              All
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className=" flex flex-col justify-around gap-3 p-5 pb-[80px]  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
          {loading ? (
            <>
              <TodoSkeleton></TodoSkeleton> <TodoSkeleton></TodoSkeleton>
              <TodoSkeleton></TodoSkeleton> <TodoSkeleton></TodoSkeleton>
            </>
          ) : FilteredTodos.length > 0 ? (
            FilteredTodos.map((todo) => (
              <MobileTodoCard key={todo._id} todo={todo}></MobileTodoCard>
            ))
          ) : (
            <div className="flex items-center flex-col  w-full   h-[100px] text-text-secondary text-md">
              <span>Set a task for you to complete</span>
              <button
                onClick={handleAddNewTodo}
                className="bg-gradient-to-r from-purple-600 cursor-pointer to-blue-500 text-white font-medium px-6 py-2 mt-5 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition duration-300"
              >
                Add your Todo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardClient;
