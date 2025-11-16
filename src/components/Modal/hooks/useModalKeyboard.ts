import { useEffect } from "react";

// 모달 키보드 이벤트 처리
const useModalKeyboard = (
  open: boolean,
  isLoading: boolean,
  onClose: () => void
) => {
  // 모달 오픈 상태 변경 시 이벤트 처리
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    // 이스케이프 키 이벤트 처리
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // 모달 닫힌 경우 이벤트 제거
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, isLoading, onClose]);
};

export default useModalKeyboard;
