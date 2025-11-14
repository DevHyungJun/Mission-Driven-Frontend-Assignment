"use client";

import { cn } from "@/app/_utils/cn";
import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Image from "next/image";
import { useRef } from "react";
import useAdditionalImages from "./hooks/useAdditionalImages";
import handleMultiImageUpload from "./utils/handleMultiImageUpload";

const AdditonalImages = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { additionalImages, setAdditionalImages } = useAdditionalImages();

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
              aria-hidden={true}
              className="md:size-[60px]"
            />
            <input
              type="file"
              name="additional-image"
              id="additional-image"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => handleMultiImageUpload(e, setAdditionalImages)}
              ref={fileInputRef}
              required
            />
          </label>
        )}
        {additionalImages.map((image) => (
          <div
            key={image}
            className={cn(
              "aspect-square w-[120px] h-[120px] shrink-0 overflow-hidden rounded-[8px]",
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
          </div>
        ))}
      </div>
    </SectionProvider>
  );
};

export default AdditonalImages;
