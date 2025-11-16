"use client";

import { Button, Modal } from "@/components";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useCategoryStore } from "@/stores";
import useCompletedAll from "./hooks/useCompletedAll/useCompletedAll";
import useModal from "./hooks/useModal/useModal";

// 다음으로 버튼
const NextButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  // 임시 선택된 카테고리 스토어
  const { tempSelectedCategories, applyTempSelectedCategories } =
    useCategoryStore();
  // 카테고리 선택 페이지 여부
  const isCategorySelectPage = pathname === "/category-select";
  // 모든 필드가 완료된 여부
  const isCompletedAll = useCompletedAll();
  // 모달 관련 상태 및 핸들러
  const {
    isModalOpen,
    isLoading,
    openModal,
    handleConfirm,
    handleComplete,
    handleClose,
  } = useModal();

  // 다음으로 버튼 클릭 시 처리
  const handleClick = () => {
    // 카테고리 선택 페이지인 경우 임시 선택된 카테고리 적용 및 페이지 이동
    if (isCategorySelectPage) {
      applyTempSelectedCategories();
      router.push("/");
      return;
    }

    // 모든 필드가 완료된 경우 모달 열기
    if (isCompletedAll) {
      openModal();
    }
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
        onComplete={handleComplete}
      />
    </>
  );
};

export default NextButton;
