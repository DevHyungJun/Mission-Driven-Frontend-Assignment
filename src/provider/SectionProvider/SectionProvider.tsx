import { ReactNode } from "react";

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
          <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
            {title}
          </h2>
          {description && (
            <p className="text-[#767676] text-[18px] leading-[130%] tracking-[-0.02em]">
              {description}
            </p>
          )}
        </div>
      ) : (
        <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default SectionProvider;
