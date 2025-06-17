export default function TodoSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-3 animate-pulse">
      {/* Title and Checkbox */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>

      {/* Description */}
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>

      {/* Time & Status */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* Edit/Delete buttons */}
      <div className="flex gap-4 pt-2">
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
