import { useSessionStore } from "@/stores";
import {
  convertTo24Hour,
  isEndTimeAfterStart,
  calculateEndTime,
} from "../utils/timeUtils";
import { getTimeDisplay } from "../utils/timeDisplayUtils";

interface UseTimeUpdateParams {
  sessionId: string;
  isStartTime: boolean;
  startTime: Date | null;
  endTime: Date | null;
  onValidationError: (message: string) => void;
}

export const useTimeUpdate = ({
  sessionId,
  isStartTime,
  startTime,
  endTime,
  onValidationError,
}: UseTimeUpdateParams) => {
  const { setSessionStartTime, setSessionEndTime } = useSessionStore();

  const updateTime = (hour: number, minute: number, isAM: boolean): void => {
    const hour24 = convertTo24Hour(hour, isAM);
    const newTime = new Date();
    newTime.setHours(hour24, minute, 0, 0);

    if (isStartTime) {
      setSessionStartTime(sessionId, newTime);
      updateEndTimeForStartTime(hour24, minute);
    } else {
      updateEndTime(hour24, minute);
    }
  };

  const updateEndTimeForStartTime = (
    startHour24: number,
    startMinute: number
  ): void => {
    const endDisplay = getTimeDisplay(endTime ?? null);
    const endTime24 = convertTo24Hour(endDisplay.hour, endDisplay.isAM);
    const endMinute = endDisplay.minute;

    if (!isEndTimeAfterStart(startHour24, startMinute, endTime24, endMinute)) {
      const calculatedEnd = calculateEndTime(startHour24, startMinute);
      const newEndTime = new Date();
      newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
      setSessionEndTime(sessionId, newEndTime);
      onValidationError("시작 시간보다 종료시간은 빠를 수 없습니다.");
    } else {
      const calculatedEnd = calculateEndTime(startHour24, startMinute);
      const newEndTime = new Date();
      newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
      setSessionEndTime(sessionId, newEndTime);
    }
  };

  const updateEndTime = (endHour24: number, endMinute: number): void => {
    const startDisplay = getTimeDisplay(startTime ?? null);
    const startTime24 = convertTo24Hour(startDisplay.hour, startDisplay.isAM);
    const startMinute = startDisplay.minute;

    if (!isEndTimeAfterStart(startTime24, startMinute, endHour24, endMinute)) {
      onValidationError("시작 시간보다 종료시간은 빠를 수 없습니다.");
      const calculatedEnd = calculateEndTime(startTime24, startMinute);
      const newEndTime = new Date();
      newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
      setSessionEndTime(sessionId, newEndTime);
    } else {
      const newTime = new Date();
      newTime.setHours(endHour24, endMinute, 0, 0);
      setSessionEndTime(sessionId, newTime);
    }
  };

  const handleAMPMToggle = (
    hour: number,
    minute: number,
    newIsAM: boolean
  ): void => {
    updateTime(hour, minute, newIsAM);

    if (isStartTime && endTime) {
      const endDisplay = getTimeDisplay(endTime);
      const newEndHour24 = convertTo24Hour(endDisplay.hour, newIsAM);
      const newEndTime = new Date();
      newEndTime.setHours(newEndHour24, endDisplay.minute, 0, 0);
      setSessionEndTime(sessionId, newEndTime);
    }
  };

  return {
    updateTime,
    handleAMPMToggle,
  };
};
