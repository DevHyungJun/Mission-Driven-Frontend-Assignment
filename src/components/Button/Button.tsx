import { cn } from "@/app/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { SIZE_STYLES, BASE_STYLES } from "./constants/STYLE_CONSTANTS";
import { Variant, Color, Size } from "./types/ButtonTypes";
import getVariantStyles from "./utils/getVariantStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  color: Color;
  size?: Size;
  ariaLabel?: string;
}

const Button = ({
  children,
  variant,
  color,
  size = "medium",
  ariaLabel = "기본 버튼",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={cn(
        BASE_STYLES,
        SIZE_STYLES[size],
        getVariantStyles(variant, color)
      )}
    >
      {children}
    </button>
  );
};

export default Button;
