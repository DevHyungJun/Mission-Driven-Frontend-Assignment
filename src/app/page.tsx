import { Button } from "@/components";
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
  return (
    <main
      className={cn(
        "px-[16px] pb-[160px]",
        "md:max-w-[1100px] md:flex md:gap-[40px] md:mx-auto"
      )}
    >
      <div className="md:w-1/2">
        <MainImageUpload />
        <AdditonalImages />
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
