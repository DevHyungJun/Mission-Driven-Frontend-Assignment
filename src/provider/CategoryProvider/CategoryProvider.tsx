"use client";

import { createContext, useState, ReactNode } from "react";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";

interface CategoryContextType {
  selectedCategories: CategoryId[];
  setSelectedCategories: (categories: CategoryId[]) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

