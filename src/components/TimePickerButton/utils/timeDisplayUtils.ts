import { convertTo12Hour } from "./timeUtils";

export interface TimeDisplay {
  hour: number;
  minute: number;
  isAM: boolean;
}

// 기본 시간 표시 값
const DEFAULT_TIME_DISPLAY: TimeDisplay = {
  hour: 10,
  minute: 0,
  isAM: true,
};

// 시간 표시 값 가져오기
export const getTimeDisplay = (time: Date | null): TimeDisplay => {
  if (!time) {
    return DEFAULT_TIME_DISPLAY;
  }
  const hour24 = time.getHours();
  return { ...convertTo12Hour(hour24), minute: time.getMinutes() };
};

// 시간 표시 값 포맷팅
export const formatTimeDisplay = (
  display: TimeDisplay
): {
  hour: string;
  minute: string;
} => {
  return {
    hour: display.hour.toString().padStart(2, "0"),
    minute: display.minute.toString().padStart(2, "0"),
  };
};
