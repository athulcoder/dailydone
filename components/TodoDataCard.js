import React from "react";

function TodoDataCard({ name, count }) {
  return (
    <div className="w-[120px] h-[120px] rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] border border-gray-100">
      <span className="text-xl font-extrabold text-indigo-600">{count}</span>
      <span className="text-sm text-gray-700 mt-2 text-center px-2">
        {name}
      </span>
    </div>
  );
}

export default TodoDataCard;
