import { cn } from "@/utils/cn";
// 모달 내부 로딩 스피너
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div
        className={cn(
          "w-12 h-12 border-4 border-[#E5E5E5] border-t-[#4CAF50] rounded-full animate-spin",
          "md:w-16 md:h-16"
        )}
        aria-label="로딩 중"
      />
    </div>
  );
};

export default LoadingSpinner;
