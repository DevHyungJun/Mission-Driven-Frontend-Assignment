import { useState } from "react";
import { toast } from "@/provider/ToastProvider/ToastProvider";

// 모달 관련 상태 및 핸들러
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 확인 핸들러
  const handleConfirm = () => {
    setIsLoading(true);
  };

  // 모달 완료 핸들러
  const handleComplete = () => {
    setIsLoading(false);
    toast.show("등록이 완료되었습니다");
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    isLoading,
    openModal,
    handleConfirm,
    handleComplete,
    handleClose,
  };
};

export default useModal;
