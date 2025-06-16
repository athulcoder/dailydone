import React from "react";

function TodoDataCard({ name, count }) {
  return (
    <div className="w-[130px] h-[120px] bg-[#e5e5e5] rounded-2xl flex flex-col items-center justify-center shadow-lg  transition-shadow duration-300">
      <span className="text-gray-900 text-lg font-semibold">{count}</span>
      <span className="text-gray-600 text-sm text-center">{name}</span>
    </div>
  );
}

export default TodoDataCard;
