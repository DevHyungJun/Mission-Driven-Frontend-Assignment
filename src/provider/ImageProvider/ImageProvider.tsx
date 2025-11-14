"use client";

import { createContext, useState, useEffect, useRef, ReactNode } from "react";

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

  // ref로 이미지 최신 값 저장
  const mainImageRef = useRef(mainImage);
  const additionalImagesRef = useRef(additionalImages);

  useEffect(() => {
    mainImageRef.current = mainImage;
    additionalImagesRef.current = additionalImages;
  });

  // 컴포넌트 언마운트 시에만 Blob URL 정리
  useEffect(() => {
    return () => {
      if (mainImageRef.current && mainImageRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(mainImageRef.current);
      }
      additionalImagesRef.current.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

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
