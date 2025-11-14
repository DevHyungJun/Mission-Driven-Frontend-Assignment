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

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <main
      className={cn(
        "px-[16px] pb-[160px]",
        "md:max-w-[1060px] md:flex md:gap-[40px] md:mx-auto"
      )}
    >
      <div className="md:w-1/2">
        <MainImageUpload
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />
        <AdditonalImages
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
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
