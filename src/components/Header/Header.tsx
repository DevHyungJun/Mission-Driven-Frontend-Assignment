"use client";

import { cn } from "@/utils/cn";
import { NextButton } from "@/app/_components";
import { usePathname } from "next/navigation";
import { Icon, Button } from "@/components";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/stores";

/**
 * 헤더 컴포넌트
 * @param children - 내용(필수)
 * @param variant - 스타일 타입(필수)
 * @param color - 색상(필수)
 * @param size - 크기(선택)
 * @param ariaLabel - 접근성 라벨(선택)
 * @param className - 추가 스타일 클래스(선택)
 *
 * @example
 * <Header />
 *
 * @description
 * - 카테고리 선택 페이지인 경우, 왼쪽으로 이동하는 버튼이 표시됩니다.
 * - 카테고리 선택 페이지가 아닌 경우, 중앙에 표시됩니다.
 * - 나가기 버튼을 클릭하면 카테고리 선택 페이지로 이동합니다.
 */

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { restoreSelectedCategories } = useCategoryStore();
  const isCategorySelectPage = pathname === "/category-select";

  const handleOut = () => {
    // 카테고리 선택 상태 복원
    restoreSelectedCategories();
    router.back();
  };

  return (
    <header className="w-full border-b border-[#E5E5E5] sticky top-0 bg-white z-10">
      <div
        className={cn(
          "w-full h-[48px] flex items-center text-[#121212] font-bold text-[18px] relative",
          "md:h-[64px] md:text-[24px] md:max-w-[1100px] md:mx-auto md:justify-between md:px-0",
          isCategorySelectPage ? "justify-start px-[16px]" : "justify-center"
        )}
      >
        {isCategorySelectPage && (
          <>
            <button
              onClick={handleOut}
              className="cursor:pointer md:hidden cursor-pointer hover:opacity-80 active:opacity-60"
              aria-label="닫기 버튼"
            >
              <Icon name="X" size={28} ariaLabel="닫기 버튼" />
            </button>
            <Button
              variant="outline"
              color="black"
              className="w-[120px] h-[38px] ml-[40px] md:flex items-center justify-center cursor-pointer hover:opacity-80 active:opacity-60 hidden"
              size="small"
              ariaLabel="나가기 버튼"
              onClick={handleOut}
            >
              나가기
            </Button>
          </>
        )}
        <div className="hidden md:block flex-1" />
        <h2
          className={cn(
            isCategorySelectPage && "absolute left-1/2 -translate-x-1/2",
            !isCategorySelectPage && "md:static md:transform-none"
          )}
        >
          과제
        </h2>
        <NextButton />
      </div>
    </header>
  );
};

export default Header;
