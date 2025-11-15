import { useEffect, useState } from "react";
import {
  getTimeDisplay,
  formatTimeDisplay,
  TimeDisplay,
} from "../utils/timeDisplayUtils";

interface UseTimeDisplayParams {
  time: Date | null;
}

export const useTimeDisplay = ({ time }: UseTimeDisplayParams) => {
  const [localHour, setLocalHour] = useState<string>("10");
  const [localMinute, setLocalMinute] = useState<string>("00");
  const [localIsAM, setLocalIsAM] = useState<boolean>(true);

  useEffect(() => {
    const display = getTimeDisplay(time);
    const formatted = formatTimeDisplay(display);
    setLocalHour(formatted.hour);
    setLocalMinute(formatted.minute);
    setLocalIsAM(display.isAM);
  }, [time]);

  return {
    localHour,
    localMinute,
    localIsAM,
    setLocalHour,
    setLocalMinute,
    setLocalIsAM,
  };
};
