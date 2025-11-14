import { useContext } from "react";
import { CategoryContext } from "../CategoryProvider";

const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within CategoryProvider");
  }
  return context;
};

export default useCategoryContext;

