import { convertTo12Hour } from "./timeUtils";

export interface TimeDisplay {
  hour: number;
  minute: number;
  isAM: boolean;
}

const DEFAULT_TIME_DISPLAY: TimeDisplay = {
  hour: 10,
  minute: 0,
  isAM: true,
};

export const getTimeDisplay = (time: Date | null): TimeDisplay => {
  if (!time) {
    return DEFAULT_TIME_DISPLAY;
  }
  const hour24 = time.getHours();
  return { ...convertTo12Hour(hour24), minute: time.getMinutes() };
};

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
