"use client";

import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Link from "next/link";
import useCategoryContext from "@/provider/CategoryProvider/hooks/useCategoryContext";
import { CATEGORY_LIST, getCategoryById } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";

const CategorySelector = () => {
  const { selectedCategories } = useCategoryContext();
  const selectedCategoryNames = selectedCategories
    .map((id) => getCategoryById(id)?.name)
    .filter((name): name is string => name !== undefined);

  const displayText =
    selectedCategoryNames.length > 0
      ? selectedCategoryNames.join(", ")
      : "주제를 선택하세요";

  return (
    <SectionProvider title="카테고리" mode="simple">
      <Link
        href="/category-select"
        className="w-full flex justify-between items-center px-[16px] py-[12px] border border-[#E5E5E5] rounded-[8px] text-[#8F8F8F] cursor-pointer leading-[130%] tracking-[-0.02em]"
      >
        <span className={selectedCategoryNames.length > 0 ? "text-[#121212]" : ""}>
          {displayText}
        </span>
        <Icon name="ChevronRight" />
      </Link>
    </SectionProvider>
  );
};

export default CategorySelector;
