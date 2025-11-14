import { useContext } from "react";
import { ImageContext } from "../ImageProvider";

const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error(
      "useImageContext는 ImageProvider 내에서 사용되어야 합니다."
    );
  }
  return context;
};

export default useImageContext;
