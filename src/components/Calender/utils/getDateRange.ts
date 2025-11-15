import { addDays, isBefore, isAfter, startOfDay } from "date-fns";
import { SessionDate } from "@/stores/sessionStore";

/**
 * 특정 회차의 선택 가능한 날짜 범위를 계산하는 함수
 * @param sessions 모든 회차 정보
 * @param currentSessionId 현재 회차 ID
 * @returns 선택 가능한 날짜 범위 (minDate, maxDate)
 */
export const getDateRange = (
  sessions: SessionDate[],
  currentSessionId: string
): { minDate: Date | null; maxDate: Date | null } => {
  const currentSessionIndex = sessions.findIndex(
    (session) => session.id === currentSessionId
  );
  
  if (currentSessionIndex === -1) {
    return { minDate: null, maxDate: null };
  }

  // 이전 회차 중 가장 늦은 날짜 찾기 (date, startTime, endTime 중 가장 늦은 것)
  let minDate: Date | null = null;
  for (let i = currentSessionIndex - 1; i >= 0; i--) {
    const session = sessions[i];
    if (!session) continue;

    const dates = [
      session.date,
      session.startTime,
      session.endTime,
    ].filter((d): d is Date => d !== null);

    if (dates.length > 0) {
      // 가장 늦은 날짜 찾기
      minDate = dates.reduce((latest, date) => {
        const dateStart = startOfDay(date);
        const latestStart = startOfDay(latest);
        return dateStart > latestStart ? date : latest;
      });
      // 이전 회차 날짜의 다음 날부터 선택 가능
      if (minDate) {
        minDate = addDays(startOfDay(minDate), 1);
      }
      break;
    }
  }

  // 다음 회차 중 가장 빠른 날짜 찾기 (date, startTime, endTime 중 가장 빠른 것)
  let maxDate: Date | null = null;
  for (let i = currentSessionIndex + 1; i < sessions.length; i++) {
    const session = sessions[i];
    if (!session) continue;

    const dates = [
      session.date,
      session.startTime,
      session.endTime,
    ].filter((d): d is Date => d !== null);

    if (dates.length > 0) {
      // 가장 빠른 날짜 찾기
      maxDate = dates.reduce((earliest, date) => {
        const dateStart = startOfDay(date);
        const earliestStart = startOfDay(earliest);
        return dateStart < earliestStart ? date : earliest;
      });
      // 다음 회차 날짜의 이전 날까지 선택 가능
      if (maxDate) {
        maxDate = addDays(startOfDay(maxDate), -1);
      }
      break;
    }
  }

  return { minDate, maxDate };
};

/**
 * 날짜가 선택 가능한 범위 내에 있는지 확인하는 함수
 * @param date 확인할 날짜
 * @param minDate 최소 날짜 (null이면 제한 없음)
 * @param maxDate 최대 날짜 (null이면 제한 없음)
 * @returns 선택 가능하면 true, 불가능하면 false
 */
export const isDateSelectable = (
  date: Date,
  minDate: Date | null,
  maxDate: Date | null
): boolean => {
  if (minDate && isBefore(date, minDate)) {
    return false;
  }
  if (maxDate && isAfter(date, maxDate)) {
    return false;
  }
  return true;
};

