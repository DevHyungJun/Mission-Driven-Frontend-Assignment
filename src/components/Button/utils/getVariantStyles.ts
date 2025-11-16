import { cn } from "@/utils/cn";
import { COLOR_STYLES, VARIANT_STYLES } from "../constants/STYLE_CONSTANTS";
import { Color, Variant } from "../types/ButtonTypes";

// variant와 color를 받아서 스타일을 반환하는 함수
const getVariantStyles = (variant: Variant, color: Color) => {
  if (variant === "default") {
    return cn(VARIANT_STYLES.default, COLOR_STYLES[color], "text-white");
  }
  const outlineColor = color in VARIANT_STYLES.outline ? color : "default";
  return cn(
    "border",
    VARIANT_STYLES.outline[outlineColor as keyof typeof VARIANT_STYLES.outline]
  );
};

export default getVariantStyles;
