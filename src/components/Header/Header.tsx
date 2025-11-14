"use client";

import { cn } from "@/app/_utils/cn";
import { NextButton } from "@/app/_components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const Header = () => {
  const pathname = usePathname();
  const isCategorySelectPage = pathname === "/category-select";

  return (
    <header className="w-full border-b border-[#E5E5E5] sticky top-0 bg-white z-10">
      <div
        className={cn(
          "w-full h-[48px] flex items-center text-[#121212] font-bold text-[18px] relative",
          "md:h-[64px] md:text-[24px] md:max-w-[1100px] md:mx-auto md:justify-between md:px-0",
          isCategorySelectPage ? "justify-start px-[16px]" : "justify-center"
        )}
      >
        {isCategorySelectPage && (
          <>
            <Link
              href="/"
              replace
              className="md:hidden cursor-pointer hover:opacity-80 active:opacity-60"
              aria-label="닫기 버튼"
            >
              <Icon name="X" size={28} aria-hidden={true} />
            </Link>
            <Link
              href="/"
              replace
              className="hidden md:flex items-center cursor-pointer hover:opacity-80 active:opacity-60"
              aria-label="나가기 버튼"
            >
              <Button
                variant="outline"
                color="black"
                className="w-[120px] h-[38px] ml-[40px] flex items-center justify-center"
                size="small"
              >
                나가기
              </Button>
            </Link>
          </>
        )}
        <div className="hidden md:block flex-1" />
        <h1
          className={cn(
            isCategorySelectPage && "absolute left-1/2 -translate-x-1/2",
            !isCategorySelectPage && "md:static md:transform-none"
          )}
        >
          과제
        </h1>
        <NextButton />
      </div>
    </header>
  );
};

export default Header;
