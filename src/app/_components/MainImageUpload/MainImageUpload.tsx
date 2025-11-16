"use client";

import { cn } from "@/app/_utils/cn";
import { Button, ImageDeleteButton, revokeBlobURL } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Image from "next/image";
import { useRef } from "react";
import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import handleImageUpload from "./utils/handleImageUpload/handleImageUpload";

const MainImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mainImage, setMainImage } = useImageContext();

  const handleDeleteImage = () => {
    revokeBlobURL(mainImage);
    setMainImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SectionProvider title="대표 이미지" mode="simple">
      <input
        type="file"
        id="main-image-upload"
        className="hidden"
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        onChange={(e) => handleImageUpload(e, setMainImage, mainImage)}
        ref={fileInputRef}
        aria-label="대표 이미지 업로드"
        required
      />
      {!mainImage ? (
        <div
          className={cn(
            "flex justify-center items-center w-full aspect-square bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px]",
            "md:max-w-[510px]"
          )}
        >
          <div className="flex flex-col items-center justify-center gap-[24px]">
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-2",
                "md:gap-4"
              )}
            >
              <p
                className={cn(
                  "text-[20px] font-bold text-[#121212] text-center leading-[130%]",
                  "md:text-[28px]"
                )}
              >
                콘텐츠 대표 이미지를
                <br />
                등록해 주세요
              </p>
              <p
                className={cn(
                  "text-[#8F8F8F] overflow-hidden text-nowrap",
                  "md:text-[22px]"
                )}
              >
                1:1 비율의 정사각형 이미지를 추천합니다
              </p>
            </div>
            <Button
              variant="default"
              color="dark-gray"
              ariaLabel="이미지 업로드 버튼"
              onClick={() => fileInputRef.current?.click()}
            >
              이미지 업로드
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full md:max-w-[510px]">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer hover:opacity-80 active:opacity-60"
          >
            <Image
              src={mainImage}
              alt="대표 이미지"
              width={510}
              height={510}
              className="object-cover rounded-[8px] aspect-square w-full h-full"
            />
          </div>
          <ImageDeleteButton
            onDelete={handleDeleteImage}
            ariaLabel="대표 이미지 삭제"
          />
        </div>
      )}
    </SectionProvider>
  );
};

export default MainImageUpload;
