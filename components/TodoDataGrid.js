"use client";
import React, { useEffect, useState } from "react";
import TodoDataCard from "./TodoDataCard";
import { useTodos } from "@/contexts/todoProvider";
import Calendar from "./Calender";
import AddNewTodo from "./AddNewTodo";

function TodoDataGrid() {
  const { todos, deleteTodo } = useTodos();

  const [pendingTodo, setPeningTodo] = useState(0);
  const [completedTodo, setCompletedTodo] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [addNew, setAddNew] = useState(false);

  //
  const handleAddnew = () => {
    setAddNew(true);
  };

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

  if (addNew) return <AddNewTodo onClose={() => setAddNew(false)} />;
  return (
    <div className="flex justify-center gap-8   items-center lg:justify-center xl:items-start   my-3">
      <div className="grid grid-cols-2 gap-8  md:flex md:justify-around">
        <TodoDataCard name="Pending" count={pendingTodo} />
        <TodoDataCard name="Completed" count={completedTodo} />
        <TodoDataCard name="Time Needed (hours)" count={remainingTime} />
        <button onClick={handleAddnew} className="cursor-pointer ">
          <TodoDataCard name="Add new" count="+" />
        </button>
      </div>

      {/* <Calendar /> */}
    </div>
  );
}

export default TodoDataGrid;
