import { useSessionStore } from "@/stores";
import { toast } from "@/provider/ToastProvider/ToastProvider";
import {
  convertTo24Hour,
  isEndTimeAfterStart,
  calculateEndTime,
} from "../utils/timeUtils";
import { getTimeDisplay } from "../utils/timeDisplayUtils";

interface UseTimeUpdateParams {
  sessionId: string;
  isStartTime: boolean;
}

const createTimeDate = (hour24: number, minute: number): Date => {
  const date = new Date();
  date.setHours(hour24, minute, 0, 0);
  return date;
};

const VALIDATION_ERROR_MESSAGE = "시작 시간보다 종료시간은 빠를 수 없습니다.";

export const useTimeUpdate = ({
  sessionId,
  isStartTime,
}: UseTimeUpdateParams) => {
  const { sessions, setSessionStartTime, setSessionEndTime } =
    useSessionStore();

  const getCurrentSession = () => {
    return sessions.find((session) => session.id === sessionId);
  };

  const getTimeIn24Hour = (time: Date | null) => {
    const display = getTimeDisplay(time);
    return {
      hour24: convertTo24Hour(display.hour, display.isAM),
      minute: display.minute,
    };
  };

  const validateAndSetEndTime = (
    startHour24: number,
    startMinute: number,
    endHour24: number,
    endMinute: number
  ): boolean => {
    const isValid = isEndTimeAfterStart(
      startHour24,
      startMinute,
      endHour24,
      endMinute
    );

    if (!isValid) {
      toast.show(VALIDATION_ERROR_MESSAGE);
      const calculatedEnd = calculateEndTime(startHour24, startMinute);
      const newEndTime = createTimeDate(
        calculatedEnd.hour,
        calculatedEnd.minute
      );
      setSessionEndTime(sessionId, newEndTime);
      return false;
    }

    return true;
  };

  const updateEndTimeForStartTime = (
    startHour24: number,
    startMinute: number
  ): void => {
    const currentSession = getCurrentSession();
    const { hour24: endTime24, minute: endMinute } = getTimeIn24Hour(
      currentSession?.endTime ?? null
    );

    const isValid = isEndTimeAfterStart(
      startHour24,
      startMinute,
      endTime24,
      endMinute
    );
    if (!isValid) {
      toast.show(VALIDATION_ERROR_MESSAGE);
    }

    const calculatedEnd = calculateEndTime(startHour24, startMinute);
    const newEndTime = createTimeDate(calculatedEnd.hour, calculatedEnd.minute);
    setSessionEndTime(sessionId, newEndTime);
  };

  const updateEndTime = (endHour24: number, endMinute: number): void => {
    const currentSession = getCurrentSession();
    const { hour24: startTime24, minute: startMinute } = getTimeIn24Hour(
      currentSession?.startTime ?? null
    );

    const isValid = validateAndSetEndTime(
      startTime24,
      startMinute,
      endHour24,
      endMinute
    );

    if (isValid) {
      const newTime = createTimeDate(endHour24, endMinute);
      setSessionEndTime(sessionId, newTime);
    }
  };

  const updateTime = (hour: number, minute: number, isAM: boolean): void => {
    const hour24 = convertTo24Hour(hour, isAM);
    const newTime = createTimeDate(hour24, minute);

    if (isStartTime) {
      setSessionStartTime(sessionId, newTime);
      updateEndTimeForStartTime(hour24, minute);
    } else {
      updateEndTime(hour24, minute);
    }
  };

  const handleAMPMToggle = (
    hour: number,
    minute: number,
    newIsAM: boolean
  ): void => {
    updateTime(hour, minute, newIsAM);

    if (!isStartTime) return;

    const currentSession = getCurrentSession();
    const endTime = currentSession?.endTime;
    if (!endTime) return;

    const endDisplay = getTimeDisplay(endTime);
    const newEndHour24 = convertTo24Hour(endDisplay.hour, newIsAM);
    const newEndTime = createTimeDate(newEndHour24, endDisplay.minute);
    setSessionEndTime(sessionId, newEndTime);
  };

  return {
    updateTime,
    handleAMPMToggle,
  };
};
