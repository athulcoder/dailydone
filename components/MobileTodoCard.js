import { useTodos } from "@/contexts/todoProvider";
import React, { useState } from "react";
import EditBox from "./EditBox";
import {
  Clock7Icon,
  Edit,
  Edit2Icon,
  LucideAlarmClockCheck,
  Trash2,
} from "lucide-react";

function MobileTodoCard({ todo }) {
  const { _id, title, description, timeNeed, isDone } = todo;
  const { deleteTodo, toggleTodo } = useTodos();

  const [editBoxOpen, setEditBoxOpen] = useState(false);

  const handleEdit = () => {
    setEditBoxOpen(true);
  };

  if (editBoxOpen)
    return <EditBox onClose={() => setEditBoxOpen(false)} initialData={todo} />;
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleTodo(_id, isDone)}
          className="w-5 h-5 accent-green-600"
        />
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="flex gap-2 items-center">
          <LucideAlarmClockCheck className="text-green-700" /> {timeNeed}
          {timeNeed <= 1 ? " hour" : " hours"}{" "}
        </span>
        <span
          className={
            isDone ? "text-green-600" : "text-orange-500 cursor-pointer"
          }
        >
          {isDone ? "✅ Done" : "⌛ Pending"}
        </span>
      </div>

      <div className="flex gap-4 text-sm pt-2">
        <button
          onClick={() => handleEdit()}
          className="text-blue-600 cursor-pointer"
        >
          <Edit />
        </button>
        <button
          onClick={() => deleteTodo(_id)}
          className="text-red-600 cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

export default MobileTodoCard;
