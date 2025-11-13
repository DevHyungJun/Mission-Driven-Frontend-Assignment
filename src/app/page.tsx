"use client";

import { Button, Header, Textarea } from "@/components";
import { useRef } from "react";
import {
  MainImageUpload,
  AdditonalImages,
  ActivityTypeSelector,
  DetailInfo,
} from "./_components";
import CategorySelector from "./_components/CategorySelector/CategorySelector";
import ContentTitle from "./_components/ContentTitle/ContentTitle";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <>
      <Header />
      <main className="px-[16px] pb-[84px]">
        <MainImageUpload
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />
        <AdditonalImages
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />
        <CategorySelector />
        <ContentTitle />
        <ActivityTypeSelector />
        <DetailInfo />

        {/* AddSessionButton */}
        <Button
          variant="default"
          color="dark-gray"
          className="w-full mt-[24px]"
          ariaLabel="회차 추가하기 버튼"
        >
          회차 추가하기
        </Button>

        {/* NextButton */}
        <div className="fixed bottom-0 left-0 right-0 w-full px-[16px] py-[16px] bg-white">
          <Button
            variant="default"
            color="light-green"
            className="w-full"
            disabled
            ariaLabel="다음으로 버튼"
          >
            다음으로
          </Button>
        </div>
      </main>
    </>
  );
}
