"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface ImageContextType {
  mainImage: string | null;
  setMainImage: (image: string | null) => void;
  additionalImages: string[];
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

interface ImageProviderProps {
  children: ReactNode;
}

const ImageProvider = ({ children }: ImageProviderProps) => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (mainImage && mainImage.startsWith("blob:")) {
        URL.revokeObjectURL(mainImage);
      }
      additionalImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [mainImage, additionalImages]);

  return (
    <ImageContext.Provider
      value={{
        mainImage,
        setMainImage,
        additionalImages,
        setAdditionalImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
