"use client";

import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Link from "next/link";
import { useCategoryStore } from "@/stores";
import getCategoryDisplayText from "@/app/(route)/category-select/_utils/getCategoryDisplayText/getCategoryDisplayText";

const CategorySelector = () => {
  const { selectedCategories } = useCategoryStore();
  // 카테고리 표시 텍스트 가져오기
  const displayText = getCategoryDisplayText(selectedCategories);

  return (
    <SectionProvider title="카테고리" mode="simple">
      <Link
        href="/category-select"
        className="w-full flex justify-between items-center px-[16px] py-[12px] border border-[#E5E5E5] rounded-[8px] text-[#8F8F8F] cursor-pointer leading-[130%] tracking-[-0.02em]"
      >
        <span className="text-[#121212]">{displayText}</span>
        <Icon name="ChevronRight" ariaLabel="카테고리 선택 페이지 이동" />
      </Link>
    </SectionProvider>
  );
};

export default CategorySelector;
