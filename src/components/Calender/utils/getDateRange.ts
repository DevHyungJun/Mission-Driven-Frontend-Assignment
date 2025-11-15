import { addDays, isBefore, isAfter, startOfDay } from "date-fns";
import { SessionDate } from "@/stores/sessionStore";

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

  let minDate: Date | null = null;
  for (let i = currentSessionIndex - 1; i >= 0; i--) {
    const session = sessions[i];
    if (!session) continue;

    const dates = [session.date, session.startTime, session.endTime].filter(
      (d): d is Date => d !== null
    );

    if (dates.length > 0) {
      minDate = dates.reduce((latest, date) => {
        const dateStart = startOfDay(date);
        const latestStart = startOfDay(latest);
        return dateStart > latestStart ? date : latest;
      });
      if (minDate) {
        minDate = addDays(startOfDay(minDate), 1);
      }
      break;
    }
  }

  let maxDate: Date | null = null;
  for (let i = currentSessionIndex + 1; i < sessions.length; i++) {
    const session = sessions[i];
    if (!session) continue;

    const dates = [session.date, session.startTime, session.endTime].filter(
      (d): d is Date => d !== null
    );

    if (dates.length > 0) {
      maxDate = dates.reduce((earliest, date) => {
        const dateStart = startOfDay(date);
        const earliestStart = startOfDay(earliest);
        return dateStart < earliestStart ? date : earliest;
      });
      if (maxDate) {
        maxDate = addDays(startOfDay(maxDate), -1);
      }
      break;
    }
  }

  return { minDate, maxDate };
};

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
