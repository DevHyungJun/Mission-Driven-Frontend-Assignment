import { useEffect } from "react";

const LOADING_DURATION_MS = 2000;

const useModalLoadingTimer = (
  isLoading: boolean,
  open: boolean,
  onComplete?: () => void,
  onClose?: () => void
) => {
  useEffect(() => {
    if (!isLoading || !open) return;

    const timer = setTimeout(() => {
      onComplete?.();
      onClose?.();
    }, LOADING_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, open, onComplete, onClose]);
};

export default useModalLoadingTimer;

