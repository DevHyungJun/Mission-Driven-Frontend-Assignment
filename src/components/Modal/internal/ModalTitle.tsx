import { ReactNode } from "react";
import { cn } from "@/app/_utils/cn";

interface ModalTitleProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

// 모달 타이틀 컴포넌트
const ModalTitle = ({ title, subtitle }: ModalTitleProps) => {
  return (
    <div className="space-y-2">
      <h2
        className={cn(
          "text-center text-[20px] font-bold text-[#121212] leading-[130%] tracking-[-0.02em]",
          "md:text-[24px]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-center text-[16px] leading-[130%] tracking-[-0.02em] text-[#565656]",
            "md:text-[18px]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ModalTitle;
