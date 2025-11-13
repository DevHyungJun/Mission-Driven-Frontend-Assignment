import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";

const CategorySelector = () => {
  return (
    <SectionProvider title="카테고리" mode="simple">
      <button
        aria-label="카테고리 선택 버튼"
        className="w-full flex justify-between items-center px-[16px] py-[12px] border border-[#E5E5E5] rounded-[8px] text-[#8F8F8F] cursor-pointer leading-[130%] tracking-[-0.02em]"
      >
        주제를 선택하세요 <Icon name="ChevronRight" />
      </button>
    </SectionProvider>
  );
};

export default CategorySelector;
