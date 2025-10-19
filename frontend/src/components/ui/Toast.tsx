"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

export default function Toast({ message, type = "info", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-600 border-green-400",
    error: "bg-red-600 border-red-400",
    info: "bg-blue-600 border-blue-400",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${colors[type]} border-2 rounded-lg p-4 shadow-2xl animate-slideIn max-w-md`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icons[type]}</span>
        <p className="font-bold text-white">{message}</p>
      </div>
    </div>
  );
}
