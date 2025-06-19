import { useTodos } from "@/contexts/todoProvider";
import React from "react";
import TodoDataCardSkeleton from "./TodoDataCardSkeleton";

function TodoDataCard({ name, count }) {
  const { loading } = useTodos();
  if (loading) return <TodoDataCardSkeleton />;
  return (
    <div className="w-[120px] h-[120px] rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-data-card border-border-primary">
      <span className="text-xl font-extrabold text-text-primary">{count}</span>
      <span className="text-sm text-text-secondary mt-2 text-center px-2">
        {name}
      </span>
    </div>
  );
}

export default TodoDataCard;
