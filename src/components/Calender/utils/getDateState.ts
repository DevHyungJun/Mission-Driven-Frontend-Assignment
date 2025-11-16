import { isSameMonth, isSameDay } from "date-fns";
import { isDateSelectable } from "./getDateRange";

interface DateState {
  isCurrentMonth: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  isToday: boolean;
}

// 날짜 상태 계산
export const getDateState = (
  day: Date,
  currentMonth: Date,
  tempSelectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): DateState => {
  // 날짜가 현재 달인지 확인
  const isCurrentMonth = isSameMonth(day, currentMonth);
  // 날짜가 선택된 날짜인지 확인
  const isSelected =
    tempSelectedDate !== null && isSameDay(day, tempSelectedDate);
  // 날짜가 선택 가능한지 확인
  const isSelectable = isDateSelectable(day, minDate, maxDate);
  // 날짜가 오늘인지 확인
  const isToday = isSameDay(day, new Date());

  // 날짜 상태를 반환
  return {
    isCurrentMonth,
    isSelected,
    isSelectable,
    isToday,
  };
};
