import { isDateSelectable } from "./getDateRange";

// 초기 날짜 계산
export const getInitialDate = (
  selectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): Date => {
  // 선택된 날짜가 있으면 선택된 날짜를 반환
  if (selectedDate) {
    return selectedDate;
  }

  // 오늘 날짜 계산
  const today = new Date();
  // 오늘 날짜가 선택 가능한지 확인
  if (isDateSelectable(today, minDate, maxDate)) {
    return today;
  }

  // 오늘 날짜가 선택 가능하지 않으면 최소 날짜를 반환
  // 최소 날짜가 없으면 오늘 날짜를 반환
  return minDate || today;
};
