import { addDays, isBefore, isAfter, startOfDay } from "date-fns";
import { SessionDate } from "@/stores/sessionStore";

// 세션에서 유효한 날짜 배열 추출
const extractSessionDates = (session: SessionDate): Date[] => {
  return [session.date, session.startTime, session.endTime].filter(
    (d): d is Date => d !== null
  );
};

// 세션 배열에서 경계 날짜 찾기
const findBoundaryDate = (
  sessions: SessionDate[],
  startIndex: number,
  direction: "previous" | "next"
): Date | null => {
  const isPrevious = direction === "previous";
  const start = isPrevious ? startIndex - 1 : startIndex + 1;
  const end = isPrevious ? -1 : sessions.length;
  const step = isPrevious ? -1 : 1;

  for (let i = start; i !== end; i += step) {
    const session = sessions[i];
    if (!session) continue;

    const dates = extractSessionDates(session);
    if (dates.length === 0) continue;

    const targetDate = dates.reduce((target, date) => {
      const dateStart = startOfDay(date);
      const targetStart = startOfDay(target);
      const shouldUpdate = isPrevious
        ? dateStart > targetStart
        : dateStart < targetStart;
      return shouldUpdate ? date : target;
    });

    const adjustedDays = isPrevious ? 1 : -1;
    return addDays(startOfDay(targetDate), adjustedDays);
  }

  return null;
};

// 날짜 범위 계산
export const getDateRange = (
  sessions: SessionDate[],
  currentSessionId: string
): { minDate: Date | null; maxDate: Date | null } => {
  // 현재 세션의 인덱스 찾기
  const currentSessionIndex = sessions.findIndex(
    (session) => session.id === currentSessionId
  );

  // 현재 세션이 없으면 날짜 범위를 반환하지 않음
  if (currentSessionIndex === -1) {
    return { minDate: null, maxDate: null };
  }

  // 이전 세션의 날짜 범위 계산
  const minDate = findBoundaryDate(sessions, currentSessionIndex, "previous");

  // 다음 세션의 날짜 범위 계산
  const maxDate = findBoundaryDate(sessions, currentSessionIndex, "next");

  return { minDate, maxDate };
};

// 날짜 선택 가능 여부 확인
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
