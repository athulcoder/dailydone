import { useTodos } from "@/contexts/todoProvider";
import React from "react";

function MobileTodoCard({ todo }) {
  const { id, title, desc, time, isDone } = todo;
  const { todos, deleteTodo } = useTodos();

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-2 ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => console.log("")}
          className="w-5 h-5 accent-green-600"
        />
      </div>

      <p className="text-sm text-gray-600">{desc}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>⏰ {time}</span>
        <span className={isDone ? "text-green-600" : "text-orange-500"}>
          {isDone ? "✅ Done" : "⌛ Pending"}
        </span>
      </div>

      <div className="flex gap-4 text-sm pt-2">
        <button onClick={() => console.log("edited")} className="text-blue-600">
          ✏️ Edit
        </button>
        <button onClick={() => deleteTodo(id)} className="text-red-600">
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default MobileTodoCard;
