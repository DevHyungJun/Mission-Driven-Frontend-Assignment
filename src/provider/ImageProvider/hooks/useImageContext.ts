import { useContext } from "react";
import { ImageContext } from "../ImageProvider";

const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within ImageProvider");
  }
  return context;
};

export default useImageContext;

