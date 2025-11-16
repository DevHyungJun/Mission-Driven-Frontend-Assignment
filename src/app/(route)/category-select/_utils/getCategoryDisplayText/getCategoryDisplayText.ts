import {
  CategoryId,
  CategoryName,
  getCategoryById,
} from "../../_constant/CATEGORY_LIST";

// 선택된 카테고리 표시 텍스트 가져오기
const getCategoryDisplayText = (
  selectedCategories: CategoryId[],
  defaultText: string = "주제를 선택하세요"
): string => {
  // 선택된 카테고리 이름 가져오기
  const selectedCategoryNames = selectedCategories
    .map((id) => getCategoryById(id)?.name)
    .filter((name): name is CategoryName => name !== undefined);

  // 선택된 카테고리 이름이 있는 경우 콤마로 구분하여 반환
  // 선택된 카테고리 이름이 없는 경우 기본 텍스트 반환
  return selectedCategoryNames.length > 0
    ? selectedCategoryNames.join(", ")
    : defaultText;
};

export default getCategoryDisplayText;
