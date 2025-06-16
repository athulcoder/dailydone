import React from "react";

function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>
  );
}

export default LoadingAnimation;
