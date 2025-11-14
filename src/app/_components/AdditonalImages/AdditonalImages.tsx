import { cn } from "@/app/_utils/cn";
import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import Image from "next/image";
import { ChangeEvent, RefObject } from "react";

interface AdditonalImagesProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  additionalImages: string[];
}

const AdditonalImages = ({
  fileInputRef,
  handleImageUpload,
  additionalImages,
}: AdditonalImagesProps) => {
  return (
    <SectionProvider
      title="추가 이미지 (선택)"
      mode="with-description"
      description="최대 4장까지 등록할 수 있어요"
    >
      <div className="flex gap-2 overflow-x-scroll hide-scrollbar -mx-[16px] md:mr-0 px-[16px] md:px-0">
        {additionalImages.length < 4 && (
          <label
            htmlFor="additional-image"
            className={cn(
              "w-[120px] h-[120px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#E5E5E5]",
              "md:w-[251px] md:h-[251px]"
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
              onChange={handleImageUpload}
              ref={fileInputRef}
              required
            />
          </label>
        )}
        {additionalImages.map((image) => (
          <Image
            src={image}
            alt="추가 이미지"
            width={120}
            height={120}
            className="object-cover rounded-[8px] aspect-square w-[120px] h-[120px]"
          />
        ))}
      </div>
    </SectionProvider>
  );
};

export default AdditonalImages;
