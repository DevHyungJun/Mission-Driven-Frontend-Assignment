import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { SIZE_STYLES, BASE_STYLES } from "./constants/STYLE_CONSTANTS";
import { Variant, Color, Size } from "./types/ButtonTypes";
import getVariantStyles from "./utils/getVariantStyles";

/**
 * 공용 버튼 컴포넌트
 *
 * @param children - 내용(필수)
 * @param variant - 스타일 타입(필수)
 * @param color - 색상(필수)
 * @param size - 크기(선택)
 * @param ariaLabel - 접근성 라벨(선택)
 * @param className - 추가 스타일 클래스(선택)
 *
 * @example
 * <Button variant="default" color="dark-gray" size="medium" ariaLabel="기본 버튼" className="custom-class">
 *   <span>기본 버튼</span>
 * </Button>
 *
 * <Button variant="outline" color="gray" size="small" ariaLabel="아웃라인 버튼" className="custom-class">
 *   <span>아웃라인 버튼</span>
 * </Button>
 *
 * @description
 * variant가 outline인 경우, gray, light-gray, green 색상 중 하나를 선택할 수 있습니다.
 * 이 세 색상외에 다른 color를 사용하면 default 스타일이 적용됩니다.
 *
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  color: Color;
  size?: Size;
  ariaLabel?: string;
  className?: string;
}

const Button = ({
  children,
  variant,
  color,
  size = "medium",
  ariaLabel = "기본 버튼",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={cn(
        BASE_STYLES,
        SIZE_STYLES[size],
        getVariantStyles(variant, color),
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
