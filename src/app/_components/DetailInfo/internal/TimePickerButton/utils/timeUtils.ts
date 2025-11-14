/**
 * 12시간제를 24시간제로 변환
 * @param hour 12시간제 시간 (1-12)
 * @param isAM 오전 여부
 * @returns 24시간제 시간 (0-23)
 */
export const convertTo24Hour = (hour: number, isAM: boolean): number => {
  if (hour === 12) {
    return isAM ? 0 : 12;
  }
  return isAM ? hour : hour + 12;
};

/**
 * 24시간제를 12시간제로 변환
 * @param hour24 24시간제 시간 (0-23)
 * @returns { hour: 12시간제 시간 (1-12), isAM: 오전 여부 }
 */
export const convertTo12Hour = (hour24: number): { hour: number; isAM: boolean } => {
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

/**
 * 시간 비교 (24시간제 기준)
 * @param startHour 시작 시간 (24시간제)
 * @param startMinute 시작 분
 * @param endHour 종료 시간 (24시간제)
 * @param endMinute 종료 분
 * @returns 종료 시간이 시작 시간보다 크거나 같으면 true
 */
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

/**
 * 시작 시간에 1시간을 더한 종료 시간 계산
 * @param startHour 시작 시간 (24시간제)
 * @param startMinute 시작 분
 * @returns { hour: 종료 시간 (24시간제), minute: 종료 분 }
 */
export const calculateEndTime = (
  startHour: number,
  startMinute: number
): { hour: number; minute: number } => {
  const totalMinutes = startHour * 60 + startMinute + 60;
  const hour = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  return { hour, minute };
};

