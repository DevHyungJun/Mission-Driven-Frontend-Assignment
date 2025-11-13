import { cn } from "@/app/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  SIZE_STYLES,
  VARIANT_STYLES,
  COLOR_STYLES,
  BASE_STYLES,
} from "./constants/STYLE_CONSTANTS";
import { Variant, Color, Size } from "./types/ButtonTypes";

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
  const getVariantStyles = () => {
    if (variant === "default") {
      return cn(VARIANT_STYLES.default, COLOR_STYLES[color], "text-white");
    }
    const outlineColor = color in VARIANT_STYLES.outline ? color : "default";
    return cn(
      "border",
      VARIANT_STYLES.outline[
        outlineColor as keyof typeof VARIANT_STYLES.outline
      ]
    );
  };

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={cn(BASE_STYLES, SIZE_STYLES[size], getVariantStyles())}
    >
      {children}
    </button>
  );
};

export default Button;
