import { isDateSelectable } from "./getDateRange";

/**
 * 캘린더의 초기 날짜를 계산하는 함수
 * @param selectedDate 이미 선택된 날짜
 * @param minDate 선택 가능한 최소 날짜
 * @param maxDate 선택 가능한 최대 날짜
 * @returns 초기 날짜
 */
export const getInitialDate = (
  selectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): Date => {
  if (selectedDate) {
    return selectedDate;
  }

  const today = new Date();
  if (isDateSelectable(today, minDate, maxDate)) {
    return today;
  }

  return minDate || today;
};

