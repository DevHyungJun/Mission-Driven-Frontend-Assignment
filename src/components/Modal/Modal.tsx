"use client";

import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  cancelText?: string;
  confirmText: string;
}

const Modal = ({
  open,
  onClose,
  onConfirm,
  title,
  subtitle,
  cancelText = "취소",
  confirmText,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[430px] rounded-2xl bg-white"
      >
        <div className="h-[56px] flex justify-end items-center pr-[16px]">
          <button
            aria-label="닫기"
            onClick={onClose}
            className="cursor-pointer"
          >
            <Icon name="X" size={32} />
          </button>
        </div>
        <div className="flex flex-col items-center px-[24px] pb-[24px] gap-8">
          <div className="space-y-2">
            <h2 className="text-center text-[24px] font-bold text-[#121212] leading-[130%] tracking-[-0.02em]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[18px] leading-[130%] tracking-[-0.02em] text-[#565656]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="w-full flex gap-2">
            <Button
              variant="outline"
              color="black"
              onClick={onClose}
              className="w-full"
            >
              {cancelText}
            </Button>
            <Button
              variant="default"
              color="dark-gray"
              onClick={onConfirm}
              className="w-full"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
