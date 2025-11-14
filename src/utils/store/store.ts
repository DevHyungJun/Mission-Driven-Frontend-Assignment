import { create } from "zustand";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";
import { ActivityType } from "@/app/_components/ActivityTypeSelector/constant/ACTIVITY_TYPE_SELECTOR_OPTIONS";

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

interface ActivityTypeStore {
  activityType: ActivityType | null;
  setActivityType: (activityType: ActivityType) => void;
}

export const useActivityTypeStore = create<ActivityTypeStore>((set) => ({
  activityType: null,
  setActivityType: (activityType) => set({ activityType }),
}));
