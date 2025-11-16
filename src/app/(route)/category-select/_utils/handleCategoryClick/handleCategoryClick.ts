import { toast } from "@/provider/ToastProvider/ToastProvider";
import { CategoryId } from "../../_constant/CATEGORY_LIST";

// 카테고리 클릭 핸들러
const handleCategoryClick = (
  categoryId: CategoryId,
  selectedCategories: CategoryId[],
  setSelectedCategories: (categories: CategoryId[]) => void
) => {
  // 이미 선택된 카테고리인 경우 선택 해제
  if (selectedCategories.includes(categoryId)) {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    return;
  }

  // 최대 2개까지 선택 가능한 경우 토스트 메시지 표시
  if (selectedCategories.length >= 2) {
    toast.show("최대 2개까지 선택 가능합니다.");
    return;
  }

  // 카테고리 선택
  setSelectedCategories([...selectedCategories, categoryId]);
};

export default handleCategoryClick;
