"use client";

import { Button, Modal } from "@/components";
import { cn } from "@/app/_utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useCategoryStore } from "@/stores";
import useCompletedAll from "./hooks/useCompletedAll/useCompletedAll";
import { useState } from "react";
import { toast } from "@/provider/ToastProvider/ToastProvider";

const NextButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { tempSelectedCategories, applyTempSelectedCategories } =
    useCategoryStore();
  const isCategorySelectPage = pathname === "/category-select";
  const isCompletedAll = useCompletedAll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isCategorySelectPage) {
      applyTempSelectedCategories();
      router.push("/");
      return;
    }

    if (isCompletedAll) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      toast.show("등록이 완료되었습니다");
    }, 2000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isDisabled = isCategorySelectPage
    ? tempSelectedCategories.length === 0
    : !isCompletedAll;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 w-full px-[16px] py-[16px] bg-white",
          "md:relative md:bottom-auto md:left-auto md:right-auto md:w-auto md:p-0 md:bg-transparent md:flex md:flex-1 md:justify-end md:mr-[40px]"
        )}
      >
        <Button
          variant="default"
          color="light-green"
          className={cn(
            "w-full h-[48px] flex items-center justify-center",
            "md:w-[120px] md:h-[38px]"
          )}
          disabled={isDisabled}
          size="small"
          ariaLabel="다음으로 버튼"
          onClick={handleClick}
        >
          다음으로
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="등록하시겠습니까?"
        confirmText="등록"
        cancelText="취소"
        isLoading={isLoading}
      />
    </>
  );
};

export default NextButton;
