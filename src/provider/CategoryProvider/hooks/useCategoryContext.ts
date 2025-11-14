import { useContext } from "react";
import { CategoryContext } from "../CategoryProvider";

const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext는 CategoryProvider 내에서 사용되어야 합니다."
    );
  }
  return context;
};

export default useCategoryContext;
