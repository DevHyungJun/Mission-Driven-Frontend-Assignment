import { CategoryId, CategoryName, getCategoryById } from "../_constant/CATEGORY_LIST";

const getCategoryDisplayText = (
  selectedCategories: CategoryId[],
  defaultText: string = "주제를 선택하세요"
): string => {
  const selectedCategoryNames = selectedCategories
    .map((id) => getCategoryById(id)?.name)
    .filter((name): name is CategoryName => name !== undefined);

  return selectedCategoryNames.length > 0
    ? selectedCategoryNames.join(", ")
    : defaultText;
};

export default getCategoryDisplayText;

