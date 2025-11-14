"use client";

import { Button } from "@/components";
import { useRef } from "react";
import {
  MainImageUpload,
  AdditonalImages,
  ActivityTypeSelector,
  DetailInfo,
  CategorySelector,
  ContentTitle,
} from "./_components";
import { cn } from "./_utils/cn";
import handleImageUpload from "./_components/MainImageUpload/utils/handleImageUpload";
import useMainImage from "./_components/MainImageUpload/hooks/useMainImage";
import useAdditionalImages from "./_components/AdditonalImages/hooks/useAdditionalImages";
import handleMultiImageUpload from "./_components/AdditonalImages/utils/handleMultiImageUpload";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mainImage, setMainImage } = useMainImage();
  const { additionalImages, setAdditionalImages } = useAdditionalImages();

  return (
    <main
      className={cn(
        "px-[16px] pb-[160px]",
        "md:max-w-[1100px] md:flex md:gap-[40px] md:mx-auto"
      )}
    >
      <div className="md:w-1/2">
        <MainImageUpload
          fileInputRef={fileInputRef}
          handleImageUpload={(e) => handleImageUpload(e, setMainImage)}
          mainImage={mainImage}
        />
        <AdditonalImages
          fileInputRef={fileInputRef}
          handleImageUpload={(e) =>
            handleMultiImageUpload(e, setAdditionalImages)
          }
          additionalImages={additionalImages}
        />
      </div>
      <div className="md:w-1/2 md:flex md:flex-col md:gap-[24px]">
        <CategorySelector />
        <ContentTitle />
        <ActivityTypeSelector />
        <DetailInfo />
        <Button
          variant="default"
          color="dark-gray"
          className={cn(
            "w-full mt-[24px] h-[48px] flex items-center justify-center",
            "md:h-[58px] md:mt-0"
          )}
          ariaLabel="회차 추가하기 버튼"
        >
          회차 추가하기
        </Button>
      </div>
    </main>
  );
}
