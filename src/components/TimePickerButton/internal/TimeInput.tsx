import { RefObject, KeyboardEvent, FocusEvent, ChangeEvent } from "react";
import { cn } from "@/app/_utils/cn";
import { TIME_BUTTON_BASE_STYLE } from "../constants/TIME_BUTTON_BASE_STYLE";

interface TimeInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  label: string;
  type: "hour" | "minute";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const TimeInput = ({
  inputRef,
  value,
  label,
  type,
  onChange,
  onKeyDown,
  onBlur,
}: TimeInputProps) => {
  const isHour = type === "hour";
  const ariaLabel = `${label} ${isHour ? "시간" : "분"} 선택`;
  const min = isHour ? 1 : 0;
  const max = isHour ? 12 : 59;

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={2}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={cn(
        "flex-1 min-w-0",
        TIME_BUTTON_BASE_STYLE,
        "cursor-text focus:outline-none border-0 bg-transparent text-center"
      )}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={parseInt(value, 10)}
    />
  );
};
