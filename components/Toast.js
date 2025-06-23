// components/Toast.jsx
"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";
import clsx from "clsx";

const icons = {
  success: <CheckCircle className="text-green-500 w-5 h-5" />,
  error: <XCircle className="text-red-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md">
      <div
        className={clsx(
          "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white",
          {
            "bg-green-600": type === "success",
            "bg-red-600": type === "error",
            "bg-blue-600": type === "info",
          }
        )}
      >
        {icons[type]}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
