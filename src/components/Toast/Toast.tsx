"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/_utils/cn";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
        "bg-[#323232] text-white px-6 py-3 rounded-lg shadow-lg",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;

