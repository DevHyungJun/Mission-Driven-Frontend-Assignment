"use client";

import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Link from "next/link";
import useCategoryContext from "@/provider/CategoryProvider/hooks/useCategoryContext";
import getCategoryDisplayText from "@/app/(route)/category-select/_utils/getCategoryDisplayText";

const CategorySelector = () => {
  const { selectedCategories } = useCategoryContext();
  const displayText = getCategoryDisplayText(selectedCategories);

  return (
    <SectionProvider title="카테고리" mode="simple">
      <Link
        href="/category-select"
        className="w-full flex justify-between items-center px-[16px] py-[12px] border border-[#E5E5E5] rounded-[8px] text-[#8F8F8F] cursor-pointer leading-[130%] tracking-[-0.02em]"
      >
        <span className="text-[#121212]">{displayText}</span>
        <Icon name="ChevronRight" />
      </Link>
    </SectionProvider>
  );
};

export default CategorySelector;
