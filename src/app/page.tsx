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
      </div>
    </main>
  );
}
