import { useTodos } from "@/contexts/todoProvider";
import React, { useState } from "react";

export default function EditBox({ onClose, initialData = {}, onSave }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDesc] = useState(initialData.description || "");
  const [timeNeed, setTime] = useState(initialData.timeNeed || "");
  const [isDone, setIsDone] = useState(initialData.isDone || false);

  const { editTodo } = useTodos();

  const handleSave = () => {
    editTodo(initialData.id, title, description, timeNeed, isDone);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-md space-y-5">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          📝 Edit Todo
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />

          <input
            type="number"
            placeholder="Time Needed (in hours)"
            value={timeNeed}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
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
            className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
