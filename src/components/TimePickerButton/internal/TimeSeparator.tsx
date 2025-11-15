import { cn } from "@/app/_utils/cn";
import { TIME_BUTTON_BASE_STYLE } from "../constants/TIME_BUTTON_BASE_STYLE";

export const TimeSeparator = () => {
  return (
    <span className={cn(TIME_BUTTON_BASE_STYLE, "shrink-0")} aria-hidden="true">
      :
    </span>
  );
};
