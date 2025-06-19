"use client";
import React, { useEffect, useState } from "react";
import TodoDataCard from "./TodoDataCard";
import { useTodos } from "@/contexts/todoProvider";
import Calendar from "./Calender";
import AddNewTodo from "./AddNewTodo";
import { PlusIcon } from "lucide-react";

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
        <button
          onClick={handleAddnew}
          className="  w-[120px] h-[120px] flex items-center justify-center "
        >
          <div className="cursor-pointer w-[80px] h-[80px] rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-gradient-to-r from-purple-600  to-blue-500 text-white">
            <span className="text-2xl text-white font-extrabold ">
              <PlusIcon />
            </span>
          </div>
        </button>
      </div>

      {/* <Calendar /> */}
    </div>
  );
}

export default TodoDataGrid;
