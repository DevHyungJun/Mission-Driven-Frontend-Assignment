import { useEffect } from "react";

// 로딩 지속 시간
const LOADING_DURATION_MS = 2000;

// 모달 로딩 타이머 이벤트 처리
const useModalLoadingTimer = (
  isLoading: boolean,
  open: boolean,
  onComplete?: () => void,
  onClose?: () => void
) => {
  // 모달 로딩 타이머 이벤트 처리
  useEffect(() => {
    // 로딩 중이 아니거나 모달 닫힌 경우 반환
    if (!isLoading || !open) return;

    // 로딩 타이머 설정
    const timer = setTimeout(() => {
      onComplete?.();
      onClose?.();
    }, LOADING_DURATION_MS);

    // 모달 로딩 타이머 이벤트 제거
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, open, onComplete, onClose]);
};

export default useModalLoadingTimer;
