"use client";
import React, { useEffect, useState } from "react";
import TodoDataCard from "./TodoDataCard";
import { useTodos } from "@/contexts/todoProvider";

function TodoDataGrid() {
  const { todos, deleteTodo } = useTodos();

  const [pendingTodo, setPeningTodo] = useState(0);
  const [completedTodo, setCompletedTodo] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let pcount = 0;
    let ccount = 0;
    let rTime = 0;
    todos.map((todo) => {
      if (todo.isDone) {
        ccount++;
      } else {
        pcount++;
        rTime += todo.timeNeed;
      }
    }, todos);

    setCompletedTodo(ccount);
    setPeningTodo(pcount);
    setRemainingTime(rTime);
  });
  return (
    <div className="flex justify-center gap-8   items-center lg:justify-center xl:items-start   my-3">
      <div className="grid grid-cols-2 gap-8  md:flex md:justify-around">
        <TodoDataCard name="Pending" count={pendingTodo} />
        <TodoDataCard name="Completed" count={completedTodo} />
        <TodoDataCard name="Time Needed (hours)" count={remainingTime} />
        <TodoDataCard name="Add new" count="+" />
      </div>

      <div className="hidden  lg:w-[300px] xl:w-[450px]  h-[280px] bg-[#f6fdfc] rounded-2xl lg:flex xl:flex flex-col items-center justify-center shadow-lg  transition-shadow duration-300">
        calender
      </div>
    </div>
  );
}

export default TodoDataGrid;
