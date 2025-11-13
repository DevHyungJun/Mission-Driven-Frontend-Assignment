import { Icon } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import { ChangeEvent, RefObject } from "react";

interface AdditonalImagesProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AdditonalImages = ({
  fileInputRef,
  handleImageUpload,
}: AdditonalImagesProps) => {
  return (
    <SectionProvider
      title="추가 이미지 (선택)"
      mode="with-description"
      description="최대 4장까지 등록할 수 있어요"
    >
      <label
        htmlFor="additional-image"
        className="w-[120px] h-[120px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#E5E5E5]"
        aria-label="추가 이미지 업로드"
      >
        <Icon name="Plus" size={32} aria-hidden={true} />
        <input
          type="file"
          name="additional-image"
          id="additional-image"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          required
        />
      </label>
    </SectionProvider>
  );
};

export default AdditonalImages;
