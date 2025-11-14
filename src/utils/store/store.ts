import { create } from "zustand";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";

interface CategoryStore {
  selectedCategories: CategoryId[];
  setSelectedCategories: (categories: CategoryId[]) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
}));
