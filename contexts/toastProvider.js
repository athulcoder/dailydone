// context/ToastContext.jsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    ({ message, type = "info", duration = 3000 }) => {
      setToast({ message, type, duration });
    },
    []
  );

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
