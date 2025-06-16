import { useTodos } from "@/contexts/todoProvider";
import React from "react";

function TableItemRow({ no, title, desc, time, isDone }) {
  const { todos, deleteTodo } = useTodos();

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <tr
      className={` bg-[#e192d476] h-15 text-left cursor-pointer hover:bg-[#d68ac9b8] `}
    >
      <td className=" text-center">{no}</td>
      <td className="px-2">{title}</td>
      <td className=" px-2">{desc}</td>
      <td className="text-center"> {time}</td>
      <td className="text-center"> {isDone ? "Completed" : "pending.."}</td>
      <td className="text-center">
        {" "}
        <button className="text-blue-800 cursor-pointer ">Edit</button> /{" "}
        <button
          onClick={() => handleDelete(no)}
          className="text-red-800 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TableItemRow;
