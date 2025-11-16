import { useState } from "react";
import { toast } from "@/provider/ToastProvider/ToastProvider";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsLoading(true);
  };

  const handleComplete = () => {
    setIsLoading(false);
    toast.show("등록이 완료되었습니다");
  };

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

