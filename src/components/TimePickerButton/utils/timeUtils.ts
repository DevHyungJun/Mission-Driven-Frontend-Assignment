// 24시간 형식으로 변환
export const convertTo24Hour = (hour: number, isAM: boolean): number => {
  if (hour === 12) {
    return isAM ? 0 : 12;
  }
  return isAM ? hour : hour + 12;
};

// 12시간 형식으로 변환
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

// 종료 시간이 시작 시간 이후인지 확인
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

// 종료 시간 계산
export const calculateEndTime = (
  startHour: number,
  startMinute: number
): { hour: number; minute: number } => {
  const totalMinutes = startHour * 60 + startMinute + 60;
  const hour = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  return { hour, minute };
};
