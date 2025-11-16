import { useEffect, useState } from "react";
import { getTimeDisplay, formatTimeDisplay } from "../utils/timeDisplayUtils";

interface UseTimeDisplayParams {
  time: Date | null;
}

// 시간 표시 상태 관리
export const useTimeDisplay = ({ time }: UseTimeDisplayParams) => {
  const [localHour, setLocalHour] = useState<string>("10");
  const [localMinute, setLocalMinute] = useState<string>("00");
  const [localIsAM, setLocalIsAM] = useState<boolean>(true);

  // 시간 표시 상태 업데이트
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
