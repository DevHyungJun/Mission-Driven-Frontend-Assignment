import { isSameMonth, isSameDay } from "date-fns";
import { isDateSelectable } from "./getDateRange";

interface DateState {
  isCurrentMonth: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  isToday: boolean;
}

/**
 * 특정 날짜의 상태를 계산하는 함수
 * @param day 확인할 날짜
 * @param currentMonth 현재 표시 중인 월
 * @param tempSelectedDate 임시로 선택된 날짜
 * @param minDate 선택 가능한 최소 날짜
 * @param maxDate 선택 가능한 최대 날짜
 * @returns 날짜 상태 객체
 */
export const getDateState = (
  day: Date,
  currentMonth: Date,
  tempSelectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): DateState => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isSelected = tempSelectedDate !== null && isSameDay(day, tempSelectedDate);
  const isSelectable = isDateSelectable(day, minDate, maxDate);
  const isToday = isSameDay(day, new Date());

  return {
    isCurrentMonth,
    isSelected,
    isSelectable,
    isToday,
  };
};

