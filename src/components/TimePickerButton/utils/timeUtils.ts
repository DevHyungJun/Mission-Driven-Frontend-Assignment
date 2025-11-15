export const convertTo24Hour = (hour: number, isAM: boolean): number => {
  if (hour === 12) {
    return isAM ? 0 : 12;
  }
  return isAM ? hour : hour + 12;
};

export const convertTo12Hour = (
  hour24: number
): { hour: number; isAM: boolean } => {
  if (hour24 === 0) {
    return { hour: 12, isAM: true };
  }
  if (hour24 === 12) {
    return { hour: 12, isAM: false };
  }
  if (hour24 < 12) {
    return { hour: hour24, isAM: true };
  }
  return { hour: hour24 - 12, isAM: false };
};

export const isEndTimeAfterStart = (
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): boolean => {
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  return endTotalMinutes >= startTotalMinutes;
};

export const calculateEndTime = (
  startHour: number,
  startMinute: number
): { hour: number; minute: number } => {
  const totalMinutes = startHour * 60 + startMinute + 60;
  const hour = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  return { hour, minute };
};
