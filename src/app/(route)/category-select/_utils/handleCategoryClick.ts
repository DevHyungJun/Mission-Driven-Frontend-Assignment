import { CategoryId } from "../_constant/CATEGORY_LIST";

const handleCategoryClick = (
  categoryId: CategoryId,
  selectedCategories: CategoryId[],
  setSelectedCategories: (categories: CategoryId[]) => void
) => {
  if (selectedCategories.includes(categoryId)) {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    return;
  }

  if (selectedCategories.length >= 2) return;

  setSelectedCategories([...selectedCategories, categoryId]);
};

export default handleCategoryClick;
