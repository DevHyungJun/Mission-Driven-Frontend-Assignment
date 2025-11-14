import { cn } from "@/app/_utils/cn";
import { NextButton } from "@/app/_components";

const Header = () => {
  return (
    <div className="w-full border-b border-[#E5E5E5] sticky top-0 bg-white z-10">
      <header
        className={cn(
          "w-full h-[48px] flex items-center justify-center text-[#121212] font-bold text-[18px]",
          "md:h-[64px] md:text-[24px] md:max-w-[1100px] md:mx-auto md:justify-between"
        )}
      >
        <div className="hidden md:block flex-1" />
        <h1>과제</h1>
        <NextButton />
      </header>
    </div>
  );
};

export default Header;
