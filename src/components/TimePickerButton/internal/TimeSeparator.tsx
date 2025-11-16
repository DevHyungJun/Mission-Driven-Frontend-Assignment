import { cn } from "@/utils/cn";
import { TIME_BUTTON_BASE_STYLE } from "../constants/TIME_BUTTON_BASE_STYLE";

// 시간 구분자
export const TimeSeparator = () => {
  return (
    <span className={cn(TIME_BUTTON_BASE_STYLE, "shrink-0")} aria-hidden="true">
      :
    </span>
  );
};
