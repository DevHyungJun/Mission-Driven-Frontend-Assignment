import { Button } from "@/components";
import { cn } from "@/app/_utils/cn";

const NextButton = () => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 w-full px-[16px] py-[16px] bg-white",
        "md:relative md:bottom-auto md:left-auto md:right-auto md:w-auto md:p-0 md:bg-transparent",
        "md:flex md:flex-1 md:justify-end md:mr-[40px]"
      )}
    >
      <Button
        variant="default"
        color="light-green"
        className={cn(
          "w-full h-[48px] flex items-center justify-center",
          "md:w-[120px] md:h-[38px]"
        )}
        disabled
        size="small"
        ariaLabel="다음으로 버튼"
      >
        다음으로
      </Button>
    </div>
  );
};

export default NextButton;
