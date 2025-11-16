"use client";

import { Button } from "@/components";
import { CATEGORY_LIST } from "./_constant/CATEGORY_LIST";
import { useCategoryStore } from "@/stores";
import handleCategoryClick from "./_utils/handleCategoryClick/handleCategoryClick";
import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { CategoryId } from "./_constant/CATEGORY_LIST";

// 카테고리 선택 페이지
const CategorySelectPage = () => {
  // 임시 선택된 카테고리 스토어
  const {
    backupSelectedCategories,
    tempSelectedCategories,
    setTempSelectedCategories,
  } = useCategoryStore();

  // 임시 선택된 카테고리 백업
  useEffect(() => {
    backupSelectedCategories();
  }, []);

  // 임시 선택된 카테고리 클릭 핸들러
  const handleLocalCategoryClick = (categoryId: CategoryId) => {
    handleCategoryClick(
      categoryId,
      tempSelectedCategories,
      setTempSelectedCategories
    );
  };

  return (
    <main
      className={cn(
        "max-w-[1100px] mx-auto px-[16px] pb-[160px]",
        "md:px-[20px]"
      )}
    >
      <h1 className="sr-only">카테고리 선택 페이지</h1>
      <section className="pt-[40px] flex flex-col gap-2">
        <h2
          className={cn(
            "text-[22px] font-bold text-[#121212] leading-[130%] tracking-[-0.02em]",
            "md:text-[28px] md:leading-[38px] md:tracking-[-0.02.5em]"
          )}
        >
          어떤 카테고리의
          <br />
          콘텐츠를 만드시나요?
        </h2>
        <p
          className={cn(
            "text-[18px] text-[#767676] leading-[130%] tracking-[-0.02em]",
            "md:text-[20px] md:leading-[28px] md:tracking-[-0.025em]"
          )}
        >
          최대 2개까지 선택 가능합니다.
        </p>
      </section>
      <section className="grid grid-cols-2 gap-2 pt-[16px]">
        {CATEGORY_LIST.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            color={
              tempSelectedCategories.includes(category.id) ? "green" : "black"
            }
            className="font-semibold h-[47px] flex items-center justify-center"
            onClick={() => handleLocalCategoryClick(category.id)}
            ariaLabel={`${category.name} 카테고리 선택`}
          >
            {category.name}
          </Button>
        ))}
      </section>
    </main>
  );
};

export default CategorySelectPage;
