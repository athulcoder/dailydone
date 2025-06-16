import React from "react";
import TableItemRow from "./TableItemRow";
import { useTodos } from "@/contexts/todoProvider";

function TodoTable() {
  const { todos, deleteTodo } = useTodos();

  return (
    <div className="hidden lg:block xl:block w-[99%] m-auto min-h-[300px] h-fit bg-[#fcfcfc] rounded-2xl shadow-lg  transition-shadow duration-300   hide-scrollbar overflow-scroll">
      <table className="overflow-scroll hide-scrollbar w-full">
        <thead>
          <tr className=" bg-[#c96ddb] rounded-t-md h-16 text-left">
            <th className="min-w-[50px] text-center">No</th>
            <th className="min-w-[200px] px-2">Todo</th>
            <th className="min-w-[250px] px-2">Description</th>
            <th className="min-w-[80px] text-center">Time Needed (Hours)</th>
            <th className="min-w-[150px] text-center">Status</th>
            <th className="min-w-[100px] text-center">Edit/Trash</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TableItemRow
              no={todo.id}
              title={todo.title}
              desc={todo.desc}
              time={todo.time}
              isDone={todo.isDone}
              key={todo.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;
