"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import useModalKeyboard from "./hooks/useModalKeyboard";
import useModalLoadingTimer from "./hooks/useModalLoadingTimer";
import createModalHandlers from "./utils/createModalHandlers";
import LoadingSpinner from "./internal/LoadingSpinner";
import ModalHeader from "./internal/ModalHeader";
import ModalTitle from "./internal/ModalTitle";
import ModalButtons from "./internal/ModalButtons";

/**
 * 모달 컴포넌트(취소, 확인 버튼)
 * @param open - 모달 열기 여부(필수)
 * @param onClose - 모달 닫기 시 콜백(필수)
 * @param onConfirm - 모달 확인 시 콜백(필수)
 * @param title - 모달 제목(필수)
 * @param subtitle - 모달 서브타이틀(선택)
 * @param cancelText - 취소 버튼 텍스트(선택)
 * @param confirmText - 확인 버튼 텍스트(필수)
 * @param isLoading - 로딩 상태(선택)
 * @param onComplete - 로딩 완료 시 콜백(선택)
 *
 * @example
 * <Modal open={true} onClose={() => {}} onConfirm={() => {}} title="모달 제목" subtitle="모달 서브타이틀" cancelText="취소" confirmText="확인" isLoading={false} onComplete={() => {}} />
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
  isLoading?: boolean;
  onComplete?: () => void;
}

const Modal = ({
  open,
  onClose,
  onConfirm,
  title,
  subtitle,
  cancelText = "취소",
  confirmText,
  isLoading = false,
  onComplete,
}: ModalProps) => {
  // 모달 핸들러 생성
  const { handleClose, handleConfirm } = createModalHandlers(
    isLoading,
    onClose,
    onConfirm
  );

  // 모니터링 키보드 이벤트 처리
  useModalKeyboard(open, isLoading, onClose);
  // 모니터링 로딩 타이머 이벤트 처리
  useModalLoadingTimer(isLoading, open, onComplete, onClose);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-[328px] rounded-2xl bg-white",
          "md:w-[430px]",
          isLoading && "bg-transparent"
        )}
      >
        {!isLoading && <ModalHeader onClose={handleClose} />}
        <div
          className={cn(
            "flex flex-col items-center px-[20px] pb-[20px] gap-8",
            "md:px-[24px] md:pb-[24px]"
          )}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ModalTitle title={title} subtitle={subtitle} />
              <ModalButtons
                cancelText={cancelText}
                confirmText={confirmText}
                onClose={handleClose}
                onConfirm={handleConfirm}
              />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
