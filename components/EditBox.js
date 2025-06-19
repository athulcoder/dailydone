import { useTodos } from "@/contexts/todoProvider";
import { convertDateforUser } from "@/utils/formatDate";
import React, { useState } from "react";

export default function EditBox({ onClose, initialData }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDesc] = useState(initialData.description || "");
  const [timeNeed, setTime] = useState(initialData.timeNeed || "");
  const [error, setError] = useState();
  const [dueDate, setDueDate] = useState(
    convertDateforUser(initialData.dueDate)
  );
  const [isDone, setIsDone] = useState(initialData.isDone || false);

  const { editTodo } = useTodos();

  const handleSave = () => {
    if (!title || !description || !timeNeed || !dueDate) {
      setError("All fields are required ");
    }
    const updatedTodo = {
      _id: initialData._id,
      title,
      description,
      timeNeed: Number.parseInt(timeNeed),
      dueDate,
      isDone,
    };
    editTodo(updatedTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 text-text-primary">
      <div className="bg-bg p-6 rounded-2xl shadow-2xl border border-border-primary w-[90%] max-w-md space-y-5">
        <h2 className="text-xl font-semibold text-center text-text-primary">
          📝 Edit Todo
        </h2>
        <span className="text-sm  text-center text-red-500 h-4">{error}</span>
        <div className="space-y-4">
          <label>Title</label>
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label>Description</label>
          <textarea
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
          <label>Dute Date</label>
          <input
            required
            type="date"
            placeholder="Dute Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label>Time need Approx(hours)</label>
          <input
            type="number"
            required
            placeholder="Time Needed (in hours)"
            value={timeNeed}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-border-primary p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="flex items-center gap-3 text-sm font-medium ">
            <input
              type="checkbox"
              checked={isDone}
              onChange={(e) => setIsDone(e.target.checked)}
              className="w-5 h-5 accent-green-600"
            />
            Mark as done
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="text-sm bg-border-primary text-text-secondary px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-sm bg-gradient-to-r from-purple-600 cursor-pointer to-blue-500 text-white px-4 py-2 rounded-md hover:brightness-110"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
