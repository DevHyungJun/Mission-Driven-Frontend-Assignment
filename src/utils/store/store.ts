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

interface ContentTitleStore {
  contentTitle: string;
  setContentTitle: (contentTitle: string) => void;
}

export const useContentTitleStore = create<ContentTitleStore>((set) => ({
  contentTitle: "",
  setContentTitle: (contentTitle) => set({ contentTitle }),
}));
