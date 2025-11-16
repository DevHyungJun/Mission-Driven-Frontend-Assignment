"use client";

import { cn } from "@/utils/cn";
import { Icon, ImageDeleteButton } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Image from "next/image";
import { useRef } from "react";
import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import handleMultiImageUpload from "./utils/handleMultiImageUpload/handleMultiImageUpload";
import { revokeBlobURL } from "@/utils/revokeBlobURL";

const AdditionalImages = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { additionalImages, setAdditionalImages } = useImageContext();

  // 이미지 삭제 핸들러
  const handleDeleteImage = (imageToDelete: string) => {
    // 이미지 URL 제거
    revokeBlobURL(imageToDelete);
    // 이미지 배열에서 삭제
    setAdditionalImages((prev) => prev.filter((img) => img !== imageToDelete));
    // 파일 입력 필드 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SectionProvider
      title="추가 이미지 (선택)"
      mode="with-description"
      description="최대 4장까지 등록할 수 있어요"
    >
      <div
        className={cn(
          "flex gap-2 overflow-x-scroll hide-scrollbar -mx-[16px] px-[16px]",
          "md:grid md:grid-cols-2 md:gap-2 md:mx-0 md:px-0"
        )}
      >
        {additionalImages.length < 4 && (
          <label
            htmlFor="additional-image"
            className={cn(
              "w-[120px] h-[120px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#E5E5E5] shrink-0 aspect-square",
              "md:w-full md:h-auto md:aspect-square"
            )}
            aria-label="추가 이미지 업로드"
          >
            <Icon
              name="Plus"
              size={32}
              ariaLabel="추가 이미지 업로드"
              className="md:size-[60px]"
            />
            <input
              type="file"
              name="additional-image"
              id="additional-image"
              className="hidden"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              onChange={(e) =>
                handleMultiImageUpload(e, setAdditionalImages, 4)
              }
              ref={fileInputRef}
              required
            />
          </label>
        )}
        {additionalImages.map((image) => (
          <div
            key={image}
            className={cn(
              "relative aspect-square w-[120px] h-[120px] shrink-0 overflow-hidden rounded-[8px]",
              "md:w-full md:h-auto md:aspect-square"
            )}
          >
            <Image
              src={image}
              alt="추가 이미지"
              width={251}
              height={251}
              className="object-cover w-full h-full"
            />
            <ImageDeleteButton
              onDelete={() => handleDeleteImage(image)}
              ariaLabel="추가 이미지 삭제"
              iconSize={16}
            />
          </div>
        ))}
      </div>
    </SectionProvider>
  );
};

export default AdditionalImages;
