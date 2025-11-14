"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import Toast from "@/provider/ToastProvider/internal/Toast";

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

// 전역 toast 함수를 위한 타입
type ToastFunction = (message: string) => void;

// 전역 toast 함수 저장소
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
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);

    // 3초 후 자동으로 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  // 전역 toast 함수 등록
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
        <div className="fixed bottom-0 left-0 right-0 w-full px-[16px] py-[16px] z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
