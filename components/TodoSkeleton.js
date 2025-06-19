export default function TodoSkeleton() {
  return (
    <div className="bg-loading-card-bg p-4 rounded-xl shadow border border-border-primary space-y-3 animate-pulse">
      {/* Title and Checkbox */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-loading-card-text rounded w-1/2"></div>
        <div className="h-5 w-5 bg-loading-card-text rounded"></div>
      </div>

      {/* Description */}
      <div className="h-3 bg-loading-card-text rounded w-full"></div>
      <div className="h-3 bg-loading-card-text rounded w-3/4"></div>

      {/* Time & Status */}
      <div className="flex justify-between items-center text-sm text-text-third">
        <div className="h-3 w-24  bg-loading-card-textrounded"></div>
        <div className="h-3 w-16  bg-loading-card-textrounded"></div>
      </div>

      {/* Edit/Delete buttons */}
      <div className="flex gap-4 pt-2">
        <div className="h-4 w-4 bg-loading-card-text rounded"></div>
        <div className="h-4 w-4 bg-loading-card-text rounded"></div>
      </div>
    </div>
  );
}
