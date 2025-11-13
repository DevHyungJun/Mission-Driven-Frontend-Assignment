import { cn } from "@/app/_utils/cn";
import { Button } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";

interface MainImageUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainImageUpload = ({
  fileInputRef,
  handleImageUpload,
}: MainImageUploadProps) => {
  return (
    <SectionProvider title="대표 이미지" mode="simple">
      <div
        className={cn(
          "flex justify-center items-center h-[328px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px]",
          "md:h-[510px] md:max-w-[510px]"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="flex flex-col items-center justify-center gap-2 leading-[130%] tracking-[-0.02em]">
            <p className="text-[20px] font-bold text-[#121212]">
              콘텐츠 대표 이미지를 등록해주세요!
            </p>
            <p className="text-[#8F8F8F]">
              1:1 비율의 정사각형 이미지를 추천합니다
            </p>
          </div>
          <Button
            variant="default"
            color="dark-gray"
            ariaLabel="이미지 업로드 버튼"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              required
            />
            이미지 업로드
          </Button>
        </div>
      </div>
    </SectionProvider>
  );
};

export default MainImageUpload;
