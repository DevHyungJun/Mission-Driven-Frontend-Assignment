"use client";

import { Button } from "@/components";
import { CATEGORY_LIST } from "./_constant/CATEGORY_LIST";
import useCategoryContext from "@/provider/CategoryProvider/hooks/useCategoryContext";
import handleCategoryClick from "./_utils/handleCategoryClick";

const CategorySelectPage = () => {
  const { selectedCategories, setSelectedCategories } = useCategoryContext();

  return (
    <main className="px-[16px] pb-[160px]">
      <section className="pt-[40px] flex flex-col gap-2">
        <h2 className="text-[22px] font-bold text-[#121212] leading-[130%] tracking-[-0.02em]">
          어떤 카테고리의
          <br />
          콘텐츠를 만드시나요?
        </h2>
        <p className="text-[18px] text-[#767676] leading-[130%] tracking-[-0.02em]">
          최대 2개까지 선택 가능합니다.
        </p>
      </section>
      <section className="grid grid-cols-2 gap-2 pt-[16px]">
        {CATEGORY_LIST.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            color={selectedCategories.includes(category.id) ? "green" : "black"}
            className="font-semibold h-[47px] flex items-center justify-center"
            onClick={() =>
              handleCategoryClick(
                category.id,
                selectedCategories,
                setSelectedCategories
              )
            }
          >
            {category.name}
          </Button>
        ))}
      </section>
    </main>
  );
};

export default CategorySelectPage;
