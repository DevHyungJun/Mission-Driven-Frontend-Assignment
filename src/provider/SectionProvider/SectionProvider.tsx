import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProviderProps {
  children: ReactNode;
  title: string;
  mode?: "simple" | "with-description";
  description?: string;
}

const SectionProvider = ({
  children,
  title,
  mode = "simple",
  description,
}: SectionProviderProps) => {
  return (
    <section className="pt-[40px] space-y-[12px]">
      {mode === "with-description" ? (
        <div className="flex flex-col gap-2">
          <h2
            className={cn(
              "text-[22px] leading-[130%] font-bold text-[#121212]",
              "md:text-[28px]"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-[#767676] text-[18px] leading-[130%] tracking-[-0.02em]",
                "md:text-[20px]"
              )}
            >
              {description}
            </p>
          )}
        </div>
      ) : (
        <h2
          className={cn(
            "text-[22px] leading-[130%] font-bold text-[#121212]",
            "md:text-[28px]"
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default SectionProvider;
