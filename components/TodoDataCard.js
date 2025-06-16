import React from "react";

function TodoDataCard({ name, count }) {
  return (
    <div className="w-[100px] h-[90px] bg-[#f6fdfc] rounded-2xl flex flex-col items-center justify-center shadow-lg  transition-shadow duration-300">
      <span className="text-gray-900 text-lg font-semibold">{count}</span>
      <span className="text-gray-600 text-sm">{name}</span>
    </div>
  );
}

export default TodoDataCard;
