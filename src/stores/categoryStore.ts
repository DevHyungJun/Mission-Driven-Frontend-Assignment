import { create } from "zustand";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";

interface CategoryStore {
  selectedCategories: CategoryId[];
  initialSelectedCategories: CategoryId[];
  tempSelectedCategories: CategoryId[];
  setSelectedCategories: (categories: CategoryId[]) => void;
  setTempSelectedCategories: (categories: CategoryId[]) => void;
  clearSelectedCategories: () => void;
  backupSelectedCategories: () => void;
  restoreSelectedCategories: () => void;
  applyTempSelectedCategories: () => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategories: [],
  initialSelectedCategories: [],
  tempSelectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  setTempSelectedCategories: (categories) =>
    set({ tempSelectedCategories: categories }),
  clearSelectedCategories: () => set({ selectedCategories: [] }),
  backupSelectedCategories: () =>
    set((state) => ({
      initialSelectedCategories: [...state.selectedCategories],
      tempSelectedCategories: [...state.selectedCategories],
    })),
  restoreSelectedCategories: () =>
    set((state) => ({
      selectedCategories: [...state.initialSelectedCategories],
      tempSelectedCategories: [],
    })),
  applyTempSelectedCategories: () =>
    set((state) => ({
      selectedCategories: [...state.tempSelectedCategories],
    })),
}));

export default useCategoryStore;
