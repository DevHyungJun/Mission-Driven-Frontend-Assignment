"use client";

import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { cn } from "@/app/_utils/cn";
import { MODAL_BUTTON_CONFIG } from "./constants/MODAL_BUTTON_CONFIG";

/**
 * 모달 컴포넌트(취소, 확인 버튼)
 * @param open - 모달 열기 여부(필수)
 * @param onClose - 모달 닫기 시 콜백(필수)
 * @param onConfirm - 모달 확인 시 콜백(필수)
 * @param title - 모달 제목(필수)
 * @param subtitle - 모달 서브타이틀(선택)
 * @param cancelText - 취소 버튼 텍스트(선택)
 * @param confirmText - 확인 버튼 텍스트(필수)
 *
 * @example
 * <Modal open={true} onClose={() => {}} onConfirm={() => {}} title="모달 제목" subtitle="모달 서브타이틀" cancelText="취소" confirmText="확인" />
 *
 * @description
 * 모달이 열리고 ESC 키를 누르면 모달이 닫힙니다.
 */

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
        className={cn("w-[328px] rounded-2xl bg-white", "md:w-[430px]")}
      >
        <div className="h-[56px] flex justify-end items-center pr-[16px]">
          <button
            aria-label="닫기"
            onClick={onClose}
            className="cursor-pointer"
          >
            <Icon name="X" size={28} className="md:size-8" />
          </button>
        </div>
        <div
          className={cn(
            "flex flex-col items-center px-[20px] pb-[20px] gap-8",
            "md:px-[24px] md:pb-[24px]"
          )}
        >
          <div className="space-y-2">
            <h2
              className={cn(
                "text-center text-[20px] font-bold text-[#121212] leading-[130%] tracking-[-0.02em]",
                "md:text-[24px]"
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={cn(
                  "text-center text-[16px] leading-[130%] tracking-[-0.02em] text-[#565656]",
                  "md:text-[18px]"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="w-full flex gap-2">
            {MODAL_BUTTON_CONFIG.map((buttonConfig, index) => {
              const isCancel = buttonConfig.id === "cancel";
              return (
                <Button
                  key={index}
                  variant={buttonConfig.variant}
                  color={buttonConfig.color}
                  onClick={isCancel ? onClose : onConfirm}
                  className={cn(
                    "w-full h-[48px] flex justify-center items-center",
                    "md:h-[58px]"
                  )}
                  ariaLabel={isCancel ? cancelText : confirmText}
                >
                  {isCancel ? cancelText : confirmText}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
