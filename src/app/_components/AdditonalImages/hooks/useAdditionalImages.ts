import { useState } from "react";

const useAdditionalImages = () => {
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  return { additionalImages, setAdditionalImages };
};

export default useAdditionalImages;
