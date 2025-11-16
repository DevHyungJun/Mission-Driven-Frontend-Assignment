"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import Toast from "@/provider/ToastProvider/internal/Toast";
import { cn } from "@/utils/cn";

export interface ToastItem {
  id: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

type ToastFunction = (message: string) => void;

let globalToastFunction: ToastFunction | null = null;

export const setGlobalToast = (fn: ToastFunction) => {
  globalToastFunction = fn;
};

export const toast = {
  show: (message: string) => {
    if (globalToastFunction) {
      globalToastFunction(message);
    } else {
      console.warn(
        "Toast is not initialized. Make sure ToastProvider is mounted."
      );
    }
  },
};

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string) => {
    setToasts((prev) => {
      if (prev.length > 0) {
        return prev;
      }

      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, message };

      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3000);

      return [newToast];
    });
  }, []);

  useEffect(() => {
    setGlobalToast(showToast);
    return () => {
      setGlobalToast(() => {});
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div
          className={cn(
            "fixed bottom-[85px] left-0 right-0 w-full px-[16px] py-[16px] z-50",
            "md:bottom-[60px]"
          )}
        >
          <Toast message={toasts[0].message} />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
