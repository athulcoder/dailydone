import React from "react";

function TodoDataCardSkeleton() {
  return (
    <div className="w-[120px] h-[120px] rounded-2xl flex flex-col items-center justify-center shadow-md bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] border border-gray-100 animate-pulse">
      {/* Number placeholder */}
      <div className="h-6 w-12 bg-gray-300 rounded-md mb-2" />

      {/* Label placeholder */}
      <div className="h-3 w-20 bg-gray-200 rounded-md mt-2" />
    </div>
  );
}

export default TodoDataCardSkeleton;
