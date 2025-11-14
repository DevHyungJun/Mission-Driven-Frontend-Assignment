import { useEffect, useState } from "react";

const useMainImage = () => {
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (mainImage && mainImage.startsWith("blob:")) {
        URL.revokeObjectURL(mainImage);
      }
    };
  }, [mainImage]);

  return { mainImage, setMainImage };
};

export default useMainImage;
