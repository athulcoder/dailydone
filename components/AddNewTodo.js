import { useTodos } from "@/contexts/todoProvider";
import { convertDateforUser } from "@/utils/formatDate";
import React, { useState } from "react";

export default function AddNewTodo({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [timeNeed, setTime] = useState("");

  const [dueDate, setDueDate] = useState(convertDateforUser(new Date()));
  const [error, setError] = useState("");

  const { addnewTodo } = useTodos();

  const handleAddnew = () => {
    if (!title || !description || !timeNeed || !dueDate) {
      setError("All fields are equired");
    } else {
      const newTodo = {
        title: title,
        description: description,
        timeNeed: Number.parseInt(timeNeed),
        dueDate: dueDate,
        isDone: false,
      };
      addnewTodo(newTodo);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50  text-text-primary">
      <div className="bg-bg p-6 rounded-2xl shadow-2xl border border-border-primary w-[90%] max-w-md space-y-5">
        <h2 className="text-xl font-semibold text-center text-text-primary">
          Add New Todo
        </h2>
        <span className="text-sm  text-center text-red-500 h-8">{error} </span>
        <div className="space-y-4">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
          <label>Dute Date</label>
          <input
            type="date"
            placeholder="Dute Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label>Time need (hours)</label>
          <input
            type="number"
            placeholder="Time Needed (in hours)"
            value={timeNeed}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="text-sm bg-border-primary text-text-third px-4 py-2 rounded-md hover:bg-border-primary cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddnew}
            className="text-sm bg-gradient-to-r from-purple-600 cursor-pointer to-blue-500 text-white px-4 py-2 rounded-md hover:brightness-110"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
